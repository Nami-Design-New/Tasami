// import { useState } from "react";
// import { Modal } from "react-bootstrap";
// import CustomButton from "../../CustomButton";
// import TextField from "../../forms/TextField";
// import ContractStarRating from "../../ContractStarRating";

// export default function ContractRateModal({ showModal, setShowModal }) {
//   const [rating, setRating] = useState(0);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Selected Rating:", rating);
//     setShowModal(false);
//   };

//   return (
//     <Modal
//       show={showModal}
//       onHide={() => setShowModal(false)}
//       centered
//       size="md"
//     >
//       <Modal.Header closeButton>
//         <h5>تقييم</h5>
//       </Modal.Header>

//       <Modal.Body>
//         <form onSubmit={handleSubmit} className="form_ui">
//           <div className="row">
//             <div className="col-12 p-2">
//               <div className="d-flex align-items-center justify-content-between">
//                 <span>الخبرة والمعرفة</span>
//                 <ContractStarRating value={rating} onChange={setRating} />{" "}
//               </div>
//             </div>
//             <div className="col-12 p-2">
//               {" "}
//               <div className="d-flex align-items-center justify-content-between">
//                 <span>الإلتزام بالوقت</span>
//                 <ContractStarRating value={rating} onChange={setRating} />{" "}
//               </div>
//             </div>
//             <div className="col-12 p-2">
//               <div className="d-flex align-items-center justify-content-between">
//                 <span>جودة الأداء</span>
//                 <ContractStarRating value={rating} onChange={setRating} />{" "}
//               </div>
//             </div>
//             <div className="col-12 p-2">
//               <div className="d-flex align-items-center justify-content-between">
//                 <span>الاحترام والتعامل</span>
//                 <ContractStarRating value={rating} onChange={setRating} />{" "}
//               </div>
//             </div>
//             <div className="col-12 p-2">
//               <TextField />
//             </div>
//             <div className="col-12 p-2 ">
//               <div className="buttons">
//                 <CustomButton
//                   type="button"
//                   variant="outlined"
//                   size="large"
//                   onClick={() => setShowModal(false)}
//                 >
//                   إلغاء
//                 </CustomButton>
//                 <CustomButton
//                   type="submit"
//                   fullWidth
//                   size="large"
//                   disabled={rating === 0}
//                 >
//                   إرسال
//                 </CustomButton>{" "}
//               </div>
//             </div>
//           </div>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// }

import { Modal } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../../CustomButton";
import TextField from "../../forms/TextField";
import ContractStarRating from "../../ContractStarRating";
import useRateContract from "../../../hooks/website/MyWorks/useRateContract";
import { toast } from "sonner";

// ✅ Validation Schema
const schema = yup.object().shape({
  experience_and_knowledge: yup
    .number()
    .min(1, "الرجاء اختيار تقييم الخبرة والمعرفة")
    .required("الرجاء اختيار تقييم الخبرة والمعرفة"),
  commitment_to_time: yup
    .number()
    .min(1, "الرجاء اختيار تقييم الالتزام بالوقت")
    .required("الرجاء اختيار تقييم الالتزام بالوقت"),
  quality_of_performance: yup
    .number()
    .min(1, "الرجاء اختيار تقييم جودة الأداء")
    .required("الرجاء اختيار تقييم جودة الأداء"),
  respect_and_treatment: yup
    .number()
    .min(1, "الرجاء اختيار تقييم الاحترام والتعامل")
    .required("الرجاء اختيار تقييم الاحترام والتعامل"),
  notes: yup.string().nullable(),
});

export default function ContractRateModal({
  showModal,
  setShowModal,
  contractId,
}) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      experience_and_knowledge: 0,
      commitment_to_time: 0,
      quality_of_performance: 0,
      respect_and_treatment: 0,
      notes: "",
    },
  });

  const { rateContract, isPending } = useRateContract();

  const onSubmit = (data) => {
    console.log("Form Data Submitted :", data);
    setShowModal(false);
    const payload = {
      ...data,
      contract_id: contractId,
    };
    rateContract(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        reset();
        setShowModal(false);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="md"
    >
      <Modal.Header closeButton>
        <h5>تقييم</h5>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
          <div className="row">
            {/* Experience and Knowledge */}
            <div className="col-12 p-2">
              <div className="d-flex align-items-center justify-content-between">
                <span>الخبرة والمعرفة</span>
                <Controller
                  name="experience_and_knowledge"
                  control={control}
                  render={({ field }) => (
                    <ContractStarRating
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              {errors.experience_and_knowledge && (
                <small className="text-danger">
                  {errors.experience_and_knowledge.message}
                </small>
              )}
            </div>

            {/* Commitment to Time */}
            <div className="col-12 p-2">
              <div className="d-flex align-items-center justify-content-between">
                <span>الإلتزام بالوقت</span>
                <Controller
                  name="commitment_to_time"
                  control={control}
                  render={({ field }) => (
                    <ContractStarRating
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              {errors.commitment_to_time && (
                <small className="text-danger">
                  {errors.commitment_to_time.message}
                </small>
              )}
            </div>

            {/* Quality of Performance */}
            <div className="col-12 p-2">
              <div className="d-flex align-items-center justify-content-between">
                <span>جودة الأداء</span>
                <Controller
                  name="quality_of_performance"
                  control={control}
                  render={({ field }) => (
                    <ContractStarRating
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              {errors.quality_of_performance && (
                <small className="text-danger">
                  {errors.quality_of_performance.message}
                </small>
              )}
            </div>

            {/* Respect and Treatment */}
            <div className="col-12 p-2">
              <div className="d-flex align-items-center justify-content-between">
                <span>الاحترام والتعامل</span>
                <Controller
                  name="respect_and_treatment"
                  control={control}
                  render={({ field }) => (
                    <ContractStarRating
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              {errors.respect_and_treatment && (
                <small className="text-danger">
                  {errors.respect_and_treatment.message}
                </small>
              )}
            </div>

            {/* Notes */}
            <div className="col-12 p-2">
              <TextField
                label="ملاحظات (اختياري)"
                placeholder="اكتب ملاحظاتك هنا..."
                {...register("notes")}
                error={errors.notes?.message}
              />
            </div>

            {/* Buttons */}
            <div className="col-12 p-2">
              <div className="d-flex gap-2">
                <CustomButton
                  type="button"
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                >
                  إلغاء
                </CustomButton>
                <CustomButton
                  type="submit"
                  loading={isPending}
                  size="large"
                  fullWidth
                >
                  إرسال
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
