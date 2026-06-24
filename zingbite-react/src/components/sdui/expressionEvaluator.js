/**
 * Safely resolves nested property paths (e.g. "user.profile.name") from an object.
 */
export const getNestedValue = (obj, path, fallback = '') => {
  if (!path) return fallback;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return fallback;
    // Handle array indexes or dictionary lookups (e.g., "roles[0]" or "roles['admin']")
    const arrayMatch = part.match(/^(\w+)(?:\[['"]?([\w-]+)['"]?\])?$/);
    if (arrayMatch) {
      const [, key, index] = arrayMatch;
      current = current[key];
      if (index !== undefined && current !== null && current !== undefined) {
        current = current[index];
      }
    } else {
      current = current[part];
    }
  }
  return current !== undefined ? current : fallback;
};

/**
 * Parses and replaces all bracketed expressions like "{user.username}" in a template string.
 */
export const resolveTemplate = (template, context) => {
  if (typeof template !== 'string') return template;
  return template.replace(/\{([^}]+)\}/g, (match, path) => {
    return getNestedValue(context, path.trim(), '');
  });
};

/**
 * Safely evaluates simple logical expressions at runtime.
 * Supports:
 * - Property existence checks
 * - Equality checks (==, ===, !=, !==)
 * - Array checks: includes()
 * - Logical AND (&&), OR (||), and NOT (!)
 */
export const evaluateCondition = (expression, context) => {
  if (!expression || typeof expression !== 'string') return true;

  try {
    // 1. Handle logical AND / OR groups
    if (expression.includes('&&')) {
      return expression.split('&&').every(exp => evaluateCondition(exp.trim(), context));
    }
    if (expression.includes('||')) {
      return expression.split('||').some(exp => evaluateCondition(exp.trim(), context));
    }

    // 2. Handle NOT condition
    if (expression.startsWith('!')) {
      return !evaluateCondition(expression.substring(1).trim(), context);
    }

    // 3. Handle includes check, e.g. "user.roles.includes('restaurant_admin')"
    const includesMatch = expression.match(/^([\w.[\]]+)\.includes\(['"]?([\w-]+)['"]?\)$/);
    if (includesMatch) {
      const [, arrayPath, value] = includesMatch;
      const array = getNestedValue(context, arrayPath, []);
      return Array.isArray(array) && array.includes(value);
    }

    // 4. Handle equality, e.g. "order.status === 'PREPARING'"
    const equalityMatch = expression.match(/^([\w.[\]]+)\s*(===|==|!==|!=)\s*['"]?([\w-]+)['"]?$/);
    if (equalityMatch) {
      const [, leftPath, operator, rightVal] = equalityMatch;
      const leftVal = String(getNestedValue(context, leftPath, ''));
      const isEquals = operator.startsWith('=');
      return isEquals ? leftVal === rightVal : leftVal !== rightVal;
    }

    // 5. Basic boolean check: evaluates truthiness of path
    const val = getNestedValue(context, expression, null);
    return !!val;
  } catch (error) {
    console.warn(`Failed to evaluate condition: "${expression}"`, error);
    return false;
  }
};
