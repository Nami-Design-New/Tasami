import { useForm } from "react-hook-form";
import InputField from "../../ui/forms/InputField";
import SelectField from "../../ui/forms/SelectField";
import DatePicker from "../../ui/forms/DatePicker";
import SubmitButton from "../../ui/forms/SubmitButton";
import TextField from "../../ui/forms/TextField";
import SectionHeader from "../../ui/website/home/SectionHeader";
import CheckField from "../../ui/forms/CheckField";

const NewGoal = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({ mode: "onChange", defaultValues: { needHelp: false } });

    const needHelp = watch("needHelp");

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="form_wrapper new-goal page container">
            <SectionHeader title="هدف جديد" />
            <form className="form_ui mt-3" onSubmit={handleSubmit(onSubmit)}>
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
                        <InputField
                            label="مدة تحقيق الهدف"
                            placeholder="بالشهور "
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
                        <TextField
                            label="وصف الهدف"
                            placeholder="اكتب وصف الهدف هنا..."
                            id="goalDescription"
                            {...register("goalDescription")}
                            error={errors.goalDescription?.message}
                        />
                    </div>

                    <div className="col-12 col-lg-6 p-2">
                        <CheckField
                            label="تحتاج مساعدة؟"
                            id="needHelp"
                            value={needHelp}
                            activeValue={true}
                            inactiveValue={false}
                            activeLabel="نعم"
                            inactiveLabel="لا"
                            onChange={(e) => setValue("needHelp", e.target.value)}
                        />

                        {needHelp === true && (
                            <div className="col-12 col-lg-6 p-2">
                                <SelectField
                                    label="جنس المساعد الشخصي"
                                    id="assistantGender"
                                    options={[
                                        { value: "male", name: "ذكر" },
                                        { value: "female", name: "أنثى" }
                                    ]}
                                    {...register("assistantGender")}
                                    error={errors.assistantGender?.message}
                                />
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
