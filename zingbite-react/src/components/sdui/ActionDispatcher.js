import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useModal } from '../../context/ModalContext';
import { resolveTemplate } from './expressionEvaluator';

export const useActionDispatcher = () => {
  const navigate = useNavigate();
  const { showAlert } = useModal();

  /**
   * Helper to recursively resolve all properties of an object or string template.
   */
  const resolveDeep = (obj, context) => {
    if (typeof obj === 'string') {
      return resolveTemplate(obj, context);
    }
    if (Array.isArray(obj)) {
      return obj.map(item => resolveDeep(item, context));
    }
    if (obj !== null && typeof obj === 'object') {
      const resolved = {};
      for (const [key, value] of Object.entries(obj)) {
        resolved[key] = resolveDeep(value, context);
      }
      return resolved;
    }
    return obj;
  };

  /**
   * Executes a Server-Driven UI action.
   * @param {Object} action - The action config { type, payload }
   * @param {Object} context - The current state context (user state, page details, local forms data)
   * @param {Function} refreshPage - Optional callback to refresh layout configuration
   */
  const executeAction = async (action, context = {}, refreshPage = null) => {
    if (!action || !action.type) return;

    try {
      switch (action.type) {
        case 'navigation': {
          const pathTemplate = action.payload?.path || '/';
          const targetPath = resolveTemplate(pathTemplate, context);
          navigate(targetPath);
          break;
        }

        case 'api_call': {
          const { url: urlTemplate, method = 'POST', body, successAction, errorAction } = action.payload;
          const targetUrl = resolveTemplate(urlTemplate, context);
          
          // Deeply resolve body templates
          const resolvedBody = body ? resolveDeep(body, context) : null;

          // Fetch active CSRF token from sessionStorage or document headers
          const csrfToken = sessionStorage.getItem('csrfToken') || 
                            document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

          const headers = {};
          if (csrfToken) {
            headers['X-CSRF-Token'] = csrfToken;
          }

          const response = await axios({
            url: targetUrl,
            method,
            data: resolvedBody,
            headers
          });

          // Run success callback action if defined
          if (successAction) {
            const apiSuccessContext = { ...context, response: response.data };
            await executeAction(successAction, apiSuccessContext, refreshPage);
            if (refreshPage) refreshPage();
          } else if (refreshPage) {
            refreshPage();
          }
          break;
        }

        case 'open_modal': {
          if (action.payload?.formConfig && context.openModal) {
            // Dynamically resolve form configuration fields and values
            const resolvedFormConfig = resolveDeep(action.payload.formConfig, context);
            context.openModal(resolvedFormConfig);
          } else {
            const title = action.payload?.title || 'Dialog';
            showAlert(
              resolveTemplate(title, context),
              action.payload?.message ? resolveTemplate(action.payload.message, context) : 'Action complete.'
            );
          }
          break;
        }

        case 'toast_message': {
          const { message, type = 'info' } = action.payload;
          const resolvedMsg = resolveTemplate(message, context);
          
          // Use standard alert or toast depending on modal/toast hooks
          showAlert(resolvedMsg, type);
          
          // Automatically close modal on success if context provides closeModal
          if (type === 'success' && context.closeModal) {
            context.closeModal();
          }
          break;
        }

        case 'js_event': {
          if (action.payload?.eventName === 'logout' && context.logout) {
            context.logout();
          }
          break;
        }

        default:
          console.warn(`Unregistered action type: ${action.type}`, action);
      }
    } catch (err) {
      console.error(`SDUI Action Execution Error (${action.type}):`, err);
      
      // Execute error action if configured in JSON schema
      if (action.payload?.errorAction) {
        const apiErrorContext = { ...context, error: err.response?.data || { message: err.message } };
        await executeAction(action.payload.errorAction, apiErrorContext, refreshPage);
      } else {
        showAlert('Error', err.response?.data?.error || err.message || 'Operation failed.');
      }
    }
  };

  return { executeAction };
};
