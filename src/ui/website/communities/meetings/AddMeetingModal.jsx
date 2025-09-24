// import { Modal } from "react-bootstrap";
// import InputField from "../../../forms/InputField";
// import SelectField from "../../../forms/SelectField";
// import useAddMeetingForm from "../../../../validations/meetings/add-meeting";
// import { useTranslation } from "react-i18next";
// import useGetcategories from "../../../../hooks/area-of-interests/useGetcategories";
// import TextField from "../../../forms/TextField";
// import CustomButton from "../../../CustomButton";

// export default function AddMeetingModal({ showModal, setShowModal }) {
//   const { t } = useTranslation();
//   const { categories, isLoading } = useGetcategories();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useAddMeetingForm();
//   const selectedFieldId = watch("field");
//   const selectedMeetingType = watch("meetingType");
//   console.log("Selected Type:", selectedMeetingType);
//   const subCategories =
//     categories?.find((cat) => String(cat.id) === String(selectedFieldId))
//       ?.sub_categories || [];

//   return (
//     <Modal
//       show={showModal}
//       onHide={() => setShowModal(false)}
//       centered
//       size="lg"
//     >
//       <Modal.Header closeButton>
//         <h5>إضافة لقاء</h5>
//       </Modal.Header>
//       <Modal.Body>
//         <form className="form_ui">
//           <div className="row">
//             {/* Field */}
//             <div className="col-12 col-md-6 p-2">
//               <SelectField
//                 loading={isLoading}
//                 label={t("website.platform.cv.field")}
//                 {...register("field")}
//                 options={categories?.map((category) => ({
//                   value: category?.id,
//                   name: category?.title,
//                 }))}
//                 error={errors.field?.message}
//               />
//             </div>
//             {/* Specialization */}
//             <div className="col-12 col-md-6 p-2">
//               <SelectField
//                 label={t("website.platform.cv.specialization")}
//                 {...register("specialization")}
//                 options={subCategories.map((sub) => ({
//                   value: sub.id,
//                   name: sub.title,
//                 }))}
//                 error={errors.specialization?.message}
//               />
//             </div>
//             <div className="col-12 p-2">
//               <InputField label="العنوان" placeholder="عنوان اللقاء" />
//             </div>
//             <div className="col-12 p-2">
//               <TextField label="الوصف" placeholder="اكتب هنا" />
//             </div>
//             <div className="col-12 col-md-6 p-2">
//               <InputField type="date" label="التاريخ" placeholder="التاريخ" />
//             </div>
//             <div className="col-12 col-md-3 p-2">
//               <InputField label="الوقت" placeholder="الوقت" />
//             </div>
//             <div className="col-12 col-md-3 p-2">
//               <InputField label="المدة" placeholder="المدة" />
//             </div>
//             <div className="col-12 col-md-6 p-2">
//               <InputField label="الرابط" placeholder="رابط اللقاء" />
//             </div>
//             <div className="col-12 col-md-6 p-2">
//               <p className="label"> الظهور</p>
//               <div className="identity-container">
//                 <label
//                   className={`identity-option ${
//                     selectedMeetingType === "0" ? "active" : ""
//                   }`}
//                 >
//                   <input type="radio" value="0" {...register("meetingType")} />
//                   <span>{t("membersOnly")}</span>
//                 </label>

//                 <label
//                   className={`identity-option ${
//                     selectedMeetingType === "1" ? "active" : ""
//                   }`}
//                 >
//                   <input type="radio" value="1" {...register("meetingType")} />
//                   <span>{t("public")}</span>
//                 </label>
//               </div>
//             </div>
//             <div className="col-12 p-2">
//               <div className="buttons justify-content-end">
//                 <CustomButton type="submit" size="large">
//                   {t("add")}
//                 </CustomButton>
//               </div>
//             </div>
//           </div>{" "}
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// }
import { Modal } from "react-bootstrap";
import InputField from "../../../forms/InputField";
import SelectField from "../../../forms/SelectField";
import useAddMeetingForm from "../../../../validations/meetings/add-meeting";
import { useTranslation } from "react-i18next";
import useGetcategories from "../../../../hooks/area-of-interests/useGetcategories";
import TextField from "../../../forms/TextField";
import CustomButton from "../../../CustomButton";

export default function AddMeetingModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const { categories, isLoading } = useGetcategories();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useAddMeetingForm();

  const selectedFieldId = watch("field");
  const selectedMeetingType = watch("meetingType");

  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories || [];

  // ✅ Handle form submit
  const onSubmit = (data) => {
    console.log("Meeting form submitted ✅", data);

    // here you can call your API mutation
    // e.g., addMeeting(data).then(() => { setShowModal(false); reset(); });
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        reset();
      }}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <h5>{t("community.addMeeting")}</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Field */}
            <div className="col-12 col-md-6 p-2">
              <SelectField
                loading={isLoading}
                label={t("community.field")}
                {...register("field")}
                options={categories?.map((category) => ({
                  value: category?.id,
                  name: category?.title,
                }))}
                error={errors.field?.message}
              />
            </div>

            {/* Specialization */}
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={t("community.specialization")}
                {...register("specialization")}
                options={subCategories.map((sub) => ({
                  value: sub.id,
                  name: sub.title,
                }))}
                error={errors.specialization?.message}
              />
            </div>

            <div className="col-12 p-2">
              <InputField
                label={t("community.meetingTitle")}
                placeholder={t("community.meetingTitlePlaceholder")}
                {...register("title")}
                error={errors.title?.message}
              />
            </div>

            <div className="col-12 p-2">
              <TextField
                label={t("community.description")}
                placeholder={t("community.descriptionPlaceholder")}
                {...register("description")}
                error={errors.description?.message}
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <InputField
                type="date"
                label={t("community.date")}
                placeholder={t("community.datePlaceholder")}
                {...register("date")}
                error={errors.date?.message}
              />
            </div>

            <div className="col-12 col-md-3 p-2">
              <InputField
                label={t("community.time")}
                placeholder={t("community.timePlaceholder")}
                {...register("time")}
                error={errors.time?.message}
              />
            </div>

            <div className="col-12 col-md-3 p-2">
              <InputField
                label={t("community.duration")}
                placeholder={t("community.durationPlaceholder")}
                {...register("duration")}
                error={errors.duration?.message}
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("community.link")}
                placeholder={t("community.linkPlaceholder")}
                {...register("link")}
                error={errors.title?.message}
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <p className="label">{t("community.visibility")}</p>
              <div className="identity-container">
                <label
                  className={`identity-option ${
                    selectedMeetingType === "0" ? "active" : ""
                  }`}
                >
                  <input type="radio" value="0" {...register("meetingType")} />
                  <span>{t("membersOnly")}</span>
                </label>

                <label
                  className={`identity-option ${
                    selectedMeetingType === "1" ? "active" : ""
                  }`}
                >
                  <input type="radio" value="1" {...register("meetingType")} />
                  <span>{t("public")}</span>
                </label>
              </div>
              {errors && (
                <p className="error-text">{errors.meetingType?.message}</p>
              )}
            </div>

            <div className="col-12 p-2">
              <div className="buttons justify-content-end">
                <CustomButton type="submit" size="large">
                  {t("add")}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
