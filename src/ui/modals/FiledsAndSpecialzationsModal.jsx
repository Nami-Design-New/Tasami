import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomButton from "../CustomButton";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import TabRadioGroup from "../TabRadioGroup";
import { useEffect } from "react";

const schema = yup.object().shape({
  isNewField: yup
    .string()
    .required("نوع الإجراء مطلوب")
    .oneOf(["new", "exist"], "قيمة غير صالحة"),
  field: yup.string().when("isNewField", {
    is: "new",
    then: () =>
      yup
        .string()
        .required("اسم المجال الجديد مطلوب")
        .min(2, "اسم المجال قصير جدًا"),
    otherwise: () => yup.string().nullable(),
  }),

  existingField: yup.string().when("isNewField", {
    is: "exist",
    then: () =>
      yup
        .string()
        .required("اختيار المجال مطلوب")
        .test("not-empty", "يرجى اختيار المجال", (val) => val && val !== ""),
    otherwise: () => yup.string().nullable(),
  }),
  specialization: yup
    .string()
    .required("اسم التخصص مطلوب")
    .min(2, "اسم التخصص قصير جدًا"),
});

const FiledsAndSpecialzationsModal = ({ showModal, setShowModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isNewField: "new",
      field: "",
      existingField: "",
      specialization: "",
    },
  });

  const isNewField = watch("isNewField");

  useEffect(() => {
    if (isNewField === "new") {
      setValue("existingField", "");
    } else if (isNewField === "exist") {
      setValue("field", "");
    }
  }, [isNewField, setValue]);

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    setShowModal(false);
    reset();
  };
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => {
        setShowModal(false);
        reset();
      }}
      aria-labelledby="working group add / edit Modal"
      centered
    >
      <Modal.Header closeButton>
        <h6> مجال جديد </h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <TabRadioGroup
              name="isNewField"
              register={register}
              options={[
                { label: "مجال جديد", value: "new" },
                { label: "مجال موجود", value: "exist" },
              ]}
            />
            <div className="col-12 col-md-6">
              {isNewField === "new" ? (
                <InputField
                  label=" المجال "
                  placeholder=" مثال : تكنولوجيا المعلومات  "
                  {...register("field")}
                  error={errors.field?.message}
                />
              ) : (
                <SelectField
                  label="اختر المجال"
                  options={[
                    { value: "1", name: "مجال 1" },
                    { value: "2", name: "مجال 2" },
                  ]}
                  {...register("existingField")}
                  error={errors.existingField?.message}
                />
              )}
            </div>
            <div className="col-12 col-md-6">
              <InputField
                label="التخصص"
                placeholder="مثال: تحليل البيانات"
                {...register("specialization")}
                error={errors.specialization?.message}
              />
            </div>
            <div className="d-flex justify-content-end ">
              <CustomButton>إضافة</CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FiledsAndSpecialzationsModal;
