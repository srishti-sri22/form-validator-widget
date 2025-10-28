import { useCallback, useState } from 'react';
import { runValidatorsForField } from '../utils/validators';
export const useFormValidator = (fields, validationMode = 'onBlur') => {
    const initialValues = fields.reduce((acc, f) => {
        acc[f.name] = f.defaultValue ?? '';
        return acc;
    }, {});
    const [formState, setFormState] = useState({
        values: initialValues,
        errors: {},
        touched: {},
    });
    const setFormStateInternal = (partial) => {
        setFormState((prev) => ({ ...prev, ...partial }));
    };
    /**
     * Update a field value immediately and validate based on mode
     */
    const setFieldValue = useCallback(async (name, value) => {
        // Update value immediately
        setFormState((prev) => ({
            ...prev,
            values: { ...prev.values, [name]: value },
        }));
        // Validate on change if mode is onChange OR if field was already touched
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
                        }
                        else {
                            delete nextErrors[name];
                        }
                        return { ...prev, errors: nextErrors };
                    });
                }
                catch (e) {
                    setFormState((prev) => ({
                        ...prev,
                        errors: {
                            ...prev.errors,
                            [name]: e.message || 'Validation error'
                        },
                    }));
                }
            }
        }
    }, [fields, validationMode, formState.values]);
    /**
     * Mark field as touched and validate on blur
     */
    const setFieldTouched = useCallback(async (name) => {
        // Mark as touched
        setFormState((prev) => ({
            ...prev,
            touched: { ...prev.touched, [name]: true },
        }));
        // Always validate on blur regardless of mode
        const field = fields.find((f) => f.name === name);
        if (field) {
            try {
                const err = await runValidatorsForField(field, formState.values[name], formState.values);
                setFormState((prev) => {
                    const nextErrors = { ...prev.errors };
                    if (err) {
                        nextErrors[name] = err;
                    }
                    else {
                        delete nextErrors[name];
                    }
                    return { ...prev, errors: nextErrors };
                });
            }
            catch (e) {
                setFormState((prev) => ({
                    ...prev,
                    errors: {
                        ...prev.errors,
                        [name]: e.message || 'Validation error',
                    },
                }));
            }
        }
    }, [fields, formState.values]);
    /**
     * Validate all fields and mark all as touched
     */
    const validateFormFields = useCallback(async () => {
        const newErrors = {};
        const newTouched = {};
        // Validate all fields
        for (const field of fields) {
            newTouched[field.name] = true;
            try {
                const err = await runValidatorsForField(field, formState.values[field.name], formState.values);
                if (err) {
                    newErrors[field.name] = err;
                }
            }
            catch (e) {
                newErrors[field.name] = e.message || 'Validation error';
            }
        }
        // Update state with all errors and touched fields
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
