import React from 'react';
import FormValidationWidget from './components/FormValidationWidget';
import type { FieldConfig } from './utils/types';

const fields: FieldConfig[] = [
  { name: 'firstName', label: 'First name', validators: [{ type: 'required' }] },
  { name: 'email', label: 'Email', validators: [
    { type: 'required' },
    { type: 'pattern', value: /^\S+@\S+\.\S+$/ }
  ] },
  { name: 'bio', label: 'Bio', type: 'textarea', maxLength: 300 },
];

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Form Validation Widget</h2>
      <FormValidationWidget
        fields={fields}
        onSubmit={async (values: Record<string, unknown>) => {
          await new Promise((r) => setTimeout(r, 500));
          console.log('submitted', values);
        }}
        showResetButton
      />
    </div>
  );
}

export default App;
