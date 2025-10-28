import React, { useEffect, useRef } from 'react';
import type { FieldConfig } from '../utils/types';
import '../styles/FormValidationWidget.css';

interface Props {
  field: FieldConfig;
  value: unknown;
  error: string;
  touched: boolean;
  onChange: (name: string, value: unknown) => void;
  onBlur: (name: string) => void;
  disabled?: boolean;
  showAnimation?: boolean;
}

const allowedInputTypes = ['text', 'email', 'password', 'number', 'tel', 'url'];

const FormField: React.FC<Props> = ({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled = false,
  showAnimation = true,
}) => {
  const { label, name, type = 'text', placeholder, options, maxLength } = field;
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showAnimation && rootRef.current) {
      const el = rootRef.current;
      el.classList.add('fv-animate');
      const tid = setTimeout(() => el.classList.remove('fv-animate'), 350);
      return () => clearTimeout(tid);
    }
  }, [showAnimation]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const val = type === 'number'
      ? (e.target as HTMLInputElement).valueAsNumber
      : e.target.value;

    onChange(name, val);
  };

  const handleBlur = () => onBlur(name);

  const hasError = touched && !!error;

  return (
    <div className={`fv-field ${error ? "fv-error" : ""} ${showAnimation ? "fv-animate" : ""}`} ref={rootRef}>
      <label htmlFor={name} className="fv-label">{label}</label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={(value ?? '') as string}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className="fv-input"
          aria-invalid={hasError}
        />
      ) : options && options.length > 0 ? (
        <select
          id={name}
          name={name}
          value={(value ?? '') as string}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className="fv-input"
          aria-invalid={hasError}
        >
          <option value="">Select</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={allowedInputTypes.includes(type) ? type : 'text'}
          value={(value ?? '') as string}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className="fv-input"
          aria-invalid={hasError}
        />
      )}

      {hasError && <div className="fv-error-text">{error}</div>}
    </div>
  );
};

export default FormField;
