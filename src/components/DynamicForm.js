import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useFormSubmission } from "../hooks/useFormSubmission";
import { useFormValidator } from "../hooks/useFormValidator";
import { generateThemeVariables, getTheme } from "../utils/themes";
import "../styles/style.css";
import FormField from "./FormField";
const DynamicForm = ({ fields, onSubmit, validationMode = "onBlur", customization = {}, submitButtonText = "Submit", resetButtonText = "Reset", showResetButton = true, disabled = false, className, submitThrottleMs = 1200, theme = "modern_themes", title = "Welcome Back", subtitle = "Please fill in the form below", }) => {
    const { formState, setFieldValue, setFieldTouched, validateFormFields, resetForm, setFormState, } = useFormValidator(fields, validationMode);
    const { handleSubmit, isSubmitting, submitError, setSubmitError, } = useFormSubmission(onSubmit, validateFormFields, formState.values, submitThrottleMs, setFormState);
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
    return (_jsx("div", { className: wrapperClass, style: themeVariables, children: _jsxs("form", { onSubmit: handleSubmit, className: formClass, noValidate: true, children: [_jsxs("div", { className: "fvw-form-header", children: [_jsx("h1", { className: "fvw-form-title", children: title }), _jsx("p", { className: "fvw-form-subtitle", children: subtitle })] }), _jsxs("div", { className: "fvw-root", children: [fields.map((field) => (_jsx(FormField, { field: field, value: formState.values[field.name], error: formState.errors[field.name] || "", touched: !!formState.touched[field.name], disabled: disabled || !!field.disabled, onChange: (name, value) => setFieldValue(name, value), onBlur: (name) => setFieldTouched(name), showAnimation: customization.showAnimations !== false }, field.name))), submitError && (_jsxs("div", { role: "alert", className: "fvw-submit-error", children: ["\uD83D\uDEA8 ", submitError] })), _jsxs("div", { className: "fvw-actions", children: [_jsx("button", { type: "submit", disabled: disabled || isSubmitting, className: submitBtnClass, children: isSubmitting ? "Submitting..." : submitButtonText }), showResetButton && (_jsx("button", { type: "button", onClick: resetForm, disabled: disabled || isSubmitting, className: resetBtnClass, children: resetButtonText }))] })] })] }) }));
};
export default DynamicForm;
