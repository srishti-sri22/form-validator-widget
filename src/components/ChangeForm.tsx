import React, { useEffect } from 'react';
import { useFormSubmission } from '../hooks/useFormSubmission';
import { useFormValidator } from '../hooks/useFormValidator';
import {
  generateThemeVariables,
  getTheme
} from '../utils/themes';

import type {
  FormTheme,
  ThemeName
} from '../utils/types'; 

import type { CustomizationOptions, FieldConfig } from '../utils/types';
import {FormField}  from '../components/FormField';

interface FormProps {
  fields: FieldConfig[];
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
  validationMode?: 'onChange' | 'onBlur' | 'onSubmit';
  customization?: CustomizationOptions;
  submitButtonText?: string;
  resetButtonText?: string;
  showResetButton?: boolean;
  disabled?: boolean;
  className?: string;
  submitThrottleMs?: number;
  theme?: ThemeName | FormTheme;
}

export const DynamicForm: React.FC<FormProps> = ({
  fields,
  onSubmit,
  validationMode = 'onBlur',
  customization,
  submitButtonText = 'Submit',
  resetButtonText = 'Reset',
  showResetButton = false,
  disabled = false,
  className,
  submitThrottleMs = 1000,
  theme = 'modern_themes',
}) => {
  const {
    formState,
    setFieldValue,
    setFieldTouched,
    validateFormFields,
    resetForm,
    setFormState,
  } = useFormValidator(fields, validationMode);

  const { handleSubmit, isSubmitting, isThrottled, submitError, setSubmitError } =
    useFormSubmission(onSubmit, validateFormFields, formState.values, submitThrottleMs, setFormState);

  useEffect(() => {
    const hasErrors = Object.values(formState.errors).some(Boolean);
    if (!hasErrors && submitError) {
      setSubmitError(null);
    }
  }, [formState.errors, submitError, setSubmitError]);

  const selectedTheme = getTheme(theme);
  const themeVariables = generateThemeVariables(selectedTheme);

  const containerClass = ['form-container', className, customization?.containerClass]
    .filter(Boolean)
    .join(' ');

  const buttonClass = [
    'form-button',
    'primary',
    customization?.buttonClass,
    isSubmitting ? 'loading' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const resetButtonClass = ['form-button', 'secondary', customization?.buttonClass]
    .filter(Boolean)
    .join(' ');

  const formContainerClass = ['fv-form', customization?.formClass].filter(Boolean).join(' ');

  return (
    <div style={themeVariables as React.CSSProperties}>
      <form onSubmit={handleSubmit} className={formContainerClass} noValidate>
        <div className={containerClass}>
          {fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formState.values[field.name]}
              error={formState.errors[field.name] || ''}
              touched={!!formState.touched[field.name]}
              disabled={disabled || !!field.disabled}
              showAnimation={customization?.showAnimations !== false}
              onChange={(name, value) => setFieldValue(name, value)}
              onBlur={(name) => setFieldTouched(name)}
            />
          ))}

          {submitError && (
            <div role="alert" className="fv-submit-error">
              ⚠ {submitError}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              disabled={disabled || isSubmitting || isThrottled}
              className={buttonClass}
            >
              {isSubmitting ? 'Submitting...' : submitButtonText}
            </button>

            {showResetButton && (
              <button
                type="button"
                onClick={resetForm}
                disabled={disabled || isSubmitting}
                className={resetButtonClass}
              >
                {resetButtonText}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
