import { useState, useCallback } from "react";

interface FormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export const useForm = <T extends Record<string, unknown>>({ 
  initialValues, 
  validate 
}: FormOptions<T>) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isDirty, setIsDirty] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleInputChange = useCallback((field: keyof T, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(prev => ({ ...prev, [field]: true }));
    
    if (validate) {
      const validationErrors = validate({ ...formData, [field]: value });
      setFormErrors(prev => ({ ...prev, [field]: validationErrors[field] }));
    } else if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [formData, formErrors, validate]);

  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setFormErrors({});
    setIsDirty({});
  }, [initialValues]);

  const validateForm = useCallback(() => {
    if (!validate) return true;
    
    const errors = validate(formData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, validate]);

  return { 
    formData, 
    formErrors, 
    isDirty,
    setFormErrors,
    handleInputChange,
    resetForm,
    validateForm
  };
};