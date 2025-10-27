import type { FieldConfig, ValidationRule } from './types';

export const runValidatorsForField = async (
  field: FieldConfig,
  value: unknown,
  values: Record<string, unknown>
): Promise<string | null> => {
  if (!field.validators || field.validators.length === 0) return null;

  for (const v of field.validators) {
    const err = await runRule(v, value, values);
    if (err) return err;
  }
  return null;
};

const runRule = async (
  rule: ValidationRule,
  value: unknown,
  values: Record<string, unknown>
): Promise<string | null> => {
  switch (rule.type) {
    case 'required':
      if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
        return rule.message ?? 'This field is required';
      }
      return null;

    case 'minLength':
      if (typeof value === 'string' && value.length < rule.value) {
        return rule.message ?? `Minimum length is ${rule.value}`;
      }
      return null;

    case 'maxLength':
      if (typeof value === 'string' && value.length > rule.value) {
        return rule.message ?? `Maximum length is ${rule.value}`;
      }
      return null;

    case 'pattern':
      if (typeof value === 'string' && !rule.value.test(value)) {
        return rule.message ?? 'Invalid format';
      }
      return null;

    case 'custom':
      try {
        const res = await rule.validator(value, values);
        return res;
      } catch {
        return rule.message ?? 'Validation error';
      }

    default:
      return null;
  }
};
