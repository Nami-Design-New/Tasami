import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import useGetCities from "../../hooks/countries/useGetCities";
import useGetCountries from "../../hooks/countries/useGetCountries";
import useGetNationalities from "../../hooks/countries/useGetNationalities";
import useEditProfile from "../../hooks/website/profile/useEditProfile";
import { setUser } from "../../redux/slices/authRole";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";
import SelectField from "../../ui/forms/SelectField";

const getSchema = (t) =>
  yup.object().shape({
    nationality: yup.string().required(t("validation.required")),
    country: yup.string().required(t("validation.required")),
    city: yup.string().required(t("validation.required")),
  });

export default function CustomizeServicesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { editProfile, isEditingProfile } = useEditProfile();
  const handleBack = () => {
    navigate(-1);
  };
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(getSchema(t)),
    defaultValues: {
      nationality: "",
      country: "",
      city: "",
    },
  });

  const countryId = watch("country");

  const { data, isLoading: isCountriesLoading } = useGetCountries({
    search: "",
    pagination: "off",
  });
  const { nationalities, isLoading: isNationaliesLoading } =
    useGetNationalities("", "off");
  const { cities, isCitiesLoading } = useGetCities({
    search: "",
    pagination: "off",
    countryId,
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("nationality_id", data.nationality);
    formData.append("country_id", data.country);
    formData.append("city_id", data.city);

    editProfile(formData, {
      onSuccess: (res) => {
        console.log("res ////////////////////////////////////////////", res);

        toast.success(res.message);
        dispatch(setUser(res.data));
        navigate("/");
      },
      onError: (err) => {
        console.error("Failed to update profile:", err.message);
      },
    });
  };
  return (
    <section className="personal-info-form page">
      <h1 className="customize-platform-services-title">
        {t("customizePlatformServices")}{" "}
      </h1>
      <p className="form-head">{t("auth.customizeServicesPrompt")}</p>
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12  p-2">
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <SelectField
                  loading={isNationaliesLoading}
                  label={t("profile.nationality")}
                  id="nationality"
                  options={nationalities?.data?.map((nationality) => ({
                    value: nationality.id,
                    name: nationality.title,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.nationality?.message}
                />
              )}
            />
          </div>
          <div className="col-12  p-2">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <SelectField
                  label={t("profile.country")}
                  loading={isCountriesLoading}
                  id="country"
                  options={data?.map((country) => ({
                    value: country.id,
                    name: country.title,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.country?.message}
                />
              )}
            />
          </div>
          <div className="col-12  p-2">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <SelectField
                  loading={isCitiesLoading}
                  label={t("profile.city")}
                  id="city"
                  options={cities?.data?.map((city) => ({
                    value: city.id,
                    name: city.title,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.city?.message}
                />
              )}
            />
          </div>
          <div className="col-12 p-2">
            <div className="buttons">
              <BackButton onClick={handleBack} />
              <CustomButton
                loading={isEditingProfile}
                fullWidth
                type="submit"
                size="large"
              >
                {t("auth.confirm")}
              </CustomButton>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
