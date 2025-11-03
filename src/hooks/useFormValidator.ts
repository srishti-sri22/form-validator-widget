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

  const setFieldValue = useCallback(
    async (name: string, value: unknown) => {
     
      setFormState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: value },
      }));

     
      if (validationMode === 'onChange') {
        const field = fields.find((f) => f.name === name);
        if (field) {
          try {
            const allValues = { ...formState.values, [name]: value };
            const err = await runValidatorsForField(field, value, allValues);
            
            setFormState((prev) => {
              const nextErrors = { ...prev.errors };
              if (err) {
                nextErrors[name] = err;
              } else {
                delete nextErrors[name];
              }
              return { ...prev, errors: nextErrors };
            });
          } catch (e) {
            setFormState((prev) => ({
              ...prev,
              errors: { 
                ...prev.errors, 
                [name]: (e as Error).message || 'Validation error' 
              },
            }));
          }
        }
      }
    },
    [fields, validationMode, formState.values]
  );

  const setFieldTouched = useCallback(
    async (name: string) => {
      // Mark as touched
      setFormState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [name]: true },
      }));

      const field = fields.find((f) => f.name === name);
      if (field) {
        try {
          const err = await runValidatorsForField(
            field,
            formState.values[name],
            formState.values
          );
          
          setFormState((prev) => {
            const nextErrors = { ...prev.errors };
            if (err) {
              nextErrors[name] = err;
            } else {
              delete nextErrors[name];
            }
            return { ...prev, errors: nextErrors };
          });
        } catch (e) {
          setFormState((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              [name]: (e as Error).message || 'Validation error',
            },
          }));
        }
      }
    },
    [fields, formState.values]
  );


  const validateFormFields = useCallback(async (): Promise<Record<string, string>> => {
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    // Validate all fields
    for (const field of fields) {
      newTouched[field.name] = true;
      try {
        const err = await runValidatorsForField(
          field,
          formState.values[field.name],
          formState.values
        );
        if (err) {
          newErrors[field.name] = err;
        }
      } catch (e) {
        newErrors[field.name] = (e as Error).message || 'Validation error';
      }
    }

    setFormState((prev) => ({
      ...prev,
      errors: newErrors,
      touched: { ...prev.touched, ...newTouched },
    }));

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