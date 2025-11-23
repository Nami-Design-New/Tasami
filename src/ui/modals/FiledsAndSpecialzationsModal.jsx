// import { yupResolver } from "@hookform/resolvers/yup";
// import { Modal } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import CustomButton from "../CustomButton";
// import InputField from "../forms/InputField";
// import SelectField from "../forms/SelectField";
// import TabRadioGroup from "../TabRadioGroup";
// import { useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { SUPPORTED_LANGS } from "../../lib/multilang/config";

// const FiledsAndSpecialzationsModal = ({ showModal, setShowModal }) => {
//   const { t } = useTranslation();

//   const schema = yup.object().shape({
//     isNewField: yup
//       .string()
//       .required(t("dashboard.fieldsAndSpecialization.errors.actionRequired"))
//       .oneOf(
//         ["new", "exist"],
//         t("dashboard.fieldsAndSpecialization.errors.invalidValue")
//       ),

//     field: yup.string().when("isNewField", {
//       is: "new",
//       then: () =>
//         yup
//           .string()
//           .required(
//             t("dashboard.fieldsAndSpecialization.errors.newFieldRequired")
//           )
//           .min(2, t("dashboard.fieldsAndSpecialization.errors.newFieldShort")),
//       otherwise: () => yup.string().nullable(),
//     }),

//     existingField: yup.string().when("isNewField", {
//       is: "exist",
//       then: () =>
//         yup
//           .string()
//           .required(
//             t("dashboard.fieldsAndSpecialization.errors.existingFieldRequired")
//           ),
//       otherwise: () => yup.string().nullable(),
//     }),

//     specialization: yup
//       .string()
//       .required(
//         t("dashboard.fieldsAndSpecialization.errors.specializationRequired")
//       )
//       .min(
//         2,
//         t("dashboard.fieldsAndSpecialization.errors.specializationShort")
//       ),
//   });

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       isNewField: "new",
//       field: "",
//       existingField: "",
//       specialization: "",
//     },
//   });

//   const isNewField = watch("isNewField");

//   useEffect(() => {
//     if (isNewField === "new") {
//       setValue("existingField", "");
//     } else if (isNewField === "exist") {
//       setValue("field", "");
//     }
//   }, [isNewField, setValue]);

//   const onSubmit = (data) => {
//     setShowModal(false);
//     reset();
//   };
//   return (
//     <Modal
//       show={showModal}
//       size="lg"
//       onHide={() => {
//         setShowModal(false);
//         reset();
//       }}
//       aria-labelledby="working group add / edit Modal"
//       centered
//     >
//       <Modal.Header closeButton>
//         <h6>{t("dashboard.fieldsAndSpecialization.modalTitle")}</h6>
//       </Modal.Header>
//       <Modal.Body>
//         <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
//           <div className="row g-3">
//             <TabRadioGroup
//               name="isNewField"
//               register={register}
//               options={[
//                 {
//                   label: t("dashboard.fieldsAndSpecialization.newField"),
//                   value: "new",
//                 },
//                 {
//                   label: t("dashboard.fieldsAndSpecialization.existingField"),
//                   value: "exist",
//                 },
//               ]}
//             />
//             <div className="col-12 col-md-6">
//               {isNewField === "new" ? (
//                 <>
//                   {SUPPORTED_LANGS.map((lang) => (
//                     <InputField
//                       key={lang}
//                       label={t("dashboard.fieldsAndSpecialization.fieldLabel")}
//                       placeholder={t(
//                         "dashboard.fieldsAndSpecialization.fieldPlaceholder"
//                       )}
//                       {...register("field")}
//                       error={errors.field?.message}
//                     />
//                   ))}
//                 </>
//               ) : (
//                 <SelectField
//                   label={t(
//                     "dashboard.fieldsAndSpecialization.existingFieldLabel"
//                   )}
//                   options={[
//                     { value: "1", name: "مجال 1" },
//                     { value: "2", name: "مجال 2" },
//                   ]}
//                   {...register("existingField")}
//                   error={errors.existingField?.message}
//                 />
//               )}{" "}
//             </div>
//             <div className="col-12 col-md-6">
//               <InputField
//                 label={t(
//                   "dashboard.fieldsAndSpecialization.specializationLabel"
//                 )}
//                 placeholder={t(
//                   "dashboard.fieldsAndSpecialization.specializationPlaceholder"
//                 )}
//                 {...register("specialization")}
//                 error={errors.specialization?.message}
//               />
//             </div>
//             <div className="d-flex justify-content-end ">
//               <CustomButton>
//                 {t("dashboard.fieldsAndSpecialization.addButton")}
//               </CustomButton>
//             </div>
//           </div>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default FiledsAndSpecialzationsModal;
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomButton from "../CustomButton";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import TabRadioGroup from "../TabRadioGroup";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS } from "../../lib/multilang/config";
import useAddNewSpecialization from "../../hooks/dashboard/FiledsAndSpecialations/useAddNewSpecialization";
import { toast } from "sonner";
import useGetMainCategories from "../../hooks/dashboard/FiledsAndSpecialations/useGetMainCategories";

