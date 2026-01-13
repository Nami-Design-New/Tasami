// import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo } from "react";

import useGetUsersAccountsInfinite from "../../../hooks/dashboard/subscription/useGetUsersAccountsInfinite";

import PageHeader from "../../../ui/PageHeader";
import FormWrapper from "../../../ui/forms/FormWrapper";
import InputField from "../../../ui/forms/InputField";
import SelectField from "../../../ui/forms/SelectField";
import SelectFieldReactSelect from "../../../ui/forms/SelectFieldReactSelect";
import TextField from "../../../ui/forms/TextField";
import CustomButton from "../../../ui/CustomButton";
import { Controller, useForm } from "react-hook-form";
import useSendPublicNotification from "../../../hooks/dashboard/websiteManagment/public-notifications/useSendPublicNotification";
import { toast } from "sonner";

/* =======================
   Yup Validation Schema
======================= */
const schema = yup.object({
  type: yup.string().required("Notification type is required"),

  title: yup.string().required("Notification title is required"),

  description: yup.string().required("Notification message is required"),

  usersIds: yup.array().when("type", {
    is: "specific",
    then: (schema) =>
      schema
        .min(1, "Please select at least one user")
        .required("Users are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function PublicNotifications() {
  const { t } = useTranslation();

  /* =======================
     Users Infinite Query
  ======================= */
  const {
    usersAccounts,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUsersAccountsInfinite();

  /* =======================
     Send Public Notification
  ======================= */
  const { sendPublicNotification, isSendingPublicNotification } =
    useSendPublicNotification();

  const users = useMemo(
    () =>
      usersAccounts?.map((u) => ({
        value: u.id,
        name:
          `${u?.first_name} ${u?.last_name} / ${u?.account_code}` || "Unnamed",
      })),
    [usersAccounts]
  );

  /* =======================
     React Hook Form
  ======================= */
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "all",
      usersIds: [],
    },
  });

  const selectedType = watch("type");

  /* =======================
     Clear users when type = all
  ======================= */
  useEffect(() => {
    if (selectedType === "all") {
      setValue("usersIds", []);
    }
  }, [selectedType, setValue]);

  /* =======================
     Submit
  ======================= */
  const onSubmit = (data) => {
    const payload = {
      ...data,
      usersIds: data.type === "specific" ? data?.usersIds : [],
    };

    sendPublicNotification(payload, {
      onSuccess: (res) => {
        toast.success(res.message || "Public notification sent successfully");
        reset();
      },
      onError: (err) => {
        toast.error(err.message || "Error sending public notification");
      },
    });
  };

  return (
    <section>
      <div className="p-2 d-flex align-items-center justify-content-between">
        <PageHeader />
      </div>

      <FormWrapper title={t("dashboard.public_notifications.title")}>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Notification Type */}
            <div className="col-12 col-md-6 col-xl-4 p-2">
              <SelectField
                label={t("dashboard.public_notifications.notificationType")}
                {...register("type")}
                error={errors.type?.message}
                options={[
                  {
                    value: "all",
                    name: t("dashboard.public_notifications.all"),
                  },
                  {
                    value: "specific",
                    name: t("dashboard.public_notifications.specific"),
                  },
                ]}
              />
            </div>

            {/* Users (only when specific) */}
            {selectedType === "specific" && (
              <div className="col-12 col-md-6 col-xl-4 p-2">
                <Controller
                  name="usersIds"
                  control={control}
                  render={({ field }) => (
                    <SelectFieldReactSelect
                      isMulti
                      label={t("notifyUsers")}
                      loading={isLoading || isFetchingNextPage}
                      value={field.value}
                      options={users}
                      onChange={field.onChange}
                      error={errors.usersIds?.message}
                      onMenuScrollToBottom={() => {
                        if (hasNextPage) fetchNextPage();
                      }}
                    />
                  )}
                />
              </div>
            )}

            {/* Title */}
            <div className="col-12 col-md-6 col-xl-4 p-2">
              <InputField
                {...register("title")}
                label={t("dashboard.public_notifications.notificationTitle")}
                error={errors.title?.message}
              />
            </div>

            {/* Message */}
            <div className="col-12 p-2">
              <TextField
                {...register("description")}
                label={t("dashboard.public_notifications.notificationMessage")}
                error={errors.description?.message}
              />
            </div>

            {/* Submit */}
            <div className="col-12 p-2">
              <div className="d-flex justify-content-end">
                <CustomButton
                  type="submit"
                  size="large"
                  loading={isSendingPublicNotification}
                >
                  {t("dashboard.public_notifications.send")}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </FormWrapper>
    </section>
  );
}
