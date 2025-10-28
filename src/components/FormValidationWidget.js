import { jsx as _jsx } from "react/jsx-runtime";
import DynamicForm from './DynamicForm';
import '../styles/style.css';
const FormValidationWidget = (props) => {
    return _jsx(DynamicForm, { ...props });
};
export default FormValidationWidget;
