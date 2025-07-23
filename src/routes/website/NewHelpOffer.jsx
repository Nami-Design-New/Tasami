import { useForm } from "react-hook-form";
import CheckField from "../../ui/forms/CheckField";
import DatePicker from "../../ui/forms/DatePicker";
import InputField from "../../ui/forms/InputField";
import SelectField from "../../ui/forms/SelectField";
import SubmitButton from "../../ui/forms/SubmitButton";
import SectionHeader from "../../ui/website/SectionHeader";

const NewHelpOffer = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: { ageGroup: "unselected" } ,
 defaultValues: {
      duration_unit: "شهر",
    },});

  const ageGroup = watch("ageGroup");
  const unit = watch("duration_unit");

 
  return (
    <div className="form_wrapper new-help-offer page container">
      <SectionHeader title="إضافة عرض مساعدة جديد" />

      <form className="form_ui mt-3" onSubmit={handleSubmit()}>
        <div className="row">
          <div className="col-12 col-lg-6 p-2">
            <SelectField
              label="المجال"
              id="field"
              options={[
                { value: "tech", name: "تكنولوجيا" },
                { value: "design", name: "تصميم" },
              ]}
              {...register("field")}
              error={errors.field?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <SelectField
              label="التخصص"
              id="specialty"
              options={[
                { value: "web", name: "تطوير ويب" },
                { value: "mobile", name: "تطبيقات موبايل" },
              ]}
              {...register("specialty")}
              error={errors.specialty?.message}
              hint="إذا لم تجد المجال والتخصص المطلوب، تواصل مع خدمة العملاء لإضافة تصنيف جديد"
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <InputField
              label="المساعدة المعروضة"
              placeholder=" المساعدة المعروضة "
              id="offeredHelp"
              {...register("offeredHelp")}
              error={errors.offeredHelp?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
           <div className="gender-goal-filter p-2">
                  <p>تفضيل هوية المستفيد</p>

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
          </div>

           <div className="col-12 col-lg-6 p-2">
            <label className="field-label fw-bold">
              المدة المتوقعة لتقديم المساعد
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
            <DatePicker
              label="تاريخ البداية"
              id="startDate"
              {...register("startDate")}
              error={errors.startDate?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <InputField
              label="قيمة المساعدة "
              placeholder="اكتب القيمة"
              type="number"
              id="groupHelpValue"
              {...register("groupHelpValue")}
              error={errors.groupHelpValue?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <InputField
              label="بنود إضافية"
              hint="*اختياري*"
              placeholder="اكتب البنود الإضافية هنا..."
              id="groupAdditionalTerms"
              {...register("groupAdditionalTerms")}
              error={errors.groupAdditionalTerms?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <CheckField
              label="الفئة العمرية للمستفيدين"
              id="ageGroup"
              value={ageGroup}
              activeValue="selected"
              inactiveValue="unselected"
              activeLabel="محدد"
              inactiveLabel="غير محدد"
              onChange={(e) => setValue("ageGroup", e.target.value)}
            />
          </div>

          {ageGroup === "selected" && (
            <>
              <div className="col-12 col-lg-6 p-2">
                <div className="row">
                  <div className="col-6 p-1">
                    <InputField
                      label="من "
                      placeholder="اكتب العمر الأدنى"
                      id="ageFrom"
                      {...register("ageFrom")}
                      error={errors.ageFrom?.message}
                    />
                  </div>
                  <div className="col-6 p-1">
                    <InputField
                      label="إلى "
                      placeholder="اكتب العمر الأقصى"
                      id="ageTo"
                      {...register("ageTo")}
                      error={errors.ageTo?.message}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
         <div className="col-12 col-lg-12">
           <div className="select-filter p-2">
                  <p>اليات المساعدة المناسبة</p>
                  <div className="filter-options">
                    
                    <label>
                      الالتقاء الشخصي
                      <input type="checkbox" name="support" value="in_person" />
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

          <div className="col-12 p-2 mt-3">
            <div className="buttons">
              <SubmitButton text="إضافة" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewHelpOffer;
