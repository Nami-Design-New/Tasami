import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import useChangeEmployeePassword from "../../../hooks/dashboard/employee/useChangeEmployeePassword";
import CustomButton from "../../CustomButton";
import PasswordField from "../../forms/PasswordField";
import FormWrapper from "../../forms/FormWrapper";

const EmployeePasswordTab = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { changeEmployeePassword, isPending } = useChangeEmployeePassword();

  const schema = yup.object({
    password: yup
      .string()
      .required(t("validation.required"))
      .min(6, t("validation.min", { num: 6 })),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], t("validation.passwordsMustMatch"))
      .required(t("validation.required")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data) => {
    const payload = new FormData();
    payload.append("_method", "put");
    payload.append("password", data.password);
    payload.append("password_confirmation", data.password_confirmation);

    changeEmployeePassword(
      { employeeId: id, payload },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          reset();
        },
        onError: (err) => {
          toast.error(err?.message);
        },
      },
    );
  };

  return (
    <FormWrapper title={t("dashboard.employeeProfile.passwordChange.title")}>
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <PasswordField
              type="password"
              autoComplete={false}
              label={t("dashboard.employeeProfile.passwordChange.newPassword")}
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
          <div className="col-12 col-md-6 p-2">
            <PasswordField
              type="password"
              autoComplete={false}
              label={t(
                "dashboard.employeeProfile.passwordChange.confirmPassword",
              )}
              error={errors.password_confirmation?.message}
              {...register("password_confirmation")}
            />
          </div>
          <div className="col-12 p-2">
            <CustomButton type="submit" size="large" loading={isPending}>
              {t("dashboard.employeeProfile.passwordChange.confirm")}
            </CustomButton>
          </div>
        </div>
      </form>
    </FormWrapper>
  );
};

export default EmployeePasswordTab;
