import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as yup from "yup";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useEditCV from "../../../hooks/cv/useEditCV";
import useGetCV from "../../../hooks/cv/useGetCV";
import { setUser } from "../../../redux/slices/authRole";
import CustomButton from "../../../ui/CustomButton";
import TextField from "../../../ui/forms/TextField";
import CvActivationSuccessModal from "../../../ui/website/platform/CvActivationSuccessModal";
import DocumentsSection from "../../../ui/website/platform/DocumentsSection";
import ExperienceSection from "../../../ui/website/platform/ExperienceSection";

export default function Cv() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.authRole);
  const { cv } = useGetCV();
  const { editCV, isPending } = useEditCV();
  const [showActivationSuccess, setShowActivationSuccess] = useState(false);
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
    const existingAbout = cv?.about ?? user?.about;
    const isFirstActivation = !existingAbout?.trim();

    editCV(payload, {
      onSuccess: (res) => {
        if (isFirstActivation) {
          setShowActivationSuccess(true);
        } else {
          toast.success(res?.message || t("website.platform.cv.updateSuccess"));
        }

        const updatedAbout = res?.data?.about ?? data.about;
        dispatch(
          setUser({
            ...user,
            ...res?.data,
            about: updatedAbout,
          }),
        );
        queryClient.invalidateQueries({ queryKey: ["cv"] });
        queryClient.setQueryData(["authedUser"], (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ...res?.data,
            about: updatedAbout,
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

      <CvActivationSuccessModal
        showModal={showActivationSuccess}
        onClose={() => setShowActivationSuccess(false)}
        onCreateGroup={() =>
          navigate("/my-platform/my-groups", {
            state: { openCreateGroup: true },
          })
        }
      />
    </section>
  );
}
