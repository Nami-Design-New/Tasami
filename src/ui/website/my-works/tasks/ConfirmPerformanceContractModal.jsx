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

// Validation Schema
const schema = yup.object().shape({
  guidance: yup.string().required("الرجاء اختيار مستوى التنفيذ"),
  verification: yup.string().required("الرجاء اختيار مستوى الفائدة"),
});

export default function ConfirmPerformanceContractModal({
  show,
  setShowModal,
  task,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { confirmPerformance, isPending } = useConfirmPerformance();

  // useForm setup with yup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      guidance: "",
      verification: "",
    },
  });

  //  Submit handler
  const onSubmit = (data) => {
    const payload = {
      task_id: task?.id,
      guidance: data.guidance,
      verification: data.verification,
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
      onHide={() => setShowModal(false)}
      centered
      onClick={(e) => e.stopPropagation()}
    >
      <Modal.Header closeButton>
        <h5>{t("confirmPerformance")}</h5>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-12 p-2">
            <AssistantWorkCard helper={task?.user} chat={false} />
          </div>
        </div>
        {/* {task?.rate?.guidance !== null && task?.rate?.verification !== null ? (
          <div className="col-12 p-2">
            <div className="goal-info ">
              <div className="info-grid ">
                <div className="info-box flex-grow-1">
                  <div className="label">الارشاد</div>
                  <div className="value">{task?.rate?.guidance_text}</div>
                </div>
                <div className="info-box flex-grow-1">
                  <div className="label">التحقق</div>
                  <div className="value">{task?.rate?.verification_text}</div>
                </div>
              </div>
            </div>
          </div> */}
        ) : (
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          {/* Difficulty Field */}
          <div className="col-12 p-2">
            <SelectField
              name="difficulty"
              label={"الارشاد"}
              {...register("guidance")}
              options={[
                { name: "سهلة", value: "initial" },
                { name: "متوسطة", value: "normal" },
                { name: "صعبة", value: "advanced" },
              ]}
              error={errors.difficulty?.message}
            />
          </div>

          {/* Benefit Field */}
          <div className="col-12 p-2">
            <SelectField
              name="benefit"
              label={"التحقق"}
              {...register("verification")}
              options={[
                { name: "عالية", value: "fully_achieved" },
                { name: "متوسطة", value: "partially_achieved" },
                { name: "منخفضة", value: "retry" },
              ]}
              error={errors.benefit?.message}
            />
          </div>

          {/* Buttons */}
          <div className="col-12 p-2">
            <div className="buttons d-flex gap-2">
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
        </form>
        )}
      </Modal.Body>
    </Modal>
  );
}
