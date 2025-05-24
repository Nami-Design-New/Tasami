import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email Format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  // .matches(/[a-zA-Z]/, "Password must contain at least one letter")
  // .matches(/\d/, "Password must contain at least one number")
  // .matches(
  //   /[@$!%*?&#]/,
  //   "Password must contain at least one special character"
  // ),
});
