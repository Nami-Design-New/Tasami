// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import CustomButton from "../../../ui/CustomButton";
// import PageHeader from "../../../ui/PageHeader";
// import "ckeditor5/ckeditor5.css";
// import { SUPPORTED_LANGS } from "../../../lib/multilang/config";
// import useGetSettings from "../../../hooks/dashboard/website-managment/settings/useGetSettings";
// import useUpdateSettings from "../../../hooks/dashboard/website-managment/settings/useUpdateSettings";
// import { useQueryClient } from "@tanstack/react-query";
// import Loading from "../../../ui/loading/Loading";

// export default function ContentManagment() {
//   const { t } = useTranslation();
//   const { settings, isLoading } = useGetSettings();
//   const { updateSettings, isPending } = useUpdateSettings();
//   const queryClient = useQueryClient();
//   const [formData, setFormData] = useState({});

//   // Load settings into state
//   useEffect(() => {
//     if (!settings?.data) return;

//     const initialData = {};
//     [
//       "terms",
//       "privacy",
//       "about_app",
//       "refundPolicy",
//       "clientsRights",
//       "commissions",
//     ].forEach((section) => {
//       SUPPORTED_LANGS.forEach((lang) => {
//         const key = `${section}_${lang}`;
//         initialData[key] = settings.data[key] || "";
//       });
//     });

//     setFormData(initialData);
//   }, [settings]);

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = () => {
//     const payload = {
//       "terms:ar": formData.terms_ar,
//       "terms:en": formData.terms_en,
//       "privacy:ar": formData.privacy_ar,
//       "privacy:en": formData.privacy_en,
//       "about_app:ar": formData.about_app_ar,
//       "about_app:en": formData.about_app_en,
//       "refundPolicy:ar": formData.refundPolicy_ar,
//       "refundPolicy:en": formData.refundPolicy_en,
//       "clientsRights:ar": formData.clientsRights_ar,
//       "clientsRights:en": formData.clientsRights_en,
//       "commissions:ar": formData.commissions_ar,
//       "commissions:en": formData.commissions_en,
//     };

//     updateSettings(payload, {
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["settings"] });
//       },
//     });
//   };

//   if (isLoading) return <Loading />;

//   const labelMap = {
//     terms: t("dashboard.appSettings.terms"),
//     privacy: t("dashboard.appSettings.privacy"),
//     about_app: t("dashboard.appSettings.aboutApp"),
//     refundPolicy: t("dashboard.appSettings.refundPolicy"),
//     clientsRights: t("dashboard.appSettings.clientsRights"),
//     commissions: t("dashboard.appSettings.commissions"),
//   };

//   return (
//     <section>
//       <PageHeader title={t("dashboard.appSettings.management")} />

//       <div className="row p-0 m-0">
//         {[
//           "terms",
//           "privacy",
//           "about_app",
//           "refundPolicy",
//           "clientsRights",
//           "commissions",
//         ].map((section) =>
//           SUPPORTED_LANGS.map((lang) => {
//             const field = `${section}_${lang}`;
//             return (
//               <div key={field} className="col-12 p-0 py-2">
//                 <p className="mb-3 editor-label">
//                   {labelMap[section]} ({lang.toUpperCase()})
//                 </p>
//                 <CKEditor
//                   editor={ClassicEditor}
//                   data={formData[field] || ""}
//                   onChange={(_, editor) =>
//                     handleChange(field, editor.getData())
//                   }
//                 />
//               </div>
//             );
//           }),
//         )}

//         <div className="d-flex align-items-center mt-3 justify-content-end gap-2">
//           <CustomButton
//             onClick={handleSave}
//             disabled={isPending}
//             loading={isPending}
//           >
//             {t("dashboard.appSettings.save")}
//           </CustomButton>
//         </div>
//       </div>
//     </section>
//   );
// }

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../ui/CustomButton";
import PageHeader from "../../../ui/PageHeader";
import "ckeditor5/ckeditor5.css";
import { SUPPORTED_LANGS } from "../../../lib/multilang/config";
import useGetSettings from "../../../hooks/dashboard/website-managment/settings/useGetSettings";
import useUpdateSettings from "../../../hooks/dashboard/website-managment/settings/useUpdateSettings";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../../../ui/loading/Loading";
import InputField from "../../../ui/forms/InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

