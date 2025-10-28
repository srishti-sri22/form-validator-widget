import React from 'react';
import DynamicForm from './DynamicForm';
import type { FieldConfig, CustomizationOptions } from '../utils/types';
import '../styles/style.css';
import type { FormTheme, ThemeName } from '../utils/types';

export interface FormWidgetProps {
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
  title: string;
  subtitle: string;
}

const FormValidationWidget: React.FC<FormWidgetProps> = (props) => {
  return <DynamicForm {...props} />;
};

export default FormValidationWidget;