import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";

import useGetUsersAccountsInfinite from "../../../hooks/dashboard/subscription/useGetUsersAccountsInfinite";
import useSendPublicNotification from "../../../hooks/dashboard/websiteManagment/public-notifications/useSendPublicNotification";

import CustomButton from "../../../ui/CustomButton";
import PageHeader from "../../../ui/PageHeader";
import PublicNotificationsSidebarFilter from "../../../ui/dash-board/websiteManagment/PublicNotificationsSidebarFilter";
import FormWrapper from "../../../ui/forms/FormWrapper";
import InputField from "../../../ui/forms/InputField";
import TextField from "../../../ui/forms/TextField";

/* =======================
   Yup Validation Schema
======================= */
const getSchema = (t) =>
  yup.object({
    // type: yup.string().required(t("validation.notificationTypeRequired")),

    title_en: yup.string().required(t("validation.notificationTitleRequired")),

    title: yup.string().required(t("validation.notificationTitleRequired")),

    description_en: yup
      .string()
      .required(t("validation.notificationMessageRequired")),

    description: yup
      .string()
      .required(t("validation.notificationMessageRequired")),

    region: yup.string().nullable(),
    country: yup.string().nullable(),
    city: yup.string().nullable(),
    packageId: yup.string().nullable(),
    nationality: yup.string().nullable(),
    gender: yup.string().nullable(),
    categoryId: yup.string().nullable(),
    subcategoryId: yup.string().nullable(),
    // usersIds: yup.array().when("type", {
    //   is: "specific",
    //   then: (schema) =>
    //     schema.min(1, "Please select at least one user").required(),
    //   otherwise: (schema) => schema.notRequired(),
    // }),
  });

const normalizeValue = (value) => {
  if (!value || value === "all") return "all";
  return Number(value);
};
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
     Send Notification
  ======================= */
  const { sendPublicNotification, isSendingPublicNotification } =
    useSendPublicNotification();

  // const users = useMemo(
  //   () =>
  //     usersAccounts?.map((u) => ({
  //       value: u.id,
  //       name: `${u?.first_name} ${u?.last_name} / ${u?.account_code}` || "Unnamed",
  //     })),
  //   [usersAccounts],
  // );

  /* =======================
     React Hook Form
  ======================= */
  const methods = useForm({
    resolver: yupResolver(getSchema(t)),
    defaultValues: {
      // type: "all",
      // usersIds: [],
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    reset,
    formState: { errors },
  } = methods;

  const selectedType = watch("type");
  console.log(errors);

  /* =======================
     Clear users if type=all
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
    console.log(data);
    const payload = {
      // ...data,
      "title:ar": data.title,
      "title:en": data.title_en,
      "description:ar": data.description,
      "description:en": data.description_en,

      region: normalizeValue(data.region),
      country: normalizeValue(data.country),
      city: normalizeValue(data.city),
      categoryId: normalizeValue(data.categoryId),
      subcategoryId: normalizeValue(data.subcategoryId),
      packageId: normalizeValue(data.packageId),
      nationality: normalizeValue(data.nationality),
      // type: "all",
    };

    sendPublicNotification(payload, {
      onSuccess: (res) => {
        toast.success(res.message || "Public notification sent");
        reset();
      },
      onError: (err) => {
        toast.error(err.message || "Error sending notification");
      },
    });
  };

  return (
    <section>
      <div className="p-2 d-flex align-items-center justify-content-between">
        <PageHeader />
      </div>

      <FormProvider {...methods}>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 col-lg-3 p-2">
              <FormWrapper
                title={t("dashboard.public_notifications.sendChoices")}
              >
                <PublicNotificationsSidebarFilter />
              </FormWrapper>
            </div>

            <div className="col-12 col-lg-9  p-2">
              <FormWrapper title={t("dashboard.public_notifications.title")}>
                <div className="row">
                  {/* English Title */}
                  <div className="col-12 col-md-6 p-2">
                    <InputField
                      {...register("title_en")}
                      label={t(
                        "dashboard.public_notifications.notificationTitle",
                      )}
                      hint="(en)"
                      error={errors.title_en?.message}
                    />
                  </div>
                  {/* Arabic Title */}
                  <div className="col-12 col-md-6 p-2">
                    <InputField
                      {...register("title")}
                      name="title"
                      label={t(
                        "dashboard.public_notifications.notificationTitle",
                      )}
                      hint="(ar)"
                      error={errors.title?.message}
                    />
                  </div>

                  {/* English Description */}
                  <div className="col-12  p-2">
                    <TextField
                      {...register("description_en")}
                      label={t(
                        "dashboard.public_notifications.notificationMessage",
                      )}
                      hint="(en)"
                      error={errors.description_en?.message}
                    />
                  </div>
                  <div className="col-12 p-2">
                    <TextField
                      {...register("description")}
                      name="description"
                      label={t(
                        "dashboard.public_notifications.notificationMessage",
                      )}
                      hint="(ar)"
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
              </FormWrapper>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
