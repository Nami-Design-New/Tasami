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

export default function Cv() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { cv, isLoading } = useGetCV();
  const { editCV, isPending } = useEditCV();
  const CVSchema = yup.object().shape({
    about: yup
      .string()
      .required(t("validation.required"))
      .min(15, t("validation.minCharacters", { count: 15 })),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(CVSchema),
    defaultValues: { about: "" },
  });
  const aboutValue = watch("about");
  useEffect(() => {
    if (cv) {
      reset({ about: cv.about || "" });
    }
  }, [cv, reset]);

  const onSubmit = async (data) => {
    const payload = { about: data.about };
    editCV(payload, {
      onSuccess: (res) => {
        console.log(res);

        toast.success(res?.message || t("website.platform.cv.updateSuccess"));
        queryClient.invalidateQueries({ queryKey: ["cv"] });
        queryClient.setQueryData(["authedUser"], (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            about: res?.data?.about,
          };
        });
      },
      onError: (error) => {
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
            {aboutValue !== (cv?.about || "") && (
              <div className="col-12 p-2 px-0 d-flex justify-content-end">
                {/* Save button */}
                <CustomButton
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isPending}
                  loading={isPending}
                  size="large"
                >
                  {t("save")}
                </CustomButton>
              </div>
            )}
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
      </div>
    </section>
  );
}
