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

// Validation Schema
const schema = yup.object().shape({
  difficulty: yup.string().required("الرجاء اختيار مستوى التنفيذ"),
  benefit: yup.string().required("الرجاء اختيار مستوى الفائدة"),
  guidance: yup.string().required("الرجاء اختيار مستوى التنفيذ"),
  verification: yup.string().required("الرجاء اختيار مستوى الفائدة"),
});

export default function ConfirmPerformanceModal({ show, setShowModal, task }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.authRole);
  const { confirmPerformance, isPending } = useConfirmPerformance();
  const { pathname } = useLocation();
  const isContracts = pathname.includes("my-contracts");
  const isWorks = pathname.includes("my-works");
  console.log(isContracts, isWorks);

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
    },
  });

  //  Submit handler
  const onSubmit = (data) => {
    const payload = {
      task_id: task?.id,
      execution: data.difficulty,
      benefit: data.benefit,
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
            <div className="col-6 p-2">
              <SelectField
                name="difficulty"
                label={"التنفيذ"}
                {...register("difficulty")}
                options={[
                  { name: "سهلة", value: "easy" },
                  { name: "متوسطة", value: "normal" },
                  { name: "صعبة", value: "hard" },
                ]}
                error={errors.difficulty?.message}
                disabled={isContracts}
              />
            </div>
            <div className="col-6 p-2">
              <SelectField
                name="difficulty"
                label={"الفائدة"}
                {...register("difficulty")}
                options={[
                  { name: "عالية", value: "high" },
                  { name: "متوسطة", value: "normal" },
                  { name: "منخفضة", value: "low" },
                ]}
                error={errors.difficulty?.message}
                disabled={isContracts}
              />
            </div>
            <div className="col-12 p-2">
              <AssistantWorkCard helper={user} chat={false} />
            </div>
            <div className="col-6 p-2">
              <SelectField
                name="difficulty"
                label={"الارشاد"}
                {...register("guidance")}
                options={[
                  { name: "سهلة", value: "initial" },
                  { name: "متوسطة", value: "normal" },
                  { name: "صعبة", value: "advanced" },
                ]}
                disabled={isWorks}
                error={errors.difficulty?.message}
              />
            </div>
            {/* Benefit Field */}
            <div className="col-6 p-2">
              <SelectField
                name="benefit"
                label={"التحقق"}
                {...register("verification")}
                options={[
                  { name: "تم تحقيقه بالكامل", value: "fully_achieved" },
                  { name: "تم تحقيقه جزئيًا", value: "partially_achieved" },
                  { name: "بحاجة إلى إعادة المحاولة", value: "retry" },
                ]}
                error={errors.benefit?.message}
                disabled={isWorks}
              />
            </div>
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
