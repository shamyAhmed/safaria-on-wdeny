import { FormInstance } from "antd";
import toast from "react-hot-toast";

type ApiResponseType = {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
};

export const handleFormErrors = (
  form: FormInstance<Record<string, string>>,
  errors: ApiResponseType | null,
) => {
  const errorsFromAPI = errors?.response?.data?.errors;
  const errorMessage = errors?.response?.data?.message;

  if (errorsFromAPI) {
    // Show all error messages in a toast
    Object.values(errorsFromAPI).forEach((errorMessages) => {
      errorMessages.forEach((errMsg) => {
        toast.error(errMsg);
      });
    });

    // Set form field errors
    Object.keys(errorsFromAPI).forEach((fieldName) => {
      form.setFields([
        {
          name: fieldName,
          errors: errorsFromAPI[fieldName],
        },
      ]);
    });
  } else if (errorMessage) {
    // Show general error message if present
    // toast.error(errorMessage);
  }
};
