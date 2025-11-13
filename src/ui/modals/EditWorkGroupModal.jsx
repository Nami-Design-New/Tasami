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
import useGetCountries from "../../hooks/dashboard/regions/useGetCountries";
import { useTranslation } from "react-i18next";
import useGetCities from "../../hooks/dashboard/regions/useGetCities";
import useAddNewGroup from "../../hooks/dashboard/workingGroups/useAddNewGroup";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const defaultValues = {
  groupType: WORKING_GROPUS_CALSSIFICATIONS[0],
  region: "",
  country: "",
  city: "",
};

const EditWorkGroupModal = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    groupType: yup.string().required(t("workGroup.validation.groupType")),
    region: yup.mixed().required(t("workGroup.validation.region")),
    country: yup.mixed().required(t("workGroup.validation.country")),
    city: yup.mixed().required(t("workGroup.validation.city")),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const selectedRegion = watch("region");
  const selectedCountry = watch("country");

  console.log("Selected country", selectedCountry);
  console.log("Selected Region", selectedRegion);

  // fetch regions lazily only when modal is open
  const { regions, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetRegions(showModal);

  const {
    countries,
    isCountriesLaoding,
    fetchCountriesNextPage,
    hasCountriesNextPage,
    isFetchingCountriesNextPage,
  } = useGetCountries(selectedRegion, showModal && !!selectedRegion);

  const {
    cities,
    isCitiesLaoding,
    fetchCitiesNextPage,
    hasCitiesNextPage,
    isFetchingCitiesNextPage,
  } = useGetCities(selectedCountry, showModal && !!selectedCountry);

  const { addNewWorkingGroup, isPending } = useAddNewGroup();

  console.log("Cities", cities);

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    const payload = {
      type: data.groupType,
      region_id: data.region,
      country_id: data.country,
      city_id: data.city,
    };

    addNewWorkingGroup(payload, {
      onSuccess: (res) => {
        toast.success(res.data.message);
        setShowModal(false);
        reset(defaultValues);
        queryClient.invalidateQueries({
          queryKey: ["dashboard-working-group"],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
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
        <h6>{t("dashboard.workGroup.title")}</h6>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            {/* Group Type */}
            <div className="col-12">
              <h6 className="mb-1 label">
                {t("dashboard.workGroup.groupType")}
              </h6>
              <TabRadioGroup
                name="groupType"
                register={register}
                options={[
                  {
                    label: t("dashboard.workGroup.operational"),
                    value: WORKING_GROPUS_CALSSIFICATIONS[0],
                  },
                  {
                    label: t("dashboard.workGroup.managerial"),
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
                    label={t("dashboard.workGroup.region")}
                    options={regions?.map((r) => ({
                      value: r?.id,
                      name: r?.title,
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
                name="country"
                control={control}
                render={({ field }) => (
                  <SelectFieldReactSelect
                    label={t("dashboard.workGroup.country")}
                    options={countries?.map((r) => ({
                      value: r?.id,
                      name: r?.title,
                    }))}
                    loading={isCountriesLaoding || isFetchingCountriesNextPage}
                    onMenuScrollToBottom={() => {
                      if (hasCountriesNextPage) fetchCountriesNextPage();
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.country?.message}
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
                    label={t("dashboard.workGroup.city")}
                    options={cities?.map((r) => ({
                      value: r?.id,
                      name: r?.title,
                    }))}
                    loading={isCitiesLaoding || isFetchingCitiesNextPage}
                    value={field.value}
                    onMenuScrollToBottom={() => {
                      if (hasCitiesNextPage) fetchCitiesNextPage();
                    }}
                    onChange={field.onChange}
                    error={errors.city?.message}
                  />
                )}
              />
            </div>

            {/* Submit */}
            <div className="d-flex justify-content-end mt-3">
              <CustomButton
                loading={isPending}
                size="medium"
                color="primary"
                type="submit"
              >
                {t("dashboard.workGroup.add")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditWorkGroupModal;
