import { jsx as _jsx } from "react/jsx-runtime";
import FormValidationWidget from './components/FormValidationWidget';
const fields = [
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
    return (_jsx(FormValidationWidget, { fields: fields, title: "Create Account", subtitle: "Fill in your details below", validationMode: "onChange", onSubmit: async (values) => {
            await new Promise((r) => setTimeout(r, 1500));
            console.log('Form submitted successfully:', values);
            alert('Form submitted! Check console for values.');
        }, showResetButton: true, submitButtonText: "Submit", resetButtonText: "Clear Form" }));
}
export default App;
