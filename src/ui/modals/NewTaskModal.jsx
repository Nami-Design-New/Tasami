import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SelectField from "../forms/SelectField";
import DatePicker from "../forms/DatePicker";
import TextField from "../forms/TextField";
import SubmitButton from "../forms/SubmitButton";

const NewTaskModal = ({ showModal, setShowModal, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleSave = (data) => {
    onSubmit?.(data);
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <h5 className="fw-bold">إضافة مهمة جديدة</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(handleSave)}>
          <div className="row">
            <div className="col-12 col-lg-6 p-2">
              <SelectField
                label="تصنيف المهمة"
                id="category"
                options={[
                  { value: "executive", name: "مهمة تنفيذية" },
                  { value: "planning", name: "مهمة تخطيطية" },
                  { value: "review", name: "مهمة مراجعة" },
                ]}
                {...register("category")}
                error={errors.category?.message}
              />
            </div>

            <div className="col-12 col-lg-6 p-2">
              <DatePicker
                label="تاريخ الإنجاز"
                id="dueDate"
                {...register("dueDate")}
                error={errors.dueDate?.message}
              />
            </div>

            <div className="col-12 p-2">
              <TextField
                label="ملاحظات"
                id="notes"
                placeholder="اكتب ملاحظاتك هنا..."
                as="textarea"
                rows={3}
                {...register("notes")}
                error={errors.notes?.message}
              />
            </div>
            <div className="col-12 p-2">
              <div className="gender-goal-filter p-2">
                <p> التكرار</p>

                <div className="filter-options">
                  <label>
                    اسبوعي
                    <input type="radio" name="gender" value="all" />
                  </label>
                  <label>
                    يومي
                    <input type="radio" name="gender" value="male" />
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 p-2">
              <SelectField
                label="اليوم"
                id="reminder_day"
                options={[
                  { value: "1", name: " السبت" },
                  { value: "2", name: "الاحد " },
                  { value: "3", name: "الثلاثاء" },
                ]}
                {...register("reminder_day")}
                error={errors.reminder_day?.message}
              />
            </div>

            <div className="col-12 col-lg-6 p-2">
              <SelectField
                label="ساعة التذكير"
                id="reminder_hour"
                options={[
                  { value: "09:00", name: "09:00 صباحًا" },
                  { value: "12:00", name: "12:00 ظهرًا" },
                  { value: "18:00", name: "06:00 مساءً" },
                ]}
                {...register("reminder_hour")}
                error={errors.reminder_hour?.message}
              />
            </div>

            <div className="col-12 p-2 mt-3">
              <div className="buttons d-flex gap-2">
                <div className="col-6">
                  <SubmitButton text="اضافة" />
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    className="cancle"
                    onClick={() => setShowModal(false)}
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NewTaskModal;
