// Main component export
export { default } from './components/FormValidationWidget';
import './styles/FormValidationWidget.css';

export { default as FormValidationWidget } from './components/FormValidationWidget';
// Type exports from utils/types
export type {
  FieldConfig,
  ValidationRule,
  ValidationMode,
  FormState,
  CustomizationOptions,
  FormTheme,
  ThemeName
} from './utils/types';

// Type export from component
export type { FormWidgetProps } from './components/FormValidationWidget';

// Theme utilities (optional - users might want to use themes)
export { themes, getTheme, generateThemeVariables } from './utils/themes';

// Export CSS (users need to import this)
import './styles/FormValidationWidget.css';