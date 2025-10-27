import { useCallback, useRef, useState } from "react";
import type { FormState } from "../utils/types";
import { useThrottle } from "../utils/useDebounceThrottle";

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
  const isThrottled = useRef(false);

  const throttledSubmit = useThrottle(submitFn, throttleMs);

const handleSubmit = useCallback(
  async (e?: React.FormEvent) => {
    e?.preventDefault?.();
    if (isSubmitting || isThrottled.current) return;

    setSubmitError(null);

    const errors = await validateForm();
    if (errors && Object.keys(errors).length > 0) {
      setSubmitError("Please fix validation errors before submitting.");
      return;
    }

    isThrottled.current = true;
    setIsSubmitting(true);

    try {
      await throttledSubmit(values);
    } catch (err) {
      setSubmitError((err as Error).message || "Submission failed.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        isThrottled.current = false;
      }, throttleMs);
    }
  },
  [submitFn, validateForm, throttleMs, throttledSubmit, isSubmitting, values]
);


  return {
    handleSubmit,
    isSubmitting,
    isThrottled: isThrottled.current,
    submitError,
    setSubmitError,
  };
};

export default useFormSubmission;
