// // src/ui/modals/EditWorkGroupModal.jsx
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Modal } from "react-bootstrap";
// import { useForm, Controller } from "react-hook-form";
// import * as yup from "yup";
// import { WORKING_GROPUS_CALSSIFICATIONS } from "../../utils/constants";
// import CustomButton from "../CustomButton";
// import TabRadioGroup from "../TabRadioGroup";
// import useGetRegions from "../../hooks/dashboard/regions/useGetRegions";
// import SelectFieldReactSelect from "../forms/SelectFieldReactSelect";
// import useGetCountries from "../../hooks/dashboard/regions/useGetCountries";
// import { useTranslation } from "react-i18next";
// import useGetCities from "../../hooks/dashboard/regions/useGetCities";
// import useAddNewGroup from "../../hooks/dashboard/workingGroups/useAddNewGroup";
// import { toast } from "sonner";
// import { useQueryClient } from "@tanstack/react-query";
// import useEditWorkingGroup from "../../hooks/dashboard/workingGroups/useEditWorkingGroup";

// const defaultValues = {
//   groupType: WORKING_GROPUS_CALSSIFICATIONS[0],
//   region: "",
//   country: "",
//   city: "",
// };

// const EditWorkGroupModal = ({ showModal, setShowModal, workingGroupId }) => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();

//   const schema = yup.object().shape({
//     groupType: yup.string().required(t("workGroup.validation.groupType")),
//     region: yup.mixed().required(t("workGroup.validation.region")),
//     country: yup.mixed().required(t("workGroup.validation.country")),
//     city: yup.mixed().required(t("workGroup.validation.city")),
//   });

//   const {
//     control,
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues,
//   });

//   const selectedRegion = watch("region");
//   const selectedCountry = watch("country");

//   // fetch regions lazily only when modal is open
//   const { regions, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useGetRegions(showModal);

//   const {
//     countries,
//     isCountriesLaoding,
//     fetchCountriesNextPage,
//     hasCountriesNextPage,
//     isFetchingCountriesNextPage,
//   } = useGetCountries(selectedRegion, showModal && !!selectedRegion);

//   const {
//     cities,
//     isCitiesLaoding,
//     fetchCitiesNextPage,
//     hasCitiesNextPage,
//     isFetchingCitiesNextPage,
//   } = useGetCities(selectedCountry, showModal && !!selectedCountry);

//   const { addNewWorkingGroup, isPending } = useAddNewGroup();
//   const { editWorkingGroup, isPending: isEditing } = useEditWorkingGroup();

//   const onSubmit = (data) => {
//     console.log("Submitted Data:", data);
//     const payload = {
//       type: data.groupType,
//       region_id: data.region,
//       country_id: data.country,
//       city_id: data.city,
//     };

//     addNewWorkingGroup(payload, {
//       onSuccess: (res) => {
//         toast.success(res.data.message);
//         setShowModal(false);
//         reset(defaultValues);
//         queryClient.invalidateQueries({
//           queryKey: ["dashboard-working-group"],
//         });
//       },
//       onError: (err) => {
//         toast.error(err.message);
//       },
//     });
//   };

//   return (
//     <Modal
//       show={showModal}
//       size="lg"
//       onHide={() => setShowModal(false)}
//       aria-labelledby="working group add / edit Modal"
//       centered
//       className="working-group-modal"
//     >
//       <Modal.Header closeButton>
//         <h6>{t("dashboard.workGroup.title")}</h6>
//       </Modal.Header>

//       <Modal.Body>
//         <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
//           <div className="row g-3">
//             {/* Group Type */}
//             <div className="col-12">
//               <h6 className="mb-1 label">
//                 {t("dashboard.workGroup.groupType")}
//               </h6>
//               <TabRadioGroup
//                 name="groupType"
//                 register={register}
//                 options={[
//                   {
//                     label: t("dashboard.workGroup.operational"),
//                     value: WORKING_GROPUS_CALSSIFICATIONS[0],
//                   },
//                   {
//                     label: t("dashboard.workGroup.managerial"),
//                     value: WORKING_GROPUS_CALSSIFICATIONS[1],
//                   },
//                 ]}
//               />
//             </div>

//             {/* Region */}
//             <div className="col-12 col-md-6">
//               <Controller
//                 name="region"
//                 control={control}
//                 render={({ field }) => (
//                   <SelectFieldReactSelect
//                     label={t("dashboard.workGroup.region")}
//                     options={regions?.map((r) => ({
//                       value: r?.id,
//                       name: r?.title,
//                     }))}
//                     loading={isLoading || isFetchingNextPage}
//                     value={field.value}
//                     onChange={field.onChange}
//                     onMenuScrollToBottom={() => {
//                       if (hasNextPage) fetchNextPage();
//                     }}
//                     error={errors.region?.message}
//                   />
//                 )}
//               />
//             </div>

