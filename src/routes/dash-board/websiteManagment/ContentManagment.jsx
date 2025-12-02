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

export default function ContentManagment() {
  const { t } = useTranslation();
  const { settings, isLoading } = useGetSettings();
  const { updateSettings, isPending } = useUpdateSettings();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({});

  // Load settings into state
  useEffect(() => {
    if (!settings?.data) return;

    const initialData = {};
    ["terms", "privacy", "about_app"].forEach((section) => {
      SUPPORTED_LANGS.forEach((lang) => {
        const key = `${section}_${lang}`;
        initialData[key] = settings.data[key] || "";
      });
    });

    setFormData(initialData);
  }, [settings]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const payload = {
      "terms:ar": formData.terms_ar,
      "terms:en": formData.terms_en,
      "privacy:ar": formData.privacy_ar,
      "privacy:en": formData.privacy_en,
      "about_app:ar": formData.about_app_ar,
      "about_app:en": formData.about_app_en,
    };

    updateSettings(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
    });
  };

  if (isLoading) return <p>{t("dashboard.appSettings.loading")}...</p>;

  const labelMap = {
    terms: t("dashboard.appSettings.terms"),
    privacy: t("dashboard.appSettings.privacy"),
    about_app: t("dashboard.appSettings.aboutApp"),
  };

  return (
    <section>
      <PageHeader title={t("dashboard.appSettings.management")} />

      <div className="row p-0 m-0">
        {["terms", "privacy", "about_app"].map((section) =>
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
                    handleChange(field, editor.getData())
                  }
                />
              </div>
            );
          })
        )}

        <div className="d-flex align-items-center mt-3 justify-content-end gap-2">
          <CustomButton
            onClick={handleSave}
            disabled={isPending}
            loading={isPending}
          >
            {t("dashboard.appSettings.save")}
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
