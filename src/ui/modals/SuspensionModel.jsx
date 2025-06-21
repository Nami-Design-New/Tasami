import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import FileUploader from "../forms/FileUPloader";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import TextField from "../forms/TextField";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router";

const schema = yup.object().shape({
  duration: yup.boolean(),
  startDate: yup.date().when("duration", {
    is: true,
    then: (schema) => schema.required("الرجاء تحديد تاريخ البدء"),
    otherwise: (schema) => schema.notRequired(),
  }),
  endDate: yup.date().when("duration", {
    is: true,
    then: (schema) =>
      schema
        .required("الرجاء تحديد تاريخ الانتهاء")
        .typeError("الرجاء تحديد تاريخ صحيح")
        .test(
          "is-after-start",
          "تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء",
          function (value) {
            const { startDate } = this.parent;
            return (
              !startDate || !value || new Date(value) > new Date(startDate)
            );
          }
        ),
    otherwise: (schema) => schema.notRequired(),
    files: yup
      .array()
      .min(1, "يرجى إرفاق ملف واحد على الأقل")
      .max(5, "يمكنك تحميل حتى 5 ملفات فقط"),
    notes: yup.string().max(500, "يجب ألا تتجاوز الملاحظات 500 حرف"),
  }),
});

const SuspensionModel = ({ showModal, setShowModal }) => {
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: "",
      endDate: "",
      duration: true,
      notes: "",
      files: [],
    },
  });
  console.log(errors);

  const duration = watch("duration");
  useEffect(() => {
    if (duration === true) {
      setValue("endDate", null);
      setValue("startDate", null);
    }
  }, [duration, setValue]);
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="suspend-modal"
    >
      <Modal.Header closeButton>
        <h6> ايقاف الحساب </h6>
      </Modal.Header>
      <Modal.Body>
        <h2> معلومات منشىء الطلب </h2>
        <div className="request__creator-info-list">
          <div className="request__creator-info-item">
            <h3> رقم حساب منشئ الطلب : </h3>
            <p>
              <Link
                to={`/dashboard/employee-details/E-11111-22222`}
                className="link-styles"
              >
                E-11111-22222
              </Link>
            </p>
          </div>
          <div className="request__creator-info-item">
            <h3> رقم مجموعه الاعمال :</h3>
            <p>
              {" "}
              <Link
                to={`/dashboard/working-group/GIN-11111`}
                className="link-styles"
              >
                GIN-11111{" "}
              </Link>
            </p>
          </div>
          <div className="request__creator-info-item">
            <h3> الرقم المرجعي :</h3>
            <p>
              {" "}
              <Link to={`/dashboard/model/EU-11111`} className="link-styles">
                EU-11111
              </Link>
            </p>
          </div>
        </div>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-2">
            <Form.Check
              type="switch"
              label="مدة محددة"
              size="lg"
              id="duration-check"
              style={{ direction: "rtl" }}
              reverse={true}
              {...register("duration")}
            />
            {duration && (
              <>
                <div className="col-md-6">
                  <InputField
                    type="date"
                    label=" من "
                    {...register("startDate")}
                    error={errors.startDate?.message}
                  />
                </div>
                <div className="col-md-6">
                  <InputField
                    type="date"
                    label=" الي "
                    {...register("endDate")}
                    error={errors.endDate?.message}
                    // disabled={isIndefinite}
                  />
                </div>{" "}
              </>
            )}
            <TextField
              label="ملاحظات"
              {...register("notes")}
              errors={errors.notes?.message}
            />
          </div>

          <div className="col-12 mt-2 ">
            <Controller
              name="files"
              control={control}
              render={({ field }) => (
                <>
                  <FileUploader
                    files={field.value}
                    onFilesChange={(updatedFiles) => {
                      field.onChange(updatedFiles);
                      setFiles(updatedFiles);
                    }}
                    label="اضف المرفقات"
                  />
                  {errors.files && (
                    <p className="text-danger  mt-1">{errors.files.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <div className="col-12 mt-3 d-flex align-items-center gap-2">
            <button
              className="suspend-modal__button--cancel"
              onClick={() => setShowModal(false)}
            >
              الغاء
            </button>
            <SubmitButton
              text={"ارسال"}
              className="suspend-modal__button--confirm"
            />
          </div>
          <DevTool control={control} />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SuspensionModel;
