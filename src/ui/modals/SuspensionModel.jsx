import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import FileUploader from "../forms/FileUPloader";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import TextField from "../forms/TextField";
import { DevTool } from "@hookform/devtools";

const schema = yup.object().shape({
  accountNumber: yup.string().required("الرجاء اختيار رقم الحساب"),
  groupNumber: yup.string().required("الرجاء اختيار رقم المجموعة"),
  referenceNumber: yup.string().required("الرجاء اختيار الرقم المرجعي"),
  isIndefinite: yup
    .boolean()
    .transform((val, originalValue) =>
      originalValue === "true" ? true : originalValue === "false" ? false : val
    )
    .required("يرجى تحديد ما إذا كانت الفترة غير محددة"),
  startDate: yup.date().required("الرجاء تحديد تاريخ البدء"),
  endDate: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .when("isIndefinite", {
      is: true,
      then: (schema) => schema.nullable().notRequired(),
      otherwise: (schema) =>
        schema
          .required("الرجاء تحديد تاريخ الانتهاء")
          .typeError("الرجاء تحديد تاريخ صحيح"),
    }),
  files: yup
    .array()
    .min(1, "يرجى إرفاق ملف واحد على الأقل")
    .max(5, "يمكنك تحميل حتى 5 ملفات فقط"),
  notes: yup.string().max(500, "يجب ألا تتجاوز الملاحظات 500 حرف"),
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
      accountNumber: "",
      groupNumber: "",
      referenceNumber: "",
      startDate: "",
      endDate: "",
      isIndefinite: true,
      notes: "",
      files: [],
    },
  });

  const isIndefinite = watch("isIndefinite");
  useEffect(() => {
    if (isIndefinite === true) {
      setValue("endDate", null);
    }
  }, [isIndefinite, setValue]);
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
        <h6>طلب ايقاف الحساب </h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <InputField
                label="رقم حساب مشترك الطلب"
                {...register("accountNumber")}
                error={errors.accountNumber?.message}
              />
            </div>
            <div className="col-12 col-md-6">
              <InputField
                label="رقم مجموعة أعمال"
                {...register("groupNumber")}
                error={errors.groupNumber?.message}
              />
            </div>
            <div className="col-12">
              <InputField
                label="الرقم المرجعي"
                {...register("referenceNumber")}
                error={errors.referenceNumber?.message}
              />
            </div>
            <div className="d-flex align-items-center gap-5">
              {/* <div className="suspend-modal__group">
                <input
                  type="radio"
                  id="indefinite"
                  {...register("isIndefinite")}
                  checked={isIndefinite === true}
                  value={isIndefinite}
                  onChange={() => setValue("isIndefinite", true)}
                />
                <label htmlFor="indefinite">غير محدد</label>
              </div>

              <div className="suspend-modal__group">
                <input
                  type="radio"
                  id="definite"
                  {...register("isIndefinite")}
                  value={isIndefinite}
                  checked={isIndefinite === false}
                  onChange={() => setValue("isIndefinite", false)}
                />
                <label htmlFor="definite">محدد بوقت</label>
              </div>
            </div> */}
              <div className="suspend-modal__group">
                <input
                  type="radio"
                  id="indefinite"
                  value="true"
                  {...register("isIndefinite")}
                />
                <label htmlFor="indefinite">غير محدد</label>
              </div>

              <div className="suspend-modal__group">
                <input
                  type="radio"
                  id="definite"
                  value="false"
                  {...register("isIndefinite")}
                />
                <label htmlFor="definite">محدد بوقت</label>
              </div>

              {errors.isIndefinite && (
                <p className="text-danger mt-1">
                  {errors.isIndefinite.message}
                </p>
              )}
            </div>
            <div className="col-md-6">
              <InputField type="date" label=" من " {...register("startDate")} />
            </div>
            <div className="col-md-6">
              <InputField
                type="date"
                label=" الي "
                {...register("endDate")}
                disabled={isIndefinite}
              />
            </div>

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
              className="suspend-modal__button--confirm red "
            />
          </div>
          <DevTool control={control} />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SuspensionModel;
