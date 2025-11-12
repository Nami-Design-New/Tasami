// src/ui/modals/EditWorkGroupModal.jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { WORKING_GROPUS_CALSSIFICATIONS } from "../../utils/constants";
import CustomButton from "../CustomButton";
import TabRadioGroup from "../TabRadioGroup";
import useGetRegions from "../../hooks/dashboard/regions/useGetRegions";
import SelectFieldReactSelect from "../forms/SelectFieldReactSelect";

const defaultValues = {
  groupType: WORKING_GROPUS_CALSSIFICATIONS[0],
  region: "",
  location: "",
  city: "",
};

const schema = yup.object().shape({});

const EditWorkGroupModal = ({ showModal, setShowModal }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // fetch regions lazily only when modal is open
  const { regions, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetRegions(showModal);

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
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
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            {/* Group Type */}
            <div className="col-12">
              <h6 className="mb-1">تصنيف المجموعه</h6>
              <TabRadioGroup
                name="groupType"
                register={register}
                options={[
                  {
                    label: "تشغيليه",
                    value: WORKING_GROPUS_CALSSIFICATIONS[0],
                  },
                  {
                    label: "ادارية",
                    value: WORKING_GROPUS_CALSSIFICATIONS[1],
                  },
                ]}
              />
            </div>

            {/* Region */}
            <div className="col-12 col-md-6">
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <SelectFieldReactSelect
                    label="الاقليم"
                    options={regions.map((r) => ({
                      value: r.id,
                      name: r.title,
                    }))}
                    loading={isLoading || isFetchingNextPage}
                    value={field.value}
                    onChange={field.onChange}
                    onMenuScrollToBottom={() => {
                      if (hasNextPage) fetchNextPage();
                    }}
                    error={errors.region?.message}
                  />
                )}
              />
            </div>

            {/* Location */}
            <div className="col-12 col-md-6">
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <SelectFieldReactSelect
                    label="القطاع"
                    options={[
                      { value: 1, name: "السعوديه" },
                      { value: 2, name: "مصر" },
                      { value: 3, name: "المغرب" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.location?.message}
                  />
                )}
              />
            </div>

            {/* City */}
            <div className="col-12 col-md-6">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <SelectFieldReactSelect
                    label="المدينة"
                    options={[
                      { value: 1, name: "جده" },
                      { value: 2, name: "الرياض" },
                      { value: 3, name: "المدينه" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.city?.message}
                  />
                )}
              />
            </div>

            {/* Submit */}
            <div className="d-flex justify-content-end mt-3">
              <CustomButton size="medium" color="primary" type="submit">
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
