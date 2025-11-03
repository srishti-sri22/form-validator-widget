import { useCallback, useRef, useState } from "react";
export const useFormSubmission = (submitFn, validateForm, values, throttleMs = 1000, _setFormState) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const lastSubmitTime = useRef(0);
    const handleSubmit = useCallback(async (e) => {
        e?.preventDefault?.();
        if (isSubmitting)
            return;
        
        const now = Date.now();
        const timeSinceLastSubmit = now - lastSubmitTime.current;
        if (timeSinceLastSubmit < throttleMs) {
            setSubmitError(`Please wait ${Math.ceil((throttleMs - timeSinceLastSubmit) / 1000)} seconds before submitting again.`);
            return;
        }
        setSubmitError(null);
        const errors = await validateForm();
        if (errors && Object.keys(errors).length > 0) {
            setSubmitError("Please fix validation errors before submitting.");
            return;
        }
        lastSubmitTime.current = now;
        setIsSubmitting(true);
        try {
            await submitFn(values);
        }
        catch (err) {
            setSubmitError(err.message || "Submission failed.");
        }
        finally {
            setIsSubmitting(false);
        }
    }, [submitFn, validateForm, throttleMs, isSubmitting, values]);
    return {
        handleSubmit,
        isSubmitting,
        submitError,
        setSubmitError,
    };
};
export default useFormSubmission;
