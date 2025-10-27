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

const inputTypes = ['text', 'email', 'password', 'number', 'tel', 'url'];

export const FormField: React.FC<Props> = ({
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
      // small micro animation: add class to trigger css transition then remove
      const el = rootRef.current;
      el.classList.add('fv-animate');
      const tid = setTimeout(() => el.classList.remove('fv-animate'), 350);
      return () => clearTimeout(tid);
    }
    return;
  }, [showAnimation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = type === 'number' ? (e.target as HTMLInputElement).valueAsNumber : e.target.value;
    onChange(name, val);
  };

  const handleBlur = () => onBlur(name);

  return (
    <div className={`fv-field ${error && touched ? 'fv-error' : ''}`} ref={rootRef}>
      <label htmlFor={name} className="fv-label">{label}</label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={(value ?? '') as string}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={maxLength}
          disabled={disabled}
          className="fv-input"
          aria-invalid={!!error}
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
          aria-invalid={!!error}
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
          type={inputTypes.includes(type) ? type : 'text'}
          value={(value ?? '') as string}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          maxLength={maxLength}
          className="fv-input"
          aria-invalid={!!error}
        />
      )}

      <div className="fv-meta">
        {touched && error ? <div className="fv-error-text">{error}</div> : null}
      </div>
    </div>
  );
};

// export default FormField;
