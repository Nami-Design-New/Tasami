import { useForm } from "react-hook-form";
import CheckField from "../../ui/forms/CheckField";
import DatePicker from "../../ui/forms/DatePicker";
// import GenderSelect from "../../ui/forms/GenderSelect copy";
import InputField from "../../ui/forms/InputField";
import SelectField from "../../ui/forms/SelectField";
import SubmitButton from "../../ui/forms/SubmitButton";
import TextField from "../../ui/forms/TextField";
import SectionHeader from "../../ui/website/SectionHeader";

const NewGoal = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { needHelp: false, duration_unit: "شهر" },
  });

  const needHelp = watch("needHelp");
  const unit = watch("duration_unit");

  return (
    <div className="form_wrapper new-goal page container">
      <SectionHeader title="هدف جديد" />
      <form className="form_ui mt-3" onSubmit={handleSubmit()}>
        <div className="row">
          <div className="col-12 col-lg-6 p-2">
            <SelectField
              label="المجال"
              id="field"
              options={[{ value: "tech", name: "تكنولوجيا" }]}
              {...register("field")}
              error={errors.field?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <SelectField
              label="التخصص"
              id="specialty"
              hint="إذا لم تجد المجال والتخصص المطلوب، تواصل مع خدمة العملاء لاضافة تصنيف جديد"
              options={[{ value: "web", name: "ويب" }]}
              {...register("specialty")}
              error={errors.specialty?.message}
            />
          </div>
          <div className="col-12 col-lg-6 p-2">
            <DatePicker
              label="تاريخ البداية"
              id="startDate"
              {...register("startDate")}
              error={errors.startDate?.message}
            />
          </div>
          <div className="col-12 col-lg-6 p-2">
            <label className="field-label fw-bold">
              المدة المتوقعة لتحقيق الهدف
            </label>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-grow-1">
                <InputField
                  id="duration"
                  type="number"
                  placeholder={`بالـ ${unit || "شهر"}`}
                  {...register("duration")}
                  error={errors.duration?.message}
                />
              </div>
              <div style={{ width: "130px" }}>
                <CheckField
                  id="duration_unit"
                  value={unit}
                  onChange={(e) => setValue("duration_unit", e.target.value)}
                  activeValue="شهر"
                  inactiveValue="يوم"
                  activeLabel="شهر"
                  inactiveLabel="يوم"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 p-2">
            <TextField
              label="وصف الهدف"
              placeholder="اكتب وصف الهدف هنا..."
              id="goalDescription"
              {...register("goalDescription")}
              error={errors.goalDescription?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <label className="field-label fw-bold"> تعيين مساعد شخصي؟</label>
            <CheckField
              id="needHelp"
              value={needHelp}
              activeValue={true}
              inactiveValue={false}
              activeLabel="نعم"
              inactiveLabel="لا"
              onChange={(e) => setValue("needHelp", e.target.value)}
            />
            {needHelp === true && (
              <div className="col-12 col-lg-12">
                <div className="gender-goal-filter p-2">
                  <p>تفضيل هوية المساعد الشخصي</p>

                  <div className="filter-options">
                    <label>
                      الكل
                      <input type="radio" name="gender" value="all" />
                    </label>
                    <label>
                      ذكر
                      <input type="radio" name="gender" value="male" />
                    </label>
                    <label>
                      أنثى
                      <input type="radio" name="gender" value="female" />
                    </label>
                  </div>
                </div>
                <div className="select-filter p-2">
                  <p>اليات المساعدة المناسبة</p>
                  <div className="filter-options">
                    <label>
                      الكل
                      <input type="checkbox" name="support" value="all" />
                    </label>
                    <label>
                      الاتصال المرئي والمسموع
                      <input
                        type="checkbox"
                        name="support"
                        value="video_audio"
                      />
                    </label>
                    <label>
                      الالتقاء الشخصي
                      <input type="checkbox" name="support" value="in_person" />
                    </label>
                    <label>
                      التراسل النصي والصوتي
                      <input
                        type="checkbox"
                        name="support"
                        value="text_voice"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-12 p-2 mt-3">
            <div className="buttons">
              <SubmitButton text="إنشاء" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewGoal;
