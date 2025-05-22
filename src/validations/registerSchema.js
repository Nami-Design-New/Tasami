import * as yup from "yup";

// Step 1: Personal Information Schema
export const personalInfoSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("الاسم الأول مطلوب")
    .min(2, "الاسم الأول يجب أن يكون على الأقل حرفين"),
  last_name: yup
    .string()
    .required("اسم العائلة مطلوب")
    .min(1, "اسم العائلة مطلوب"),
  date_of_birth: yup
    .date()
    .required("تاريخ الميلاد مطلوب")
    .max(new Date(), "تاريخ الميلاد يجب أن يكون في الماضي"),
  gender: yup.string().required("الجنس مطلوب"),
  nationality: yup.string().required("الجنسية مطلوبة"),
  country: yup.string().required("بلد الإقامة مطلوب"),
  city: yup.string().required("المدينة مطلوبة"),
});

// Step 2: Account Information Schema
export const accountInfoSchema = yup.object().shape({
  phone: yup
    .string()
    .required("رقم الهاتف مطلوب")
    .matches(
      /^\+?[0-9\s]+$/,
      "رقم الهاتف يجب أن يحتوي على أرقام فقط وقد يبدأ بعلامة +"
    )
    .min(8, "رقم الهاتف يجب أن يكون على الأقل 8 أرقام"),
  email: yup
    .string()
    .required("البريد الإلكتروني مطلوب")
    .email("صيغة البريد الإلكتروني غير صحيحة"),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(8, "كلمة المرور يجب أن تكون على الأقل 8 أحرف")
    .matches(/[a-zA-Z]/, "كلمة المرور يجب أن تحتوي على حرف واحد على الأقل")
    .matches(/\d/, "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل")
    .matches(
      /[@$!%*?&#]/,
      "كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل"
    ),
  confirmPassword: yup
    .string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([yup.ref("password")], "كلمة المرور غير متطابقة"),
});
