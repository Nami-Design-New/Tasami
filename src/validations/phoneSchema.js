import * as yup from "yup";

export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+?[0-9\s]+$/,
      "Phone number must contain only numbers, spaces, and may start with +"
    )
    .min(8, "Phone number must be at least 8 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
});
