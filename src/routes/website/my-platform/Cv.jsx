import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import TextField from "../../../ui/forms/TextField";
import CustomButton from "../../../ui/CustomButton";
import AddExperienceModal from "../../../ui/website/platform/AddExperienceModal";
import AddDocumentModal from "./AddDocumentModal";
import ExperienceSection from "../../../ui/website/platform/ExperienceSection";
import DocumentsSection from "../../../ui/website/platform/DocumentsSection";
import useGetCV from "../../../hooks/cv/useGetCV";
import useEditCV from "../../../hooks/cv/useEditCV";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const CVSchema = yup.object().shape({
  about: yup.string().required("هذا الحقل مطلوب"), // TODO: localize
});

export default function Cv() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { cv, isLoading } = useGetCV();
  const { editCV, isPending } = useEditCV();

  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CVSchema),
    defaultValues: { about: "" },
  });

  useEffect(() => {
    if (cv) {
      reset({ about: cv.about || "" });
    }
  }, [cv, reset]);

  const onSubmit = async (data) => {
    const payload = { about: data.about };
    editCV(payload, {
      onSuccess: (res) => {
        toast.success(res.message || t("website.platform.cv.updateSuccess"));
        queryClient.invalidateQueries({ queryKey: ["cv"] });
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
    });
  };

  return (
    <section className="cv" aria-labelledby="cv-title">
      {/* About */}
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 p-2">
            <TextField
              placeholder={t("website.platform.cv.aboutPlaceholder")}
              label={t("website.platform.cv.aboutLabel")}
              {...register("about")}
              error={errors?.about?.message}
            />
          </div>

          <div className="col-12 p-2">
            {/* Experience Section */}
            <ExperienceSection />
          </div>
          <div className="col-12 p-2">
            {/* Documents Section */}
            <DocumentsSection setShowDocumentModal={setShowDocumentModal} />
          </div>

          <div className="col-12 p-2 d-flex justify-content-end">
            {/* Save button */}
            <CustomButton
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
              loading={isPending}
              size="large"
            >
              {t("website.platform.cv.save")}
            </CustomButton>
          </div>
        </div>
      </form>

      {/* Modals */}

      <AddDocumentModal
        showDocumentModal={showDocumentModal}
        setShowDocumentModal={setShowDocumentModal}
      />
    </section>
  );
}
