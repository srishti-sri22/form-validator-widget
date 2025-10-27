import { useCallback, useState } from 'react';
import type { FieldConfig, FormState, ValidationMode } from '../utils/types';
import { runValidatorsForField } from '../utils/validators';

export const useFormValidator = (fields: FieldConfig[], validationMode: ValidationMode = 'onBlur') => {
  const initialValues = fields.reduce<Record<string, unknown>>((acc, f) => {
    acc[f.name] = f.defaultValue ?? '';
    return acc;
  }, {});

  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
  });

  const setFormStateInternal = (partial: Partial<FormState>) => {
    setFormState((prev) => ({ ...prev, ...partial }));
  };

  /**
   * Update a field value immediately.
   * If validationMode === 'onChange', run async validators and update errors when ready.
   */
  const setFieldValue = useCallback((name: string, value: unknown) => {
    setFormState((prev) => {
      const nextValues = { ...prev.values, [name]: value };
      return { ...prev, values: nextValues };
    });

    if (validationMode === 'onChange') {
      const field = fields.find((f) => f.name === name);
      if (field) {
        // run validators async and update errors when done
        (async () => {
          try {
            const err = await runValidatorsForField(field, value, { ...formState.values, [name]: value });
            setFormState((prev) => {
              const nextErrors = { ...prev.errors };
              if (err) nextErrors[name] = err;
              else delete nextErrors[name];
              return { ...prev, errors: nextErrors };
            });
          } catch (e) {
            setFormState((prev) => ({ ...prev, errors: { ...prev.errors, [name]: (e as Error).message || 'Validation error' } }));
          }
        })();
      }
    }
  }, [fields, validationMode, formState.values]);

  const setFieldTouched = useCallback((name: string) => {
    setFormState((prev) => ({ ...prev, touched: { ...prev.touched, [name]: true } }));
  }, []);

  /**
   * Validate all fields and return a map of errors.
   */
  const validateFormFields = useCallback(async (): Promise<Record<string, string>> => {
    const newErrors: Record<string, string> = {};
    for (const f of fields) {
      try {
        const err = await runValidatorsForField(f, formState.values[f.name], formState.values);
        if (err) newErrors[f.name] = err;
      } catch (e) {
        newErrors[f.name] = (e as Error).message || 'Validation error';
      }
    }
    setFormState((prev) => ({ ...prev, errors: newErrors }));
    return newErrors;
  }, [fields, formState.values]);

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
    });
  }, [initialValues]);

  return {
    formState,
    setFieldValue,
    setFieldTouched,
    validateFormFields,
    resetForm,
    setFormState: setFormStateInternal,
  };
};

export default useFormValidator;