export default function ContentManagment() {
  const { t } = useTranslation();
  const { settings, isLoading } = useGetSettings();
  const { updateSettings, isPending } = useUpdateSettings();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({});

  // Yup validation schema with i18n messages
  const schema = yup.object().shape({
    customerCare: yup
      .string()
      .email(t("dashboard.appSettings.validation.invalidEmail"))
      .required(t("dashboard.appSettings.validation.required")),
    technicalSupport: yup
      .string()
      .email(t("dashboard.appSettings.validation.invalidEmail"))
      .required(t("dashboard.appSettings.validation.required")),
    appleLink: yup
      .string()
      .url(t("dashboard.appSettings.validation.invalidUrl"))
      .required(t("dashboard.appSettings.validation.required")),
    playLink: yup
      .string()
      .url(t("dashboard.appSettings.validation.invalidUrl"))
      .required(t("dashboard.appSettings.validation.required")),
  });

  // React Hook Form for Emails & Links
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      customerCare: "",
      technicalSupport: "",
      appleLink: "",
      playLink: "",
    },
  });
  // Load settings into state  and RHF
  useEffect(() => {
    if (!settings?.data) return;

    // CKEditor Fields
    const ckData = {};
    [
      "terms",
      "privacy",
      "about_app",
      "refundPolicy",
      "clientsRights",
      "commissions",
    ].forEach((section) => {
      SUPPORTED_LANGS.forEach((lang) => {
        const key = `${section}_${lang}`;
        ckData[key] = settings.data[key] || "";
      });
    });
    setFormData(ckData);

    // Emails & Links
    const emails = settings.data.emails || {};
    const app_links = settings.data.app_links || {};
    setValue("customerCare", emails.customerCare || "");
    setValue("technicalSupport", emails.technicalSupport || "");
    setValue("appleLink", app_links.apple || "");
    setValue("playLink", app_links.play || "");
  }, [settings, setValue]);

  const onSaveLinks = (data) => {
    updateSettings(
      {
        customerCare: data.customerCare,
        technicalSupport: data.technicalSupport,
        apple: data.appleLink,
        play: data.playLink,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
      },
    );
  };

  // Save CKEditor content
  const handleSaveContent = () => {
    const payload = {
      "terms:ar": formData.terms_ar,
      "terms:en": formData.terms_en,
      "privacy:ar": formData.privacy_ar,
      "privacy:en": formData.privacy_en,
      "about_app:ar": formData.about_app_ar,
      "about_app:en": formData.about_app_en,
      "refundPolicy:ar": formData.refundPolicy_ar,
      "refundPolicy:en": formData.refundPolicy_en,
      "clientsRights:ar": formData.clientsRights_ar,
      "clientsRights:en": formData.clientsRights_en,
      "commissions:ar": formData.commissions_ar,
      "commissions:en": formData.commissions_en,
    };

    updateSettings(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
    });
  };

  if (isLoading) return <Loading />;

  const labelMap = {
    terms: t("dashboard.appSettings.terms"),
    privacy: t("dashboard.appSettings.privacy"),
    about_app: t("dashboard.appSettings.aboutApp"),
    refundPolicy: t("dashboard.appSettings.refundPolicy"),
    clientsRights: t("dashboard.appSettings.clientsRights"),
    commissions: t("dashboard.appSettings.commissions"),
  };

  return (
    <section>
      <PageHeader title={t("dashboard.appSettings.management")} />
      {/* Emails & App Links Card */}

      <div className="card p-4 mb-4 form_ui">
        <h4 className="mb-3">{t("dashboard.appSettings.emailsAndLinks")}</h4>
        <form onSubmit={handleSubmit(onSaveLinks)}>
          <div className="row">
            {/* Customer Care Email */}
            <div className="col-md-6 p-2">
              <Controller
                control={control}
                name="customerCare"
                render={({ field }) => (
                  <InputField
                    label={t("dashboard.appSettings.customerCare")}
                    type="email"
                    {...field}
                    error={errors.customerCare?.message}
                    placeholder="care@example.com"
                  />
                )}
              />
            </div>

            {/* Technical Support Email */}
            <div className="col-md-6 p-2">
              <Controller
                control={control}
                name="technicalSupport"
                render={({ field }) => (
                  <InputField
                    label={t("dashboard.appSettings.technicalSupport")}
                    type="email"
                    {...field}
                    error={errors.technicalSupport?.message}
                    placeholder="support@example.com"
                  />
                )}
              />
            </div>
          </div>

          <div className="row mt-3">
            {/* Apple Store Link */}
            <div className="col-md-6 p-2">
              <Controller
                control={control}
                name="appleLink"
                render={({ field }) => (
                  <div className="d-flex align-items-end gap-2">
                    <InputField
                      label={t("dashboard.appSettings.appleLink")}
                      type="url"
                      {...field}
                      error={errors.appleLink?.message}
                      placeholder="https://apps.apple.com/..."
                    />
                    {field.value && (
                      <a
                        href={field.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="custom-link custom-link--secondary custom-link--large"
                        style={{ height: "56px" }}
                      >
                        {t("dashboard.appSettings.preview")}
                      </a>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Play Store Link */}
            <div className="col-md-6 p-2">
              <Controller
                control={control}
                name="playLink"
                render={({ field }) => (
                  <div className="d-flex align-items-end gap-2">
                    <InputField
                      label={t("dashboard.appSettings.playLink")}
                      type="url"
                      {...field}
                      error={errors.playLink?.message}
                      placeholder="https://play.google.com/store/apps/..."
                    />
                    {field.value && (
                      <a
                        href={field.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="custom-link custom-link--secondary custom-link--large"
                        style={{ height: "56px" }}
                      >
                        {t("dashboard.appSettings.preview")}
                      </a>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Save Button for Emails & Links */}
          <div className="d-flex justify-content-end mt-3 p-2">
            <CustomButton
              size="large"
              disabled={isPending}
              loading={isPending}
              type="submit"
            >
              {t("dashboard.appSettings.saveLinks")}
            </CustomButton>
          </div>
        </form>
      </div>

      {/* CKEditor Sections */}
      <div className="row p-0 m-0">
        {[
          "terms",
          "privacy",
          "about_app",
          "refundPolicy",
          "clientsRights",
          "commissions",
        ].map((section) =>
          SUPPORTED_LANGS.map((lang) => {
            const field = `${section}_${lang}`;
            return (
              <div key={field} className="col-12 p-0 py-2">
                <p className="mb-3 editor-label">
                  {labelMap[section]} ({lang.toUpperCase()})
                </p>
                <CKEditor
                  editor={ClassicEditor}
                  data={formData[field] || ""}
                  onChange={(_, editor) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field]: editor.getData(),
                    }))
                  }
                />
              </div>
            );
          }),
        )}

        {/* Save Button for CKEditor content */}
        <div className="d-flex align-items-center mt-3 justify-content-end gap-2">
          <CustomButton
            onClick={handleSaveContent}
            disabled={isPending}
            loading={isPending}
            size="large"
          >
            {t("dashboard.appSettings.saveContent")}
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
