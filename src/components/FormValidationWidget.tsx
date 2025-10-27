import React from 'react';
import DynamicForm from './ChangeForm';
import type { FieldConfig, CustomizationOptions } from '../utils/types';
import '../styles/FormValidationWidget.css';
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

}

 const FormValidationWidget: React.FC<FormWidgetProps> = (props) => {
  return <DynamicForm {...props} />;
};

export default FormValidationWidget;
