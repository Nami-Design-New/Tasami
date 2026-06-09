import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import useGetCities from "../../hooks/dashboard/regions/useGetCities";
import useGetCountries from "../../hooks/dashboard/regions/useGetCountries";
import useGetRegions from "../../hooks/dashboard/regions/useGetRegions";
import useAddNewGroup from "../../hooks/dashboard/workingGroups/useAddNewGroup";
import useEditWorkingGroup from "../../hooks/dashboard/workingGroups/useEditWorkingGroup";
import useGetWorkingGroupdetails from "../../hooks/dashboard/workingGroups/useGetWorkingGroupDetails";
import { WORKING_GROPUS_CALSSIFICATIONS } from "../../utils/constants";
import CustomButton from "../CustomButton";
import SelectFieldReactSelect from "../forms/SelectFieldReactSelect";
import TabRadioGroup from "../TabRadioGroup";
import { useEffect, useMemo } from "react";
import SpinnerLoader from "../loading/SpinnerLoader";
import GlobalModal from "../GlobalModal";

const defaultValues = {
  groupType: WORKING_GROPUS_CALSSIFICATIONS[0],
  region: null,
  country: null,
  city: null,
};

const normalizeLocationValue = (value) =>
  value === "" || value === undefined ? null : value;

const EditWorkGroupModal = ({
  showModal,
  setShowModal,
  workingGroupId,
  workingGroupName,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const isEditMode = !!workingGroupId && !!workingGroupName;

  const schema = useMemo(
    () =>
      yup.object().shape({
        ...(isEditMode
          ? {}
          : {
              groupType: yup
                .string()
                .required(t("workGroup.validation.groupType")),
            }),
        region: yup.mixed().nullable(),
        country: yup.mixed().nullable(),
        city: yup.mixed().nullable(),
      }),
    [isEditMode, t]
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const selectedRegion = watch("region");
  const selectedCountry = watch("country");

  // Fetch working group details in edit mode
  const {
    workingGroupData,
    isLoading: isGroupLoading,
  } = useGetWorkingGroupdetails(
    workingGroupId,
    "",
    1,
    10,
    showModal && isEditMode
  );

  // Prefill form when editing
  useEffect(() => {
    if (isEditMode && workingGroupData) {
      reset({
        region: workingGroupData?.region?.id ?? null,
        country: workingGroupData?.country?.id ?? null,
        city: workingGroupData?.city?.id ?? null,
      });
    } else if (!isEditMode) {
      reset(defaultValues);
    }
  }, [workingGroupData, isEditMode, reset]);

  // Fetch region/country/city lists
  const { regions, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetRegions("on", showModal);

  const {
    countries,
    isCountriesLaoding,
    fetchCountriesNextPage,
    hasCountriesNextPage,
    isFetchingCountriesNextPage,
  } = useGetCountries(selectedRegion, "on", showModal && !!selectedRegion);

  const {
    cities,
    isCitiesLaoding,
    fetchCitiesNextPage,
    hasCitiesNextPage,
    isFetchingCitiesNextPage,
  } = useGetCities(selectedCountry, "on", showModal && !!selectedCountry);

  const allLocationOption = useMemo(
    () => ({
      value: null,
      name: t("dashboard.workGroup.all"),
    }),
    [t]
  );

  const regionOptions = useMemo(
    () => [
      allLocationOption,
      ...(regions?.map((r) => ({
        value: r?.id,
        name: r?.title,
      })) || []),
    ],
    [allLocationOption, regions]
  );

  const countryOptions = useMemo(
    () => [
      allLocationOption,
      ...(countries?.map((r) => ({
        value: r?.id,
        name: r?.title,
      })) || []),
    ],
    [allLocationOption, countries]
  );

  const cityOptions = useMemo(
    () => [
      allLocationOption,
      ...(cities?.map((r) => ({
        value: r?.id,
        name: r?.title,
      })) || []),
    ],
    [allLocationOption, cities]
  );

  //  Mutations
  const { addNewWorkingGroup, isPending } = useAddNewGroup();
  const { editWorkingGroup, isPending: isEditing } = useEditWorkingGroup();

  // Submit handler
  const onSubmit = (data) => {
    const locationPayload = {
      region_id: normalizeLocationValue(data.region),
      country_id: normalizeLocationValue(data.country),
      city_id: normalizeLocationValue(data.city),
    };

    const onSuccess = (res) => {
      toast.success(res?.message);
      setShowModal(false);
      reset(defaultValues);
      queryClient.invalidateQueries({
        queryKey: ["dashboard-working-group"],
      });
    };

    const onError = (err) => {
      toast.error(err.message);
    };

    if (isEditMode) {
      const payload = {
        ...locationPayload,
        _method: "put",
        id: workingGroupId,
      };
      editWorkingGroup(payload, { onSuccess, onError });
    } else {
      const payload = {
        type: data.groupType,
        ...locationPayload,
      };
      addNewWorkingGroup(payload, { onSuccess, onError });
    }
  };

  return (
    <GlobalModal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="working group add / edit Modal"
      centered
      className="working-group-modal"
    >
      <GlobalModal.Header closeButton>
        <h6>
          {isEditMode
            ? t("dashboard.workGroup.editTitle")
            : t("dashboard.workGroup.addTitle")}
        </h6>
      </GlobalModal.Header>

      <GlobalModal.Body>
        {isEditMode && isGroupLoading ? (
          <SpinnerLoader />
        ) : (
          <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              {!isEditMode && (
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
              )}

              {/* Region */}
              <div className="col-12 col-md-6">
                <Controller
                  name="region"
                  control={control}
                  render={({ field }) => (
                    <SelectFieldReactSelect
                      label={t("dashboard.workGroup.region")}
                      options={regionOptions}
                      loading={isLoading || isFetchingNextPage}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        if (value === null || value === "") {
                          setValue("country", null);
                          setValue("city", null);
                        }
                      }}
                      onMenuScrollToBottom={() => {
                        if (hasNextPage) fetchNextPage();
                      }}
                      error={errors.region?.message}
                    />
                  )}
                />
              </div>

              {/* Country */}
              <div className="col-12 col-md-6">
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <SelectFieldReactSelect
                      label={t("dashboard.workGroup.country")}
                      options={countryOptions}
                      loading={
                        isCountriesLaoding || isFetchingCountriesNextPage
                      }
                      onMenuScrollToBottom={() => {
                        if (hasCountriesNextPage) fetchCountriesNextPage();
                      }}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        if (value === null || value === "") {
                          setValue("city", null);
                        }
                      }}
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
                      options={cityOptions}
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
                  loading={isEditMode ? isEditing : isPending}
                  size="medium"
                  color="primary"
                  type="submit"
                >
                  {isEditMode
                    ? t("dashboard.workGroup.update")
                    : t("dashboard.workGroup.add")}
                </CustomButton>
              </div>
            </div>
          </form>
        )}
      </GlobalModal.Body>
    </GlobalModal>
  );
};

export default EditWorkGroupModal;
