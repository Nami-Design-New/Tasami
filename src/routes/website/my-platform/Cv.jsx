import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useEditCV from "../../../hooks/cv/useEditCV";
import useGetCV from "../../../hooks/cv/useGetCV";
import CustomButton from "../../../ui/CustomButton";
import TextField from "../../../ui/forms/TextField";
import DocumentsSection from "../../../ui/website/platform/DocumentsSection";
import ExperienceSection from "../../../ui/website/platform/ExperienceSection";

const CVSchema = yup.object().shape({
  about: yup.string().required("هذا الحقل مطلوب"), // TODO: localize
});

export default function Cv() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { cv, isLoading } = useGetCV();
  const { editCV, isPending } = useEditCV();

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
      <div className="row">
        <div className="col-12 p-2">
          <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              placeholder={t("website.platform.cv.aboutPlaceholder")}
              label={t("website.platform.cv.aboutLabel")}
              {...register("about")}
              error={errors?.about?.message}
            />
          </form>
        </div>

        <div className="col-12 p-2">
          {/* Experience Section */}
          <ExperienceSection />
        </div>
        <div className="col-12 p-2">
          {/* Documents Section */}
          <DocumentsSection />
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
    </section>
  );
}
