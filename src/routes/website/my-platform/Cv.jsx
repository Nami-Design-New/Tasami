import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import TextField from "../../../ui/forms/TextField";
import CustomButton from "../../../ui/CustomButton";
import AddExperienceModal from "../../../ui/website/platform/AddExperienceModal";
import AddDocumentModal from "./AddDocumentModal";
import ExperienceSection from "../../../ui/website/platform/ExperienceSection";
import DocumentsSection from "../../../ui/website/platform/DocumentsSection";

const CVSchema = yup.object().shape({
  about: yup.string().required("هذا الحقل مطلوب"), // TODO: localize
});

export default function Cv() {
  const { t } = useTranslation();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(CVSchema),
    defaultValues: {
      about: "",
    },
  });

  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  return (
    <section className="cv" aria-labelledby="cv-title">
      {/* About */}
      <form className="form_ui" onSubmit={handleSubmit}>
        <TextField
          placeholder={t("website.platform.cv.aboutPlaceholder")}
          label={t("website.platform.cv.aboutLabel")}
          {...register("about")}
        />
      </form>

      {/* Experience Section */}
      <ExperienceSection setShowExperienceModal={setShowExperienceModal} />

      {/* Documents Section */}
      <DocumentsSection setShowDocumentModal={setShowDocumentModal} />

      {/* Save button */}
      <CustomButton size="large">{t("save")}</CustomButton>

      {/* Modals */}
      <AddExperienceModal
        showExperienceModal={showExperienceModal}
        setShowExperienceModal={setShowExperienceModal}
      />
      <AddDocumentModal
        showDocumentModal={showDocumentModal}
        setShowDocumentModal={setShowDocumentModal}
      />
    </section>
  );
}
