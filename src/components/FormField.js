import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import '../styles/style.css';
const allowedInputTypes = ['text', 'email', 'password', 'number', 'tel', 'url'];
const FormField = ({ field, value, error, touched, onChange, onBlur, disabled = false, showAnimation = true, }) => {
    const { label, name, type = 'text', placeholder, options, maxLength } = field;
    const rootRef = useRef(null);
    useEffect(() => {
        if (showAnimation && rootRef.current) {
            const el = rootRef.current;
            el.classList.add('fv-animate');
            const tid = setTimeout(() => el.classList.remove('fv-animate'), 350);
            return () => clearTimeout(tid);
        }
    }, [showAnimation]);
    const handleChange = (e) => {
        const val = type === 'number'
            ? e.target.valueAsNumber
            : e.target.value;
        onChange(name, val);
    };
    const handleBlur = () => onBlur(name);
    const hasError = touched && !!error;
    return (_jsxs("div", { className: `fv-field ${error ? "fv-error" : ""} ${showAnimation ? "fv-animate" : ""}`, ref: rootRef, children: [_jsx("label", { htmlFor: name, className: "fv-label", children: label }), type === 'textarea' ? (_jsx("textarea", { id: name, name: name, value: (value ?? ''), placeholder: placeholder, maxLength: maxLength, onChange: handleChange, onBlur: handleBlur, disabled: disabled, className: "fv-input", "aria-invalid": hasError })) : options && options.length > 0 ? (_jsxs("select", { id: name, name: name, value: (value ?? ''), onChange: handleChange, onBlur: handleBlur, disabled: disabled, className: "fv-input", "aria-invalid": hasError, children: [_jsx("option", { value: "", children: "Select" }), options.map((o) => (_jsx("option", { value: o.value, children: o.label }, o.value)))] })) : (_jsx("input", { id: name, name: name, type: allowedInputTypes.includes(type) ? type : 'text', value: (value ?? ''), placeholder: placeholder, maxLength: maxLength, onChange: handleChange, onBlur: handleBlur, disabled: disabled, className: "fv-input", "aria-invalid": hasError })), hasError && _jsx("div", { className: "fv-error-text", children: error })] }));
};
export default FormField;
