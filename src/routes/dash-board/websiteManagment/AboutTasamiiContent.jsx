import { useTranslation } from "react-i18next";
import PageHeader from "../../../ui/PageHeader";
import useGetSettings from "../../../hooks/dashboard/website-managment/settings/useGetSettings";
import useUpdateSettings from "../../../hooks/dashboard/website-managment/settings/useUpdateSettings";
import { SUPPORTED_LANGS } from "../../../lib/multilang/config";
import Loading from "../../../ui/loading/Loading";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomButton from "../../../ui/CustomButton";
import { dashboardCkEditorConfig } from "../../../lib/dashboardCkEditorConfig";

export default function AboutTasamiiContent() {
  const { t } = useTranslation();
  const { settings, isLoading } = useGetSettings();
  const { updateSettings, isPending } = useUpdateSettings();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!settings?.data) return;

    const ckData = {};
    [
      "howItWorks",
      "personalGoals",
      "helpRequests",
      "personalOffers",
      "helpersAccounts",
      "communities",
      "commissions",
    ].forEach((section) => {
      SUPPORTED_LANGS.forEach((lang) => {
        const key = `${section}_${lang}`;
        ckData[key] = settings.data[key] || "";
      });
    });

    setFormData(ckData);
  }, [settings]);

  const handleSaveContent = () => {
    const payload = {
      "howItWorks:ar": formData.howItWorks_ar,
      "howItWorks:en": formData.howItWorks_en,
      "personalGoals:ar": formData.personalGoals_ar,
      "personalGoals:en": formData.personalGoals_en,
      "helpRequests:ar": formData.helpRequests_ar,
      "helpRequests:en": formData.helpRequests_en,
      "personalOffers:ar": formData.personalOffers_ar,
      "personalOffers:en": formData.personalOffers_en,
      "helpersAccounts:ar": formData.helpersAccounts_ar,
      "helpersAccounts:en": formData.helpersAccounts_en,
      "communities:ar": formData.communities_ar,
      "communities:en": formData.communities_en,
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
    howItWorks: t("dashboard.appSettings.howItWorks"),
    personalGoals: t("dashboard.appSettings.personalGoals"),
    helpRequests: t("dashboard.appSettings.helpRequests"),
    personalOffers: t("dashboard.appSettings.personalOffers"),
    helpersAccounts: t("dashboard.appSettings.helpersAccounts"),
    communities: t("dashboard.appSettings.communities"),
    commissions: t("dashboard.appSettings.commissions"),
  };

  return (
    <section>
      <PageHeader title={t("dashboard.appSettings.management")} />

      <div className="row p-0 m-0">
        {[
          "howItWorks",
          "personalGoals",
          "helpRequests",
          "personalOffers",
          "helpersAccounts",
          "communities",
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
                  config={dashboardCkEditorConfig}
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
