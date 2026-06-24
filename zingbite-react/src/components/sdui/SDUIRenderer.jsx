import React, { useMemo, useState } from 'react';
import ComponentRegistry from './ComponentRegistry';
import { evaluateCondition } from './expressionEvaluator';
import DynamicForm from './elements/DynamicForm';

/**
 * Core dynamic renderer that consumes the server layout configuration
 * and renders components according to viewport responsive settings.
 */
const SDUIRenderer = ({ sduiConfig, viewport, context, refreshPage }) => {
  const [activeModal, setActiveModal] = useState(null);

  // Extend client context with modal controllers
  const rendererContext = useMemo(() => ({
    ...context,
    openModal: (formConfig) => setActiveModal(formConfig),
    closeModal: () => setActiveModal(null)
  }), [context]);

  const sortedSections = useMemo(() => {
    if (!sduiConfig || !Array.isArray(sduiConfig.sections)) return [];
    return [...sduiConfig.sections]
      .filter(sec => {
        if (sec.visible !== undefined) {
          if (typeof sec.visible === 'boolean') return sec.visible;
          if (typeof sec.visible === 'string') {
            return evaluateCondition(sec.visible, rendererContext);
          }
        }
        return true;
      })
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [sduiConfig, rendererContext]);

  if (!sduiConfig) return null;

  // Compile global theme custom styling tokens
  const themeStyles = sduiConfig.theme?.tokens ? {
    '--sdui-primary': sduiConfig.theme.tokens.primaryColor,
    '--sdui-surface': sduiConfig.theme.tokens.surfaceBg,
    '--sdui-accent': sduiConfig.theme.tokens.accentColor,
    fontFamily: sduiConfig.theme.tokens.fontFamily || 'inherit'
  } : {};

  // Build responsive grid settings based on active viewport
  const gridConfig = sduiConfig.deviceConfig?.breakpoints?.[viewport] || {
    columns: 1,
    gap: '16px',
    padding: '16px'
  };

  return (
    <div style={{
      ...themeStyles,
      padding: gridConfig.padding,
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <style>{`
        .sdui-grid-layout {
          display: grid;
          grid-template-columns: repeat(${gridConfig.columns}, 1fr);
          gap: ${gridConfig.gap};
          width: 100%;
        }
        .hover-scale {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
        }
        .hover-scale:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.05);
        }
        .hover-bg-row:hover {
          background-color: #fafbfc !important;
        }

        /* Dynamic Modal Overlay Styling */
        .sdui-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 12, 30, 0.5);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: sduiModalFadeIn 0.2s ease-out;
        }
        .sdui-modal-card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
          width: 90%;
          max-width: 520px;
          position: relative;
          padding: 8px;
          animation: sduiModalSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .sdui-modal-close {
          position: absolute;
          top: 20px;
          right: 24px;
          background: #f1f5f9;
          border: none;
          font-size: 1.5rem;
          color: #475569;
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: background 0.2s;
        }
        .sdui-modal-close:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        @keyframes sduiModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes sduiModalSlideUp {
          from { transform: translateY(30px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>

      <div className="sdui-grid-layout">
        {sortedSections.map(section => {
          const WidgetComponent = ComponentRegistry[section.type];
          if (!WidgetComponent) {
            console.warn(`Unregistered component type parsed: "${section.type}"`);
            return null;
          }

          const span = section.layout?.colSpan?.[viewport] || 1;
          const gridColumnStyle = {
            gridColumn: `span ${Math.min(span, gridConfig.columns)}`
          };

          return (
            <div key={section.id} style={gridColumnStyle}>
              <WidgetComponent
                props={section.props || {}}
                context={rendererContext}
                refreshPage={refreshPage}
              >
                {Array.isArray(section.children) && section.children.map(child => {
                  const ChildComponent = ComponentRegistry[child.type];
                  if (!ChildComponent) return null;
                  return (
                    <ChildComponent
                      key={child.id}
                      props={child.props || {}}
                      context={rendererContext}
                      refreshPage={refreshPage}
                    />
                  );
                })}
              </WidgetComponent>
            </div>
          );
        })}
      </div>

      {/* Dynamic Render Overlay Modal containing DynamicForm */}
      {activeModal && (
        <div className="sdui-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="sdui-modal-card" onClick={e => e.stopPropagation()}>
            <button className="sdui-modal-close" onClick={() => setActiveModal(null)}>&times;</button>
            <DynamicForm
              props={activeModal}
              context={rendererContext}
              refreshPage={() => {
                setActiveModal(null);
                if (refreshPage) refreshPage();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SDUIRenderer;
