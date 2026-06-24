import { describe, test, expect } from 'vitest';
import { getNestedValue, resolveTemplate, evaluateCondition } from './expressionEvaluator';

describe('SDUI Expression Evaluator', () => {
  const context = {
    user: {
      username: 'Alice',
      roles: ['restaurant_admin', 'customer'],
      profile: {
        id: 101,
        active: true
      }
    },
    data: {
      analytics: {
        value: 1250,
        trend: '+8%'
      }
    }
  };

  test('getNestedValue should resolve nested paths', () => {
    expect(getNestedValue(context, 'user.username')).toBe('Alice');
    expect(getNestedValue(context, 'user.profile.id')).toBe(101);
    expect(getNestedValue(context, 'data.analytics.trend')).toBe('+8%');
    expect(getNestedValue(context, 'user.nonexistent', 'fallback')).toBe('fallback');
  });

  test('resolveTemplate should substitute templates', () => {
    expect(resolveTemplate('Hello {user.username}', context)).toBe('Hello Alice');
    expect(resolveTemplate('Value is ₹{data.analytics.value}', context)).toBe('Value is ₹1250');
    expect(resolveTemplate('Unknown {user.profile.unknown}', context)).toBe('Unknown ');
  });

  test('evaluateCondition should handle boolean properties', () => {
    expect(evaluateCondition('user.profile.active', context)).toBe(true);
    expect(evaluateCondition('user.profile.nonexistent', context)).toBe(false);
  });

  test('evaluateCondition should handle NOT operations', () => {
    expect(evaluateCondition('!user.profile.active', context)).toBe(false);
    expect(evaluateCondition('!user.profile.nonexistent', context)).toBe(true);
  });

  test('evaluateCondition should handle includes checks', () => {
    expect(evaluateCondition("user.roles.includes('restaurant_admin')", context)).toBe(true);
    expect(evaluateCondition("user.roles.includes('super_admin')", context)).toBe(false);
  });

  test('evaluateCondition should handle equality checks', () => {
    expect(evaluateCondition("user.username === 'Alice'", context)).toBe(true);
    expect(evaluateCondition("user.username !== 'Bob'", context)).toBe(true);
    expect(evaluateCondition("user.username == 'Bob'", context)).toBe(false);
  });

  test('evaluateCondition should handle AND / OR groups', () => {
    expect(evaluateCondition("user.username === 'Alice' && user.profile.active", context)).toBe(true);
    expect(evaluateCondition("user.username === 'Bob' || user.profile.active", context)).toBe(true);
    expect(evaluateCondition("user.username === 'Bob' && user.profile.active", context)).toBe(false);
  });
});
