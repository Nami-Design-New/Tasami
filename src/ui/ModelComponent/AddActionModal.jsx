import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import SelectField from "../forms/SelectField";
import SubmitButton from "../forms/SubmitButton";
import TextField from "../forms/TextField";
import TabRadioGroup from "../TabRadioGroup";

const schema = yup.object().shape({
  actionType: yup.string().required("نوع الاجراء مطلوب"),
  description: yup.string().required("الوصف مطلوب"),
  employee: yup.string().when("actionType", {
    is: "redirect",
    then: yup.string().required("اختر الموظف للتوجيه"),
  }),
  sendNotification: yup.boolean(),
});

const AddActionModal = ({ showModal, setShowModal }) => {
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
    console.log("Form Submitted:", data);
    // handle submission logic here
    setShowModal(false);
    reset();
  };

  const handleCLose = () => {
    setShowModal(false);
    reset();
  };
  return (
    <Modal centered size="lg" show={showModal} onHide={handleCLose}>
      <Modal.Header closeButton>
        <h6> اضف افادتك </h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 py-2">
              <h6 className="action-lable"> نوع الاجراء </h6>

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
                      options={[
                        { value: "1", name: "موظف 1" },
                        { value: "2", name: "موظف 2" },
                      ]}
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
            <div className="col-12">
              <Controller
                name="sendNotification"
                control={control}
                render={({ field }) => (
                  <Form.Check
                    type="switch"
                    id="urgent-switch"
                    label="اشعار الرئيس المباشر"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            </div>
            <div className="col-12 py-2 ">
              <div className="d-flex align-items-center justify-content-end gap-2">
                <button className="button button--add" onClick={handleCLose}>
                  حفظ و اغلاق{" "}
                </button>
                <SubmitButton text="تنفيذ" className="button" />
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddActionModal;
