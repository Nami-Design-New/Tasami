import { useForm } from "react-hook-form";
import InputField from "../../ui/forms/InputField";
import SelectField from "../../ui/forms/SelectField";
import SubmitButton from "../../ui/forms/SubmitButton";
import CheckField from "../../ui/forms/CheckField";
import DatePicker from "../../ui/forms/DatePicker";
import PhoneField from "../../ui/forms/PhoneField";
import GenderSelect from "../../ui/forms/GenderSelect copy";

export default function EditProfile() {
const {
  register,
  handleSubmit,
  watch,
  setValue,
  formState: { errors },
} = useForm({
  mode: "onChange",
  defaultValues: {
    firstName: "محمد",
    lastName: "سمير",
    date: "2000-01-01",
    gender: "male",
    nationality: "EG",
    country: "EG",
    phone: "05123456789",
    email: "mariam@example.com",
    wantChangePassword: false,
  },
});

  const wantChangePassword = watch("wantChangePassword");
  const gender = watch("gender"); 

  const onSubmit = (data) => {
    console.log("بيانات الحساب:", data);
  };

  return (
    <div className="edit-profile-page container">
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 col-lg-6 p-2">
            <InputField
              label="الاسم الاول"
              id="firstName"
              {...register("firstName", { required: "مطلوب" })}
              error={errors.firstName?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <InputField
              label="اسم الأب"
              id="lastName"
              {...register("lastName", { required: "مطلوب" })}
              error={errors.lastName?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <DatePicker
              label="تاريخ الميلاد"
              id="date"
              {...register("date", { required: "مطلوب" })}
              error={errors.date?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <GenderSelect
              value={gender}
              onChange={(val) => setValue("gender", val)}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <SelectField
              label="الجنسية"
              id="nationality"
              options={[
                { value: "EG", name: "مصري" },
                { value: "SA", name: "سعودي" },
                { value: "AE", name: "إماراتي" },
                { value: "JO", name: "أردني" },
              ]}
              {...register("nationality")}
              error={errors.nationality?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <SelectField
              label="بلد الإقامة"
              id="country"
              options={[
                { value: "EG", name: "مصر" },
                { value: "SA", name: "السعودية" },
                { value: "AE", name: "الإمارات" },
                { value: "QA", name: "قطر" },
              ]}
              {...register("country")}
              error={errors.country?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <PhoneField
              label="رقم الهاتف"
              id="phone"
              type="phone"
              country={"eg"}
              {...register("phone", { required: "مطلوب" })}
              error={errors.phone?.message}
            />
          </div>

          <div className="col-12 col-lg-6 p-2">
            <InputField
              label="البريد الإلكتروني"
              id="email"
              type="email"
              {...register("email", { required: "مطلوب" })}
              error={errors.email?.message}
            />
          </div>

           <div className="col-12 col-lg-6 p-2">
            <CheckField
              label="هل ترغب في تغيير كلمة السر؟"
              id="wantChangePassword"
              value={wantChangePassword}
              activeValue={true}
              inactiveValue={false}
              activeLabel="نعم"
              inactiveLabel="لا"
              onChange={(e) => setValue("wantChangePassword", e.target.value)}
            />
          </div>
        {wantChangePassword === true && (
            <>
              <div className="col-12 col-lg-6 p-2 mt-2">
                <InputField
                  label="كلمة السر القديمة"
                  id="oldPassword"
                  type="password"
                  {...register("oldPassword")}
                  error={errors.oldPassword?.message}
                />
              </div>
              <div className="col-12 col-lg-6 p-2">
                <InputField
                  label="كلمة السر الجديدة"
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                  error={errors.newPassword?.message}
                />
              </div>

              <div className="col-12 col-lg-6 p-2">
                <InputField
                  label="تأكيد كلمة السر"
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
              </div>
            </>
          )}



          <div className="col-12 p-2 mt-3">
            <div className="buttons">
              <SubmitButton text="حفظ البيانات" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
