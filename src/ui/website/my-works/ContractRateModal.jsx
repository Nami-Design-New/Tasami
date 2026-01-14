import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../../CustomButton";
import TextField from "../../forms/TextField";
import ContractStarRating from "../../ContractStarRating";
import useRateContract from "../../../hooks/website/MyWorks/useRateContract";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import GlobalModal from "../../GlobalModal";

export default function ContractRateModal({
  showModal,
  setShowModal,
  contract,
  contractDetails,
}) {
  const { t } = useTranslation();

  const isRated = !!contractDetails?.rate;
  const rateData = contractDetails?.rate;

  // Validation Schema
  const schema = yup.object().shape({
    experience_and_knowledge: yup
      .number()
      .min(1, t("rate_validation_experience"))
      .required(t("rate_validation_experience")),
    commitment_to_time: yup
      .number()
      .min(1, t("rate_validation_commitment"))
      .required(t("rate_validation_commitment")),
    quality_of_performance: yup
      .number()
      .min(1, t("rate_validation_quality"))
      .required(t("rate_validation_quality")),
    respect_and_treatment: yup
      .number()
      .min(1, t("rate_validation_respect"))
      .required(t("rate_validation_respect")),
    notes: yup.string().nullable(),
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      experience_and_knowledge: 0,
      commitment_to_time: 0,
      quality_of_performance: 0,
      respect_and_treatment: 0,
      notes: "",
    },
  });

  const queryClient = useQueryClient();
  const { rateContract, isPending } = useRateContract();

  //  Prefill data if contractDetails.rate exists

  useEffect(() => {
    if (isRated) {
      reset({
        experience_and_knowledge: rateData.experience_and_knowledge || 0,
        commitment_to_time: rateData.commitment_to_time || 0,
        quality_of_performance: rateData.quality_of_performance || 0,
        respect_and_treatment: rateData.respect_and_treatment || 0,
        notes: rateData.notes || "",
      });
    } else {
      reset();
    }
  }, [isRated, rateData, reset]);

  const onSubmit = (data) => {
    if (isRated) return; // just in case
    const payload = { ...data, contract_id: contract?.id };

    rateContract(payload, {
      onSuccess: (res) => {
        toast.success(res.message || t("rate_success"));
        reset();
        setShowModal(false);
        queryClient.refetchQueries({ queryKey: ["contract-details"] });
      },
      onError: (err) => {
        toast.error(err.message || t("rate_error"));
      },
    });
  };

  return (
    <GlobalModal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="md"
    >
      <GlobalModal.Header closeButton>
        <h6>{t("rate_title")}</h6>{" "}
      </GlobalModal.Header>

      <GlobalModal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
          <div className="row">
            {/* Experience and Knowledge */}
            <div className="col-12 p-2">
              <div className="d-flex gap-2 flex-column">
                <div className="d-flex gap-2 align-items-start justify-content-between">
                  <p className="fw-bold fs-5 ">{t("rate_experience")}</p>
                  <Controller
                    name="experience_and_knowledge"
                    control={control}
                    render={({ field }) => (
                      <ContractStarRating
                        value={field.value}
                        onChange={isRated ? undefined : field.onChange}
                        readOnly={isRated}
                      />
                    )}
                  />{" "}
                </div>

                <span className="text-grey-color">
                  {t("rate_experience_desc")}
                </span>
              </div>
              {!isRated && errors.experience_and_knowledge && (
                <small className="text-danger">
                  {errors.experience_and_knowledge.message}
                </small>
              )}
            </div>

            {/* Commitment to Time */}
            <div className="col-12 p-2">
              <div className="d-flex gap-2 flex-column">
                <div className="d-flex gap-2 align-items-start justify-content-between">
                  <p className="fw-bold fs-5 ">{t("rate_commitment")}</p>
                  <Controller
                    name="commitment_to_time"
                    control={control}
                    render={({ field }) => (
                      <ContractStarRating
                        value={field.value}
                        onChange={isRated ? undefined : field.onChange}
                        readOnly={isRated}
                      />
                    )}
                  />
                </div>
                <span className="text-grey-color">
                  {t("rate_commitment_desc")}
                </span>
              </div>
              {!isRated && errors.commitment_to_time && (
                <small className="text-danger">
                  {errors.commitment_to_time.message}
                </small>
              )}
            </div>

            {/* Quality of Performance */}
            <div className="col-12 p-2">
              <div className="d-flex gap-2 flex-column">
                <div className="d-flex gap-2 align-items-start justify-content-between">
                  <p className="fw-bold fs-5">{t("rate_quality")}</p>
                  <Controller
                    name="quality_of_performance"
                    control={control}
                    render={({ field }) => (
                      <ContractStarRating
                        value={field.value}
                        onChange={isRated ? undefined : field.onChange}
                        readOnly={isRated}
                      />
                    )}
                  />
                </div>{" "}
                <span className="text-grey-color">
                  {t("rate_quality_desc")}
                </span>
              </div>
              {!isRated && errors.quality_of_performance && (
                <small className="text-danger">
                  {errors.quality_of_performance.message}
                </small>
              )}
            </div>

            {/* Respect and Treatment */}
            <div className="col-12 p-2">
              <div className="d-flex gap-2 flex-column">
                <div className="d-flex gap-2 align-items-start justify-content-between">
                  <p className="fw-bold fs-5">{t("rate_respect")}</p>{" "}
                  <Controller
                    name="respect_and_treatment"
                    control={control}
                    render={({ field }) => (
                      <ContractStarRating
                        value={field.value}
                        onChange={isRated ? undefined : field.onChange}
                        readOnly={isRated}
                      />
                    )}
                  />{" "}
                </div>

                <span className="text-grey-color">
                  {t("rate_respect_desc")}
                </span>
              </div>
              {!isRated && errors.respect_and_treatment && (
                <small className="text-danger">
                  {errors.respect_and_treatment.message}
                </small>
              )}
            </div>

            {/* Notes */}
            <div className="col-12 p-2">
              <TextField
                label={t("rate_notes")}
                placeholder={t("rate_notes_placeholder")}
                {...register("notes")}
                error={!isRated ? errors.notes?.message : ""}
                disabled={isRated}
              />
            </div>

            {/* Buttons */}
            {!isRated && (
              <div className="col-12 p-2">
                <div className="d-flex gap-2">
                  <CustomButton
                    type="button"
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      setShowModal(false);
                      reset();
                    }}
                  >
                    {t("rate_cancel")}
                  </CustomButton>
                  <CustomButton
                    type="submit"
                    loading={isPending}
                    size="large"
                    fullWidth
                  >
                    {t("rate_submit")}
                  </CustomButton>
                </div>
              </div>
            )}
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
