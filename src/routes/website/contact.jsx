import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import * as yup from "yup";
import useContactUs from "../../hooks/website/contact-us/useContactUs";
import useGetTaskSystems from "../../hooks/website/contact-us/useGetTaskSystems";
import CustomButton from "../../ui/CustomButton";
import InputField from "../../ui/forms/InputField";
import TextField from "../../ui/forms/TextField";
import useSettings from "../../hooks/website/settings/useSettings";

export default function Contact() {
  const { t } = useTranslation();
  const [activeOption, setActiveOption] = useState(null);
  const { user } = useSelector((state) => state.authRole);
  const { contactUs, isPending } = useContactUs();
  const { settings, isLoading: settingsLoading } = useSettings();

  // Validation schema
  const schema = yup.object().shape({
    subject: yup.string().required(t("contact_error_subject")),
    title: yup.string().required(t("contact_error_title")),
    // name: yup
    //   .string()
    //   .required(t("contact_error_name"))
    //   .min(6, t("contact_error_name_min")),
    // email: yup
    //   .string()
    //   .required(t("contact_error_email"))
    //   .email(t("contact_error_email_invalid")),
    message: yup
      .string()
      .required(t("contact_error_message"))
      .min(15, t("contact_error_message_min")),
  });

  const { taskSystems, isLoading } = useGetTaskSystems();
  console.log(taskSystems);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);

  const onSubmit = async (data) => {
    const payload = {
      task_system_id: data?.subject,
      name: user?.name,
      email: user?.email,
      title: data?.title,
      description: data?.message,
    };
    contactUs(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        reset();
      },
      onError: (error) => {
        error.message;
      },
    });
  };

  // const socialLinks = [
  //   { href: "#", src: "/icons/insta.svg", label: t("contact_insta") },
  //   { href: "#", src: "/icons/watsapp.svg", label: t("contact_whatsapp") },
  //   { href: "#", src: "/icons/tiktok.svg", label: t("contact_tiktok") },
  //   { href: "#", src: "/icons/snap.svg", label: t("contact_snapchat") },
  // ];

  return (
    <section className="contact-page page">
      <div className="container">
        {/* Social Links */}
        <div className="row mb-4 social-links">
          {settingsLoading ? (
            <>
              {[1, 2, 3, 4].map((link, index) => (
                <div className="col-6 col-md-3 p-2" key={index}>
                  <div className="social-box-skeleton"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              {settings?.social_links.map((link, index) => (
                <div className="col-6 col-md-3 p-2" key={index}>
                  <a href={link.link} className="social-box">
                    <img
                      src={link.logo}
                      alt={link.id}
                      className="social-icon"
                    />
                    {/* <span>{link.id}</span> */}
                  </a>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <div className="contact-form-wrapper">
              <h3 className="title">{t("contact_title")}</h3>
              <p className="desc">{t("contact_description")}</p>

              <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
                {/* Subject Options */}
                <div className="mb-3">
                  <label className="form-label">{t("contact_subject")}</label>
                  <div className="options">
                    {taskSystems?.data?.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={activeOption === opt?.id ? "active" : ""}
                        onClick={() => {
                          setActiveOption(opt?.id);
                          setValue("subject", opt?.id);
                        }}
                      >
                        {opt.title}
                      </button>
                    ))}
                  </div>
                  {errors.subject && (
                    <p className="error-text">{errors.subject.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <InputField
                    label={t("contact_field_title")}
                    placeholder={t("contact_placeholder_title")}
                    {...register("title")}
                    error={errors.title?.message}
                  />
                </div>

                {/* <div className="mb-3">
                  <InputField
                    label={t("contact_field_name")}
                    placeholder={t("contact_placeholder_name")}
                    {...register("name")}
                    error={errors.name?.message}
                  />
                </div>

                <div className="mb-3">
                  <InputField
                    label={t("contact_field_email")}
                    placeholder={t("contact_placeholder_email")}
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                  />
                </div> */}

                <div className="mb-3">
                  <TextField
                    label={t("contact_field_message")}
                    placeholder={t("contact_placeholder_message")}
                    id="commentText"
                    rows={4}
                    {...register("message")}
                    error={errors.message?.message}
                  />
                </div>

                <CustomButton disabled={isPending} loading={isPending}>
                  {t("contact_submit")}
                </CustomButton>
              </form>
            </div>
          </div>

          <div className="col-12 col-md-6 p-2">
            <div className="map-wrapper">
              <iframe
                title="Location"
                width="100%"
                height="100%"
                style={{
                  borderRadius: "16px",
                  minHeight: "600px",
                  marginTop: "2rem",
                }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509375!2d144.9537363153156!3d-37.81627974202197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd6b%3A0xf577e5f51dfb4c9b!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1633039339142!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
