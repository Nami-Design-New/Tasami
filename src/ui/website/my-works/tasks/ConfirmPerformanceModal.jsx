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

export default function ConfirmPerformanceModal({ show, setShowModal, task }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.authRole);
  const { confirmPerformance, isPending } = useConfirmPerformance();
  const { pathname } = useLocation();
  const isContracts = pathname.includes("my-contracts");
  const isWorks = pathname.includes("my-works");

  const schema = yup.object().shape({
    difficulty: isWorks
      ? yup.string().required("الرجاء اختيار مستوى التنفيذ")
      : yup.string(),
    benefit: isWorks
      ? yup.string().required("الرجاء اختيار مستوى الفائدة")
      : yup.string(),
    guidance: isContracts
      ? yup.string().required("الرجاء اختيار مستوى الإرشاد")
      : yup.string(),
    verification: isContracts
      ? yup.string().required("الرجاء اختيار مستوى التحقق")
      : yup.string(),
  });

  // useForm setup with yup
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

  //  Submit handler
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
      },
      onError: (err) => {
        console.error("Error confirming performance:", err);
      },
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
        <h5>{t("confirmPerformance")}</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Difficulty Field */}
            <div className="col-12 p-2">
              <AssistantWorkCard helper={task?.helper} chat={false} />
            </div>
            {task.rate !== null ? (
              <div>
                {task?.rate?.execution !== null &&
                  task?.rate?.benefit !== null && (
                    <div className="col-12 p-2">
                      <div className="goal-info ">
                        <div className="info-grid ">
                          <div className="info-box flex-grow-1">
                            <div className="label">التنفيذ</div>
                            <div className="value">
                              {task?.rate?.execution_text}
                            </div>
                          </div>
                          <div className="info-box flex-grow-1">
                            <div className="label">الفائدة</div>
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
                <div className="col-6 p-2">
                  <SelectField
                    label={"التنفيذ"}
                    {...register("difficulty")}
                    options={[
                      { name: "سهلة", value: "easy" },
                      { name: "متوسطة", value: "normal" },
                      { name: "صعبة", value: "hard" },
                    ]}
                    error={errors.difficulty?.message}
                    disabled={isContracts && task.rate === null}
                  />
                </div>
                <div className="col-6 p-2">
                  <SelectField
                    label={"الفائدة"}
                    {...register("benefit")}
                    options={[
                      { name: "عالية", value: "high" },
                      { name: "متوسطة", value: "normal" },
                      { name: "منخفضة", value: "low" },
                    ]}
                    error={errors.benefit?.message}
                    disabled={isContracts && task.rate === null}
                  />
                </div>
              </>
            )}
            <div className="col-12 p-2">
              <AssistantWorkCard helper={user} chat={false} />
            </div>
            {task.rate !== null &&
            task?.rate?.guidance !== "" &&
            task?.rate?.guidance !== "" ? (
              <div>
                {task?.rate?.guidance !== "" &&
                  task?.rate?.verification !== "" && (
                    <div className="col-12 p-2">
                      <div className="goal-info ">
                        <div className="info-grid ">
                          <div className="info-box flex-grow-1">
                            <div className="label">الارشاد</div>
                            <div className="value">
                              {task?.rate?.guidance_text}
                            </div>
                          </div>
                          <div className="info-box flex-grow-1">
                            <div className="label">التحقق</div>
                            <div className="value">
                              {task?.rate?.verification_text}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ) : (
              <>
                <div className="col-6 p-2">
                  <SelectField
                    label={"الارشاد"}
                    {...register("guidance")}
                    options={[
                      { name: "سهلة", value: "initial" },
                      { name: "متوسطة", value: "normal" },
                      { name: "صعبة", value: "advanced" },
                    ]}
                    disabled={isWorks}
                    error={errors.guidance?.message}
                  />
                </div>
                <div className="col-6 p-2">
                  <SelectField
                    label={"التحقق"}
                    {...register("verification")}
                    options={[
                      { name: "تم تحقيقه بالكامل", value: "fully_achieved" },
                      { name: "تم تحقيقه جزئيًا", value: "partially_achieved" },
                      { name: "بحاجة إلى إعادة المحاولة", value: "retry" },
                    ]}
                    error={errors.verification?.message}
                    disabled={isWorks}
                  />
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="col-12 p-2">
              <div className="buttons w-100 d-flex gap-2">
                <CustomButton
                  size="large"
                  type="button"
                  variant="outlined"
                  onClick={() => setShowModal(false)}
                >
                  {t("cancel")}
                </CustomButton>
                <CustomButton
                  size="large"
                  fullWidth
                  type="submit"
                  loading={isPending}
                >
                  {t("send")}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
