import React from 'react';
import FormValidationWidget from './components/FormValidationWidget';
import type { FieldConfig } from './utils/types';

const fields: FieldConfig[] = [
  { 
    name: 'name', 
    label: 'Full Name', 
    validators: [
      { type: 'required', message: 'Name is required' },
      { type: 'minLength', value: 3, message: 'Name must be at least 3 characters' }
    ] 
  },
  { 
    name: 'email', 
    label: 'Email Address', 
    validators: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', value: /^\S+@\S+\.\S+$/, message: 'Please enter a valid email address' }
    ] 
  },
  { 
    name: 'password', 
    label: 'Password', 
    type: 'password',
    validators: [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
    ] 
  },
  { 
    name: 'bio', 
    label: 'Bio (Optional)', 
    type: 'textarea', 
    maxLength: 300,
    validators: [
      { type: 'maxLength', value: 300, message: 'Bio must not exceed 300 characters' }
    ]
  },
];

function App() {
  return (
    <FormValidationWidget
      fields={fields}
      title="Create Account"
      subtitle="Fill in your details below"
      validationMode="onChange"  
      onSubmit={async (values: Record<string, unknown>) => {
        await new Promise((r) => setTimeout(r, 1500));
        console.log('Form submitted successfully:', values);
        alert('Form submitted! Check console for values.');
      }}
      showResetButton
      submitButtonText="Submit"
      resetButtonText="Clear Form"
    />
  );
}

export default App;