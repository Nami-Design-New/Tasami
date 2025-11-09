// import { Modal } from "react-bootstrap";
// import BackButton from "../forms/BackButton";
// import CustomButton from "../CustomButton";
// import SelectField from "../forms/SelectField";
// import { useNavigate } from "react-router";
// import { useTranslation } from "react-i18next";
// import useGetCountries from "../../hooks/countries/useGetCountries";
// import useGetNationalities from "../../hooks/countries/useGetNationalities";
// import useGetCities from "../../hooks/countries/useGetCities";
// import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// export default function CustomizeServicesModal({ showModal, setShowModal }) {
//   const navigate = useNavigate();
//   const handleBack = () => {
//     navigate(-1);
//   };

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     control,
//     formState: { errors },
//   } = useForm({
//     mode: "onChange",
//     resolver: yupResolver(getSchema(t)),
//     defaultValues: {
//       profilePicture: "",
//       firstName: "",
//       lastName: "",
//       date: "",
//       gender: "",
//       nationality: "",
//       country: "",
//       city: "",
//       phone: "",
//       email: "",
//       wantChangePassword: false,
//       oldPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });

//   const countryId = watch("country");

//   const { t } = useTranslation();
//   const { countries, isLoading: isCountriesLoading } = useGetCountries({
//     search: "",
//     pagenation: "off",
//   });
//   const { nationalities, isLoading: isNationaliesLoading } =
//     useGetNationalities("", "off");
//   const { cities, isCitiesLoading } = useGetCities({
//     search: "",
//     pagenation: "off",
//     countryId,
//   });
//   return (
//     <Modal show={showModal} onHide={() => setShowModal(false)}>
//       <Modal.Header>
//         <h6></h6>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="form_ui">
//           <div className="col-12 col-lg-6 p-2">
//             <Controller
//               name="nationality"
//               control={control}
//               render={({ field }) => (
//                 <SelectField
//                   loading={isNationaliesLoading}
//                   label={t("profile.nationality")}
//                   id="nationality"
//                   options={nationalities?.data?.map((nationality) => ({
//                     value: nationality.id,
//                     name: nationality.title,
//                   }))}
//                   value={field.value}
//                   onChange={field.onChange}
//                   error={errors.nationality?.message}
//                 />
//               )}
//             />
//           </div>

//           <div className="col-12 col-lg-6 p-2">
//             <Controller
//               name="country"
//               control={control}
//               render={({ field }) => (
//                 <SelectField
//                   label={t("profile.country")}
//                   loading={isCountriesLoading}
//                   id="country"
//                   options={countries?.data?.map((country) => ({
//                     value: country.id,
//                     name: country.title,
//                   }))}
//                   value={field.value}
//                   onChange={field.onChange}
//                   error={errors.country?.message}
//                 />
//               )}
//             />
//           </div>
//           <div className="col-12 col-lg-6 p-2">
//             <Controller
//               name="city"
//               control={control}
//               render={({ field }) => (
//                 <SelectField
//                   loading={isCitiesLoading}
//                   label={t("profile.city")}
//                   id="city"
//                   options={cities?.data?.map((city) => ({
//                     value: city.id,
//                     name: city.title,
//                   }))}
//                   value={field.value}
//                   onChange={field.onChange}
//                   error={errors.city?.message}
//                 />
//               )}
//             />
//           </div>
//           <div className="col-12 p-2">
//             <div className="buttons">
//               <BackButton onClick={handleBack} />
//               <CustomButton
//                 type="button"
//                 fullWidth
//                 size="large"
//                 onClick={() => navigate("/")}
//               >
//                 {t("auth.confirm")}
//               </CustomButton>
//             </div>
//           </div>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// }
