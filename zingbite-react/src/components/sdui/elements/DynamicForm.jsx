import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useActionDispatcher } from '../ActionDispatcher';
import { resolveTemplate } from '../expressionEvaluator';

const DynamicForm = ({ props, context, refreshPage }) => {
  const { executeAction } = useActionDispatcher();
  const [formData, setFormData] = useState({});
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Initialize form state and pre-fill values
  useEffect(() => {
    const initialData = {};
    const fields = props.fields || [];

    fields.forEach(field => {
      if (field.value !== undefined && field.value !== null) {
        // Resolve dynamic placeholders for pre-filled values
        initialData[field.name] = typeof field.value === 'string'
          ? resolveTemplate(field.value, context)
          : field.value;
      } else if (field.type === 'multiselect') {
        initialData[field.name] = [];
      } else {
        initialData[field.name] = '';
      }
    });

    setFormData(initialData);
  }, [props.fields, context]);

  // Load dynamic select options
  useEffect(() => {
    const fields = props.fields || [];
    fields.forEach(async (field) => {
      if (field.optionsUrl) {
        try {
          const response = await axios.get(field.optionsUrl);
          let rawList = [];
          if (response.data) {
            if (field.dataKey && Array.isArray(response.data[field.dataKey])) {
              rawList = response.data[field.dataKey];
            } else if (Array.isArray(response.data)) {
              rawList = response.data;
            } else if (typeof response.data === 'object') {
              const foundArr = Object.values(response.data).find(v => Array.isArray(v));
              rawList = foundArr || [];
            }
          }
          const mappedOptions = rawList.map(item => ({
            label: item[field.optionLabelKey || 'label'] || '',
            value: item[field.optionValueKey || 'value'] || ''
          }));
          setDynamicOptions(prev => ({ ...prev, [field.name]: mappedOptions }));
        } catch (err) {
          console.error(`Failed to load options for field ${field.name}:`, err);
        }
      }
    });
  }, [props.fields]);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = props.fields || [];

    for (const field of fields) {
      const val = formData[field.name];
      const validation = field.validation || {};

      if (validation.required && (val === undefined || val === null || String(val).trim() === '' || (Array.isArray(val) && val.length === 0))) {
        newErrors[field.name] = `${field.label} is required.`;
        continue;
      }

      if (val && !Array.isArray(val)) {
        if (validation.minLength && String(val).length < validation.minLength) {
          newErrors[field.name] = `${field.label} must be at least ${validation.minLength} characters.`;
        }
        if (validation.maxLength && String(val).length > validation.maxLength) {
          newErrors[field.name] = `${field.label} must be under ${validation.maxLength} characters.`;
        }
        if (validation.pattern) {
          const regex = new RegExp(validation.pattern);
          if (!regex.test(String(val))) {
            newErrors[field.name] = validation.errorMessage || `Invalid format for ${field.label}.`;
          }
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    const submissionContext = { ...context, form: formData };

    const apiCallAction = {
      type: 'api_call',
      payload: {
        url: props.submitUrl,
        method: props.submitMethod || 'POST',
        body: formData,
        successAction: props.successAction,
        errorAction: props.errorAction
      }
    };

    try {
      await executeAction(apiCallAction, submissionContext, refreshPage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckboxChange = (fieldName, optionValue, checked) => {
    const selectedValues = Array.isArray(formData[fieldName]) ? formData[fieldName] : [];
    let newSelection = [...selectedValues];
    if (checked) {
      if (!newSelection.includes(optionValue)) {
        newSelection.push(optionValue);
      }
    } else {
      newSelection = newSelection.filter(v => v !== optionValue);
    }
    handleInputChange(fieldName, newSelection);
  };

  const fields = props.fields || [];

  return (
    <div style={{
      background: '#fff',
      padding: '32px',
      borderRadius: '24px',
      border: '1px solid rgba(247,55,79,0.08)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.03)',
      width: '100%',
      marginBottom: '24px'
    }}>
      {props.title && (
        <h3 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '1.3rem',
          fontWeight: 800,
          color: '#1a1a1a',
          marginBottom: '24px',
          borderBottom: '1px solid #f0f0f0',
          paddingBottom: '12px'
        }}>
          {props.title}
        </h3>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {fields.map(field => {
          const hasError = !!errors[field.name];
          const currentOptions = field.optionsUrl ? (dynamicOptions[field.name] || []) : (field.options || []);

          if (field.type === 'hidden') {
            return (
              <input
                key={field.name}
                type="hidden"
                value={formData[field.name] || ''}
              />
            );
          }

          return (
            <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>
                {field.label} {field.validation?.required && <span style={{ color: '#f7374f' }}>*</span>}
              </label>

              {field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: `1px solid ${hasError ? '#f7374f' : 'rgba(247,55,79,0.15)'}`,
                    outline: 'none',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                    background: '#fff',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <option value="">Select option</option>
                  {currentOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === 'multiselect' ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  padding: '14px',
                  border: `1px solid ${hasError ? '#f7374f' : 'rgba(247,55,79,0.15)'}`,
                  borderRadius: '12px',
                  background: '#fafbfc'
                }}>
                  {currentOptions.map(opt => {
                    const isChecked = (Array.isArray(formData[field.name]) ? formData[field.name] : []).includes(Number(opt.value)) || (Array.isArray(formData[field.name]) ? formData[field.name] : []).includes(String(opt.value));
                    return (
                      <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#475569', cursor: 'pointer', userSelect: 'none' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleCheckboxChange(field.name, opt.value, e.target.checked)}
                          style={{ accentColor: '#f7374f' }}
                        />
                        {opt.label}
                      </label>
                    );
                  })}
                </div>
              ) : field.type === 'textarea' ? (
                <textarea
                  placeholder={field.placeholder || ''}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  rows={4}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: `1px solid ${hasError ? '#f7374f' : 'rgba(247,55,79,0.15)'}`,
                    outline: 'none',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s ease',
                    resize: 'vertical'
                  }}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  placeholder={field.placeholder || ''}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: `1px solid ${hasError ? '#f7374f' : 'rgba(247,55,79,0.15)'}`,
                    outline: 'none',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s ease'
                  }}
                />
              )}

              {hasError && (
                <span style={{ fontSize: '0.78rem', color: '#f7374f', fontWeight: 500 }}>
                  {errors[field.name]}
                </span>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '14px',
            background: submitting ? '#ccc' : 'linear-gradient(135deg, #f7374f 0%, #ff6b7a 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '0.95rem',
            fontWeight: 800,
            cursor: submitting ? 'not-allowed' : 'pointer',
            boxShadow: submitting ? 'none' : '0 8px 24px rgba(247,55,79,0.25)',
            transition: 'all 0.3s ease',
            marginTop: '10px'
          }}
          className="hover-scale"
        >
          {submitting ? 'Submitting...' : (props.submitLabel || 'Submit')}
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