const FiledsAndSpecialzationsModal = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();

  // ----------------- Yup Schema -----------------
  const schema = yup.object().shape({
    isNewField: yup
      .string()
      .required(t("dashboard.fieldsAndSpecialization.errors.actionRequired"))
      .oneOf(
        ["new", "exist"],
        t("dashboard.fieldsAndSpecialization.errors.invalidValue")
      ),

    // Dynamic validation for new fields (ar + en)
    field: yup.object().when("isNewField", {
      is: "new",
      then: () =>
        yup.object(
          SUPPORTED_LANGS.reduce((acc, lang) => {
            acc[lang] = yup
              .string()
              .required(
                t("dashboard.fieldsAndSpecialization.errors.newFieldRequired") +
                  ` (${lang})`
              )
              .min(
                2,
                t("dashboard.fieldsAndSpecialization.errors.newFieldShort") +
                  ` (${lang})`
              );
            return acc;
          }, {})
        ),
      otherwise: () => yup.object().nullable(),
    }),

    existingField: yup.string().when("isNewField", {
      is: "exist",
      then: () =>
        yup
          .string()
          .required(
            t("dashboard.fieldsAndSpecialization.errors.existingFieldRequired")
          ),
      otherwise: () => yup.string().nullable(),
    }),

    // Dynamic validation for specialization (ar + en)
    specialization: yup.object(
      SUPPORTED_LANGS.reduce((acc, lang) => {
        acc[lang] = yup
          .string()
          .required(
            t(
              "dashboard.fieldsAndSpecialization.errors.specializationRequired"
            ) + ` (${lang})`
          )
          .min(
            2,
            t("dashboard.fieldsAndSpecialization.errors.specializationShort") +
              ` (${lang})`
          );
        return acc;
      }, {})
    ),
  });

  // ----------------- Form Setup -----------------
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
      field: SUPPORTED_LANGS.reduce(
        (acc, lang) => ({ ...acc, [lang]: "" }),
        {}
      ),
      existingField: "",
      specialization: SUPPORTED_LANGS.reduce(
        (acc, lang) => ({ ...acc, [lang]: "" }),
        {}
      ),
    },
  });

  // ----------------- Add Hook -------------------
  const { addNewSpecialization, isPending } = useAddNewSpecialization();
  const { mainCategories, isLoading: categoriesLoading } =
    useGetMainCategories();

  const isNewField = watch("isNewField");

  // Clear conflicting fields on radio change
  useEffect(() => {
    if (isNewField === "new") {
      setValue("existingField", "");
    } else if (isNewField === "exist") {
      SUPPORTED_LANGS.forEach((lang) => setValue(`field.${lang}`, ""));
    }
  }, [isNewField, setValue]);

  // ----------------- Form Submission -----------------
  const onSubmit = (data) => {
    console.log(data);

    const payload = {
      "title:ar": data.specialization.ar,
      "title:en": data.specialization.en,
      "category_title:ar":
        data.isNewField === "new"
          ? data.field.ar
          : data?.existingFields.find((f) => f.id === data.existingField).title,
      "category_title:en":
        data.isNewField === "new"
          ? data.field.en
          : data?.existingFields.find((f) => f.id === data.existingField).title,
    };

    addNewSpecialization(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        setShowModal(false);
        reset();
      },
      onError: (err) => {
        console.error(err);
        toast.error(err?.message);
      },
    });
  };

  // ----------------- Render -----------------
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
        <h6>{t("dashboard.fieldsAndSpecialization.modalTitle")}</h6>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Radio Group: New / Existing Field */}
            <div className="col-12 p-2">
              <TabRadioGroup
                name="isNewField"
                register={register}
                options={[
                  {
                    label: t("dashboard.fieldsAndSpecialization.newField"),
                    value: "new",
                  },
                  {
                    label: t("dashboard.fieldsAndSpecialization.existingField"),
                    value: "exist",
                  },
                ]}
              />{" "}
            </div>

            {/* Field Input */}

            {isNewField === "new" ? (
              <>
                {SUPPORTED_LANGS.map((lang) => (
                  <div className="col-12 col-md-6 p-2" key={`field-${lang}`}>
                    <InputField
                      label={`${t(
                        "dashboard.fieldsAndSpecialization.fieldLabel"
                      )} (${lang})`}
                      placeholder={t(
                        "dashboard.fieldsAndSpecialization.fieldPlaceholder"
                      )}
                      {...register(`field.${lang}`)}
                      error={errors.field?.[lang]?.message}
                    />{" "}
                  </div>
                ))}
              </>
            ) : (
              <div className="col-12 col-md-12 p-2">
                <SelectField
                  label={t(
                    "dashboard.fieldsAndSpecialization.existingFieldLabel"
                  )}
                  options={
                    mainCategories?.data?.map((c) => ({
                      value: c.id,
                      name: c.title ?? "No Title",
                    })) || []
                  }
                  loading={categoriesLoading}
                  {...register("existingField")}
                  error={errors.existingField?.message}
                />
              </div>
            )}

            {/* Specialization Input */}

            {SUPPORTED_LANGS.map((lang) => (
              <div key={`specialization-${lang}`} className={"col-md-6 p-2"}>
                <InputField
                  label={`${t(
                    "dashboard.fieldsAndSpecialization.specializationLabel"
                  )} (${lang})`}
                  placeholder={t(
                    "dashboard.fieldsAndSpecialization.specializationPlaceholder"
                  )}
                  {...register(`specialization.${lang}`)}
                  error={errors.specialization?.[lang]?.message}
                />
              </div>
            ))}

            {/* Submit Button */}
            <div className="d-flex justify-content-end mt-3">
              <CustomButton type="submit" loading={isPending}>
                {t("dashboard.fieldsAndSpecialization.addButton")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FiledsAndSpecialzationsModal;
