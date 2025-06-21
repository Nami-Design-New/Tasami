import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { WORKING_GROPUS_CALSSIFICATIONS } from "../../utils/constants";
import CustomButton from "../CustomButton";
import SelectField from "../forms/SelectField";
import TabRadioGroup from "../TabRadioGroup";
const defaultValues = {
  groupType: WORKING_GROPUS_CALSSIFICATIONS[0],
  region: "",
  location: "",
  city: "",
};
const schema = yup.object().shape({});

const EditWorkGroupModal = ({ showModal, setShowModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log(data);
    setShowModal(false);
    reset(defaultValues);
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="working group add / edit Modal"
      centered
      className="working-group-modal"
    >
      <Modal.Header closeButton>
        <h6>مجموعه جديده</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui " onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-12">
              <h6 className="mb-1"> تصنيف المجموعه </h6>

              <TabRadioGroup
                name={"groupType"}
                register={register}
                options={[
                  {
                    label: "تشغيليه",
                    value: WORKING_GROPUS_CALSSIFICATIONS[0],
                  },
                  { label: "ادارية", value: WORKING_GROPUS_CALSSIFICATIONS[1] },
                ]}
              />
            </div>

            <div className="col-12 col-md-6 ">
              <SelectField
                label="الاقليم"
                {...register("region")}
                options={[
                  { value: 1, name: "الشرق الاوسط" },
                  { value: 2, name: "اوروبا" },
                  { value: 3, name: "امريكا الشماليه" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 ">
              <SelectField
                label="القطاع"
                {...register("location")}
                options={[
                  { value: 1, name: "السعوديه" },
                  { value: 2, name: "مصر" },
                  { value: 3, name: "المغرب" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 ">
              <SelectField
                label="المدينة"
                {...register("city")}
                options={[
                  { value: 1, name: "جده" },
                  { value: 2, name: "الرياض" },
                  { value: 3, name: "المدينه" },
                ]}
              />
            </div>
            <div className="d-flex  justify-content-end">
              <CustomButton size="medium" color="primary">
                إضافة
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditWorkGroupModal;
