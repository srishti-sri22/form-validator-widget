import { useCallback, useRef, useState } from "react";
import type { FormState } from "../utils/types";

type SubmitFn = (values: Record<string, unknown>) => void | Promise<void>;

type SetFormStateFn =
  | ((partial: Partial<FormState>) => void)
  | ((updater: (prev: FormState) => Partial<FormState>) => void);

export const useFormSubmission = (
  submitFn: SubmitFn,
  validateForm: () => Promise<Record<string, string> | void>,
  values: Record<string, unknown>,
  throttleMs = 1000,
  setFormState?: SetFormStateFn
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Track last submission time for throttling
  const lastSubmitTime = useRef<number>(0);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault?.();

      // Prevent submission if already submitting
      if (isSubmitting) return;

      // Check throttle
      const now = Date.now();
      const timeSinceLastSubmit = now - lastSubmitTime.current;
      
      if (timeSinceLastSubmit < throttleMs) {
        setSubmitError(
          `Please wait ${Math.ceil((throttleMs - timeSinceLastSubmit) / 1000)} seconds before submitting again.`
        );
        return;
      }

      setSubmitError(null);

      // Validate form
      const errors = await validateForm();
      if (errors && Object.keys(errors).length > 0) {
        setSubmitError("Please fix validation errors before submitting.");
        return;
      }

      // Update last submit time
      lastSubmitTime.current = now;
      setIsSubmitting(true);

      try {
        await submitFn(values);
        // Submission successful
      } catch (err) {
        setSubmitError((err as Error).message || "Submission failed.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [submitFn, validateForm, throttleMs, isSubmitting, values]
  );

  return {
    handleSubmit,
    isSubmitting,
    submitError,
    setSubmitError,
  };
};

export default useFormSubmission;