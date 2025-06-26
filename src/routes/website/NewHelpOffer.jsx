import { useForm } from "react-hook-form";
import InputField from "../../ui/forms/InputField";
import SelectField from "../../ui/forms/SelectField";
import DatePicker from "../../ui/forms/DatePicker";
import SubmitButton from "../../ui/forms/SubmitButton";
import SectionHeader from "../../ui/website/home/SectionHeader";
import CheckField from "../../ui/forms/CheckField";

const NewHelpOffer = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm({ mode: "onChange", defaultValues: { ageGroup: "unselected" } });

    const ageGroup = watch("ageGroup");

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="form_wrapper new-help-offer page mx-3">
            <SectionHeader title="إضافة عرض مساعدة جديد" />

            <form className="form_ui mt-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">


                    <div className="col-12 col-lg-6 p-2">
                        <SelectField
                            label="المجال"
                            id="field"
                            options={[
                                { value: "tech", name: "تكنولوجيا" },
                                { value: "design", name: "تصميم" }
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
                                { value: "mobile", name: "تطبيقات موبايل" }
                            ]}
                            {...register("specialty")}
                            error={errors.specialty?.message}
                            hint='إذا لم تجد المجال والتخصص المطلوب، تواصل مع خدمة العملاء لإضافة تصنيف جديد'
                        />
                    </div>

                    <div className="col-12 col-lg-6 p-2">
                        <InputField
                            label="المساعدة المعروضة"
                            placeholder="اكتب المساعدة المعروضة هنا..."
                            id="offeredHelp"
                            {...register("offeredHelp")}
                            error={errors.offeredHelp?.message}
                        />
                    </div>

                    <div className="col-12 col-lg-6 p-2">
                        <SelectField
                            label="جنس المستفيد"
                            id="assistantGender"
                            options={[
                                { value: "male", name: "ذكر" },
                                { value: "female", name: "أنثى" }
                            ]}
                            {...register("assistantGender")}
                            error={errors.assistantGender?.message}
                        />
                    </div>

                    <div className="col-12 col-lg-6 p-2">
                        <InputField
                            label="مدة تحقيق الهدف"
                            placeholder="بالشهور مثلاً"
                            id="duration"
                            {...register("duration")}
                            error={errors.duration?.message}
                        />
                    </div>

                    <div className="col-12 col-lg-6 p-2">
                        <DatePicker
                            beforeContent="تاريخ البداية"
                            id="startDate"
                            {...register("startDate")}
                            error={errors.startDate?.message}
                        />
                    </div>

                    <div className="col-12 col-lg-6 p-2">
                        <InputField
                            label="قيمة المساعدة ضمن المجموعة"
                            placeholder="اكتب القيمة"
                            id="groupHelpValue"
                            {...register("groupHelpValue")}
                            error={errors.groupHelpValue?.message}
                        />
                    </div>

                    <div className="col-12 col-lg-6 p-2">
                        <InputField
                            label='بنود إضافية للمجموعة'
                            hint="*اختياري*"
                            placeholder="اكتب البنود الإضافية هنا..."
                            id="groupAdditionalTerms"
                            {...register("groupAdditionalTerms")}
                            error={errors.groupAdditionalTerms?.message}
                        />
                    </div>

                    <div className="col-12 col-lg-6 p-2">
                        <InputField
                            label="قيمة المساعدة الشخصية"
                            placeholder="اكتب القيمة"
                            id="personalHelpValue"
                            {...register("personalHelpValue")}
                            error={errors.personalHelpValue?.message}
                        />
                    </div>

                    <div className="col-12 col-lg-6 p-2">
                        <InputField
                            label='بنود إضافية للمساعدة الشخصية'
                            hint="*اختياري*"
                            placeholder="اكتب البنود الإضافية هنا..."
                            id="personalAdditionalTerms"
                            {...register("personalAdditionalTerms")}
                            error={errors.personalAdditionalTerms?.message}
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
