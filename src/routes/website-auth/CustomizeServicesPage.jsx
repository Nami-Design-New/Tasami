import { useNavigate } from "react-router";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";
import SelectField from "../../ui/forms/SelectField";
import { useTranslation } from "react-i18next";

export default function CustomizeServicesPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const { t } = useTranslation();
  return (
    <section className="personal-info-form">
      <p className="form-head">{t("auth.customizeServicesPrompt")}</p>
      <form className="form_ui">
        <div className="row">
          <div className="col-12 p-2">
            <SelectField
              label={t("auth.nationality")}
              options={[
                {
                  value: "saudi",
                  name: "سعودية",
                },
                {
                  value: "egypt",
                  name: "مصر",
                },
                {
                  value: "oman",
                  name: "عمان",
                },
                {
                  value: "siria",
                  name: "سوريا",
                },
                {
                  value: "lebanon",
                  name: "لبنان",
                },
              ]}
              disableFiledValue={t("auth.select")}
            />
          </div>
          <div className="col-12 p-2">
            <SelectField
              label={t("auth.residenceCountry")}
              options={[
                {
                  value: "saudi",
                  name: "سعودية",
                },
                {
                  value: "egypt",
                  name: "مصر",
                },
                {
                  value: "oman",
                  name: "عمان",
                },
                {
                  value: "siria",
                  name: "سوريا",
                },
                {
                  value: "lebanon",
                  name: "لبنان",
                },
              ]}
              disableFiledValue={t("auth.select")}
            />
          </div>
          <div className="col-12 p-2">
            <SelectField
              label={t("auth.city")}
              options={[
                {
                  value: "riyadh",
                  name: "الرياض",
                },
                {
                  value: "jeddah",
                  name: "جدة",
                },
              ]}
              disableFiledValue={t("auth.select")}
            />
          </div>
          <div className="col-12 p-2">
            <div className="buttons">
              <BackButton onClick={handleBack} />
              <CustomButton
                type="button"
                fullWidth
                size="large"
                onClick={() => navigate("/")}
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
