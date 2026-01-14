import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import CustomButton from "../CustomButton";
import SelectField from "../forms/SelectField";
import TextField from "../forms/TextField";
import TabRadioGroup from "../TabRadioGroup";
import usePostAddAction from "../../hooks/dashboard/tasks/usePostAddAction";
import useGetSharedEmployees from "../../hooks/dashboard/tasks/useGetSharedEmployees";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import GlobalModal from "../GlobalModal";

const schema = yup.object().shape({
  actionType: yup.string().required("نوع الاجراء مطلوب"),
  description: yup.string().required("الوصف مطلوب"),
  employee: yup.string().when("actionType", {
    is: "send",
    then: yup.string().required("اختر الموظف للتوجيه"),
  }),
  sendNotification: yup.boolean(),
});

const AddActionModal = ({ showModal, setShowModal, taskData }) => {
  const { t } = useTranslation();
  const { addAction, isPending } = usePostAddAction();
  const { employees } = useGetSharedEmployees();
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.adminAuth);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      actionType: "redirect",
      description: "",
      employee: "",
      sendNotification: false,
    },
  });

  const actionType = watch("actionType");

  const onSubmit = (data) => {
    const payload = {
      task_id: taskData?.task?.id,
      type:
        data.actionType === "complete"
          ? "finish"
          : data.actionType === "redirect"
          ? "send"
          : "return",
      ...(data.actionType === "redirect" && {
        employee_id: Number(data.employee),
      }),
      note: data.description,
    };

    addAction(payload, {
      onSuccess: () => {
        setShowModal(false);
        reset();
        toast.success("تم تنفيذ الإجراء بنجاح");
        queryClient.invalidateQueries({ queryKey: ["show-task"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleCLose = () => {
    setShowModal(false);
    reset();
  };
  return (
    <GlobalModal centered size="lg" show={showModal} onHide={handleCLose}>
      <GlobalModal.Header closeButton>
        <h6> {t("dashboard.tasks.modelTask.notes.addBenefit")}</h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 py-2">
              <TabRadioGroup
                name="actionType"
                register={register}
                options={[
                  ...(taskData?.task?.owner_id === user?.id
                    ? [
                        {
                          label: t(
                            "dashboard.tasks.modelTask.notes.completeBenefit"
                          ),
                          value: "complete",
                        },
                      ]
                    : []),

                  {
                    label: t("dashboard.tasks.modelTask.notes.redirectBenefit"),
                    value: "redirect",
                  },
                  {
                    label: t("dashboard.tasks.modelTask.notes.returnBenefit"),
                    value: "return",
                  },
                ]}
              />

              {errors.actionType && (
                <span className="text-danger">{errors.actionType.message}</span>
              )}
            </div>
            {actionType === "redirect" && (
              <div className="col-12 py-2">
                <Controller
                  name="employee"
                  control={control}
                  render={({ field }) => (
                    <SelectField
                      {...field}
                      label={t(
                        "dashboard.tasks.modelTask.notes.chooseRequestEmployee"
                      )}
                      disableFiledValue={t(
                        "dashboard.tasks.modelTask.notes.chooseEmployee"
                      )}
                      options={employees.map((emp) => ({
                        value: emp.id,
                        name: `${emp.first_name} ${emp.family_name}`,
                      }))}
                      error={errors.employee?.message}
                    />
                  )}
                />
              </div>
            )}

            <div className="col-12 py-2">
              <TextField
                label={t("dashboard.tasks.modelTask.notes.benefitDetails")}
                {...register("description")}
                error={errors.description?.message}
              />
            </div>

            <div className="col-12 py-2 ">
              <div className="d-flex align-items-center justify-content-end gap-2">
                <CustomButton
                  loading={isPending}
                  type="submit"
                  color="primary"
                  size="large"
                >
                  {t("dashboard.tasks.modelTask.notes.excute")}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
};

export default AddActionModal;