//             {/* Location */}
//             <div className="col-12 col-md-6">
//               <Controller
//                 name="country"
//                 control={control}
//                 render={({ field }) => (
//                   <SelectFieldReactSelect
//                     label={t("dashboard.workGroup.country")}
//                     options={countries?.map((r) => ({
//                       value: r?.id,
//                       name: r?.title,
//                     }))}
//                     loading={isCountriesLaoding || isFetchingCountriesNextPage}
//                     onMenuScrollToBottom={() => {
//                       if (hasCountriesNextPage) fetchCountriesNextPage();
//                     }}
//                     value={field.value}
//                     onChange={field.onChange}
//                     error={errors.country?.message}
//                   />
//                 )}
//               />
//             </div>
//             {/* City */}
//             <div className="col-12 col-md-6">
//               <Controller
//                 name="city"
//                 control={control}
//                 render={({ field }) => (
//                   <SelectFieldReactSelect
//                     label={t("dashboard.workGroup.city")}
//                     options={cities?.map((r) => ({
//                       value: r?.id,
//                       name: r?.title,
//                     }))}
//                     loading={isCitiesLaoding || isFetchingCitiesNextPage}
//                     value={field.value}
//                     onMenuScrollToBottom={() => {
//                       if (hasCitiesNextPage) fetchCitiesNextPage();
//                     }}
//                     onChange={field.onChange}
//                     error={errors.city?.message}
//                   />
//                 )}
//               />
//             </div>

//             {/* Submit */}
//             <div className="d-flex justify-content-end mt-3">
//               <CustomButton
//                 loading={isPending}
//                 size="medium"
//                 color="primary"
//                 type="submit"
//               >
//                 {t("dashboard.workGroup.add")}
//               </CustomButton>
//             </div>
//           </div>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default EditWorkGroupModal;
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
import useEditWorkingGroup from "../../hooks/dashboard/workingGroups/useEditWorkingGroup";
import { useEffect } from "react";
import useGetWorkingGroupdetails from "../../hooks/dashboard/workingGroups/useGetWorkingGroupDetails";

const defaultValues = {
  groupType: WORKING_GROPUS_CALSSIFICATIONS[0],
  region: "",
  country: "",
  city: "",
};

const EditWorkGroupModal = ({
  showModal,
  setShowModal,
  workingGroupId,
  workingGroupName,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  console.log(workingGroupId);

  const isEditMode = !!workingGroupId && !!workingGroupName;

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

  // Fetch working group details in edit mode
  const {
    workingGoupDetails,
    workingMembers,
    isError,
    refetch,
    isLoading: isGroupLoading,
  } = useGetWorkingGroupdetails(
    workingGroupName,
    "",
    1,
    10,
    showModal && isEditMode
  );
  console.log(workingMembers);

  // // Prefill form when editing
  // useEffect(() => {
  //   if (isEditMode && workingGroupData) {
  //     reset({
  //       groupType: workingGroupData?.type || WORKING_GROPUS_CALSSIFICATIONS[0],
  //       region: workingGroupData?.region_id || "",
  //       country: workingGroupData?.country_id || "",
  //       city: workingGroupData?.city_id || "",
  //     });
  //   } else if (!isEditMode) {
  //     reset(defaultValues);
  //   }
  // }, [workingGroupData, isEditMode, reset]);

  // Fetch region/country/city lists
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

  // ✅ Mutations
  const { addNewWorkingGroup, isPending } = useAddNewGroup();
  const { editWorkingGroup, isPending: isEditing } = useEditWorkingGroup();

  // ✅ Submit handler
  const onSubmit = (data) => {
    const payload = {
      type: data.groupType,
      region_id: data.region,
      country_id: data.country,
      city_id: data.city,
    };

    const onSuccess = (res) => {
      toast.success(res.data.message);
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
      editWorkingGroup({ id: workingGroupId, payload }, { onSuccess, onError });
    } else {
      addNewWorkingGroup(payload, { onSuccess, onError });
    }
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
        <h6>
          {isEditMode
            ? t("dashboard.workGroup.editTitle")
            : t("dashboard.workGroup.addTitle")}
        </h6>
      </Modal.Header>

      <Modal.Body>
        {isEditMode && isGroupLoading ? (
          <div className="text-center py-4">{t("loading")}</div>
        ) : (
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

              {/* Country */}
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
                      loading={
                        isCountriesLaoding || isFetchingCountriesNextPage
                      }
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
      </Modal.Body>
    </Modal>
  );
};

export default EditWorkGroupModal;
