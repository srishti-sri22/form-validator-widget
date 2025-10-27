export type ValidationMode = 'onChange' | 'onBlur' | 'onSubmit';

export type ThemeName =
  | 'modern_themes'
  | 'classic_themes'
  | 'dark_themes'
  | 'neon_themes'
  | 'pastel_themes'
  | 'forest_themes'
  | 'cyber_themes'
  | 'warm_themes';


export type FormTheme = {
  name: ThemeName;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
};


export type ValidationRule =
  | { type: 'required'; message?: string }
  | { type: 'minLength'; value: number; message?: string }
  | { type: 'maxLength'; value: number; message?: string }
  | { type: 'pattern'; value: RegExp; message?: string }
  | {
      type: 'custom';
      validator: (
        value: unknown,
        values?: Record<string, unknown>
      ) => string | null | Promise<string | null>;
      message?: string;
    };

export type FieldConfig = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: unknown;
  disabled?: boolean;
  maxLength?: number;
  options?: { value: string; label: string }[];
  validators?: ValidationRule[];
};

export type CustomizationOptions = {
  containerClass?: string;
  formClass?: string;
  buttonClass?: string;
  showAnimations?: boolean;
};

export type FormState = {
  values: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
};
