import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../../../CustomButton";
import SelectField from "../../../forms/SelectField";
import useConfirmPerformance from "../../../../hooks/website/MyWorks/tasks/useConfirmPerformance";
import { useQueryClient } from "@tanstack/react-query";
import AssistantWorkCard from "../work-offers/AssistantWorkCard";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

export default function ConfirmPerformanceModal({
  show,
  setShowModal,
  task,
  workUser,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.authRole);
  const { confirmPerformance, isPending } = useConfirmPerformance();
  const { pathname } = useLocation();

  const isContracts = pathname.includes("my-contracts");
  const isWorks = pathname.includes("my-works");

  // Validation schema
  const schema = yup.object().shape({
    difficulty: isWorks
      ? yup.string().required(t("performanceModal.validation.selectDifficulty"))
      : yup.string(),
    benefit: isWorks
      ? yup.string().required(t("performanceModal.validation.selectBenefit"))
      : yup.string(),
    guidance: isContracts
      ? yup.string().required(t("performanceModal.validation.selectGuidance"))
      : yup.string(),
    verification: isContracts
      ? yup
          .string()
          .required(t("performanceModal.validation.selectVerification"))
      : yup.string(),
  });

  // Form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      difficulty: "",
      benefit: "",
      guidance: "",
      verification: "",
    },
  });

  // Submit
  const onSubmit = (data) => {
    const payload = {
      task_id: task?.id,
      ...(isWorks && {
        execution: data.difficulty,
        benefit: data.benefit,
      }),
      ...(isContracts && {
        guidance: data.guidance,
        verification: data.verification,
      }),
    };

    confirmPerformance(payload, {
      onSuccess: () => {
        reset();
        setShowModal(false);
        queryClient.invalidateQueries({ queryKey: ["work-tasks"] });
        queryClient.invalidateQueries({ queryKey: ["work-details"] });
      },
      onError: (err) => console.error("Error confirming performance:", err),
    });
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShowModal(false);
        reset();
      }}
      centered
      size="lg"
      onClick={(e) => e.stopPropagation()}
    >
      <Modal.Header closeButton>
        <h6>{t("performanceModal.confirmPerformance")}</h6>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Assistant card (helper) */}
            <div className="col-12 p-2">
              <AssistantWorkCard helper={task?.helper} chat={false} />
            </div>
            {/* Execution + Benefit section */}
            {task.rate !== null ? (
              <div>
                {task?.rate?.execution !== null &&
                  task?.rate?.benefit !== null && (
                    <div className="col-12 p-2">
                      <div className="goal-info">
                        <div className="info-grid">
                          <div className="info-box flex-grow-1">
                            <div className="label">
                              {t("performanceModal.execution")}
                            </div>
                            <div className="value">
                              {task?.rate?.execution_text}
                            </div>
                          </div>
                          <div className="info-box flex-grow-1">
                            <div className="label">
                              {t("performanceModal.benefit")}
                            </div>
                            <div className="value">
                              {task?.rate?.benefit_text}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ) : (
              <>
                {/* Difficulty */}
                <div className="col-6 p-2">
                  <SelectField
                    label={t("performanceModal.execution")}
                    {...register("difficulty")}
                    options={[
                      {
                        name: t("performanceModal.difficulty.easy"),
                        value: "easy",
                      },
                      {
                        name: t("performanceModal.difficulty.medium"),
                        value: "normal",
                      },
                      {
                        name: t("performanceModal.difficulty.hard"),
                        value: "hard",
                      },
                    ]}
                    error={errors.difficulty?.message}
                    disabled={isContracts && task.rate === null}
                  />
                </div>

                {/* Benefit */}
                <div className="col-6 p-2">
                  <SelectField
                    label={t("performanceModal.benefit")}
                    {...register("benefit")}
                    options={[
                      {
                        name: t("performanceModal.benefitLevel.low"),
                        value: "low",
                      },
                      {
                        name: t("performanceModal.benefitLevel.medium"),
                        value: "normal",
                      },
                      {
                        name: t("performanceModal.benefitLevel.high"),
                        value: "high",
                      },
                    ]}
                    error={errors.benefit?.message}
                    disabled={isContracts && task.rate === null}
                  />
                </div>
              </>
            )}
            {/* Assistant card (current user) */}
            <div className="col-12 p-2">
              <AssistantWorkCard
                helper={isWorks ? user : workUser}
                chat={false}
              />
            </div>
            {/* Guidance + Verification */}
            {task.rate !== null &&
            task?.rate?.guidance !== "" &&
            task?.rate?.verification !== "" ? (
              <div className="col-12 p-2">
                <div className="goal-info">
                  <div className="info-grid">
                    <div className="info-box flex-grow-1">
                      <div className="label">
                        {t("performanceModal.guidance")}
                      </div>
                      <div className="value">{task?.rate?.guidance_text}</div>
                    </div>
                    <div className="info-box flex-grow-1">
                      <div className="label">
                        {t("performanceModal.verification")}
                      </div>
                      <div className="value">
                        {task?.rate?.verification_text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Guidance */}
                <div className="col-6 p-2">
                  <SelectField
                    label={t("performanceModal.guidance")}
                    {...register("guidance")}
                    options={[
                      {
                        name: t("performanceModal.guidanceLevel.easy"),
                        value: "initial",
                      },
                      {
                        name: t("performanceModal.guidanceLevel.medium"),
                        value: "normal",
                      },
                      {
                        name: t("performanceModal.guidanceLevel.advanced"),
                        value: "advanced",
                      },
                    ]}
                    disabled={isWorks}
                    error={errors.guidance?.message}
                  />
                </div>

                {/* Verification */}
                <div className="col-6 p-2">
                  <SelectField
                    label={t("performanceModal.verification")}
                    {...register("verification")}
                    options={[
                      {
                        name: t("performanceModal.verificationStatus.partial"),
                        value: "partially_achieved",
                      },

                      {
                        name: t("performanceModal.verificationStatus.retry"),
                        value: "retry",
                      },
                      {
                        name: t("performanceModal.verificationStatus.full"),
                        value: "fully_achieved",
                      },
                    ]}
                    disabled={isWorks}
                    error={errors.verification?.message}
                  />
                </div>
              </>
            )}
            {/* Buttons */}
            {isWorks && task.rate === null ? (
              <div className="col-12 p-2">
                <div className="buttons w-100 d-flex gap-2">
                  <CustomButton
                    size="large"
                    type="button"
                    variant="outlined"
                    onClick={() => setShowModal(false)}
                  >
                    {t("performanceModal.cancel")}
                  </CustomButton>

                  <CustomButton
                    size="large"
                    fullWidth
                    type="submit"
                    loading={isPending}
                  >
                    {t("performanceModal.send")}
                  </CustomButton>
                </div>
              </div>
            ) : (
              <></>
            )}{" "}
            {isContracts &&
            task.rate !== null &&
            task?.rate?.guidance === "" &&
            task?.rate?.verification === "" ? (
              <div className="col-12 p-2">
                <div className="buttons w-100 d-flex gap-2">
                  <CustomButton
                    size="large"
                    type="button"
                    variant="outlined"
                    onClick={() => setShowModal(false)}
                  >
                    {t("performanceModal.cancel")}
                  </CustomButton>

                  <CustomButton
                    size="large"
                    fullWidth
                    type="submit"
                    loading={isPending}
                  >
                    {t("performanceModal.send")}
                  </CustomButton>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
