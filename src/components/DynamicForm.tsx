import React, { useEffect } from "react";
import { useFormSubmission } from "../hooks/useFormSubmission";
import { useFormValidator } from "../hooks/useFormValidator";
import { generateThemeVariables, getTheme } from "../utils/themes";
import "../styles/FormValidationWidget.css";

import type {
  CustomizationOptions,
  FieldConfig,
  FormTheme,
  ThemeName,
} from "../utils/types";
import FormField from "./FormField";

interface FormProps {
  fields: FieldConfig[];
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
  validationMode?: "onChange" | "onBlur" | "onSubmit";
  customization?: CustomizationOptions;
  submitButtonText?: string;
  resetButtonText?: string;
  showResetButton?: boolean;
  disabled?: boolean;
  className?: string;
  submitThrottleMs?: number;
  theme?: ThemeName | FormTheme;
  title?: string;
  subtitle?: string;
}

const DynamicForm: React.FC<FormProps> = ({
  fields,
  onSubmit,
  validationMode = "onBlur",
  customization = {},
  submitButtonText = "Submit",
  resetButtonText = "Reset",
  showResetButton = true,
  disabled = false,
  className,
  submitThrottleMs = 1200,
  theme = "modern_themes",
  title = "Welcome Back",
  subtitle = "Please fill in the form below",
}) => {
  const {
    formState,
    setFieldValue,
    setFieldTouched,
    validateFormFields,
    resetForm,
    setFormState,
  } = useFormValidator(fields, validationMode);

  const {
    handleSubmit,
    isSubmitting,
    submitError,
    setSubmitError,
  } = useFormSubmission(
    onSubmit,
    validateFormFields,
    formState.values,
    submitThrottleMs,
    setFormState
  );

  // Clear submit error when there are no validation errors
  useEffect(() => {
    const hasErrors = Object.values(formState.errors).some(Boolean);
    if (!hasErrors && submitError) {
      setSubmitError(null);
    }
  }, [formState.errors, submitError, setSubmitError]);

  const selectedTheme = getTheme(theme);
  const themeVariables = generateThemeVariables(selectedTheme);

  // Build class names with customization support
  const wrapperClass = [
    "fvw-wrapper",
    className,
    customization.containerClass,
  ]
    .filter(Boolean)
    .join(" ");

  const formClass = ["fvw-form", customization.formClass]
    .filter(Boolean)
    .join(" ");

  const submitBtnClass = [
    "fvw-btn-submit",
    customization.buttonClass,
    isSubmitting ? "loading" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const resetBtnClass = ["fvw-btn-reset", customization.buttonClass]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClass} style={themeVariables as React.CSSProperties}>
      <form onSubmit={handleSubmit} className={formClass} noValidate>
        {/* Form Header */}
        <div className="fvw-form-header">
          <h1 className="fvw-form-title">{title}</h1>
          <p className="fvw-form-subtitle">{subtitle}</p>
        </div>

        <div className="fvw-root">
          {fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formState.values[field.name]}
              error={formState.errors[field.name] || ""}
              touched={!!formState.touched[field.name]}
              disabled={disabled || !!field.disabled}
              onChange={(name, value) => setFieldValue(name, value)}
              onBlur={(name) => setFieldTouched(name)}
              showAnimation={customization.showAnimations !== false}
            />
          ))}

          {submitError && (
            <div role="alert" className="fvw-submit-error">
              🚨 {submitError}
            </div>
          )}

          <div className="fvw-actions">
            <button
              type="submit"
              disabled={disabled || isSubmitting}
              className={submitBtnClass}
            >
              {isSubmitting ? "Submitting..." : submitButtonText}
            </button>

            {showResetButton && (
              <button
                type="button"
                onClick={resetForm}
                disabled={disabled || isSubmitting}
                className={resetBtnClass}
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