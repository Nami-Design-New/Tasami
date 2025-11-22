import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import CustomButton from "../CustomButton";
import SelectField from "../forms/SelectField";
import TextField from "../forms/TextField";
import TabRadioGroup from "../TabRadioGroup";
import usePostAddAction from "../../hooks/dashboard/tasks/usePostAddAction";
import useGetSharedEmployees from "../../hooks/dashboard/tasks/useGetSharedEmployees";
import { toast } from "sonner";

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
  const { addAction } = usePostAddAction();
  const { employees } = useGetSharedEmployees();

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
      employee_id:
        data.actionType === "redirect" ? Number(data.employee) : null,
      note: data.description,
    };

    addAction(payload, {
      onSuccess: () => {
        setShowModal(false);
        reset();
        toast.success("تم تنفيذ الإجراء بنجاح");
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
    <Modal centered size="lg" show={showModal} onHide={handleCLose}>
      <Modal.Header closeButton>اضف افادتك</Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 py-2">
              <TabRadioGroup
                name="actionType"
                register={register}
                options={[
                  { label: "اكمال", value: "complete" },
                  { label: "توجيه", value: "redirect" },
                  { label: "ارجاع", value: "return" },
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
                      label="اختر الموظف المراد توجيه الطلب له"
                      disableFiledValue="اختر الموظف"
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
                label="تفاصيل الافاده"
                {...register("description")}
                error={errors.description?.message}
              />
            </div>

            <div className="col-12 py-2 ">
              <div className="d-flex align-items-center justify-content-end gap-2">
                {/* <CustomButton
                  onClick={handleCLose}
                  type="button"
                  color="secondary"
                  size="large"
                >
                  حفظ و اغلاق
                </CustomButton> */}
                <CustomButton type="submit" color="primary" size="large">
                  تنفيذ
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddActionModal;
