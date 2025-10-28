import './styles/style.css';

export { default } from './components/FormValidationWidget';

export { default as FormValidationWidget } from './components/FormValidationWidget';

export * from './utils/types';
export type {
  FieldConfig,
  ValidationRule,
  ValidationMode,
  FormState,
  CustomizationOptions,
  FormTheme,
  ThemeName,  
} from './utils/types';

export type { FormWidgetProps } from './components/FormValidationWidget';

export { themes, getTheme, generateThemeVariables } from './utils/themes';
