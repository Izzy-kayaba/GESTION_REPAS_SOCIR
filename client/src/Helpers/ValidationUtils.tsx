// ValidationUtils.ts
interface ValidationErrors {
    [key: string]: string;
  }
  
  // Utility function to validate form fields based on provided validation rules
  export const validateForm = (formData: Record<string, string>, validationRules: Record<string, (value: string) => string>): ValidationErrors => {
    
    const errors: ValidationErrors = {};
  
    // Loop through each form field and its corresponding validation rule
    Object.entries(validationRules).forEach(([fieldName, rule]) => {
      const value = formData[fieldName] || '';
      
      // Apply the validation rule to the field's value
      const error = rule(value);
      
      // If the validation rule returns an error message, store it in the errors object
      if (error) {
        errors[fieldName] = error;
      }
    });
  
    // Return the object containing any validation errors
    return errors;
  };
  