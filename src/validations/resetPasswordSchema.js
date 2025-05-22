import * as yup from "yup";

// Email validation schema
export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

// Phone validation schema
export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+?[0-9\s]+$/,
      "Phone number must contain only numbers, spaces, and may start with +"
    )
    .min(8, "Phone number must be at least 8 characters long"),
});

// Combined schema for reset password form
export const resetPasswordSchema = {
  email: emailSchema,
  phone: phoneSchema,
};
