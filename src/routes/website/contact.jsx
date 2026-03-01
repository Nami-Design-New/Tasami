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
import { Placeholder } from "react-bootstrap";

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

  const { taskSystems, isLoading } = useGetTaskSystems(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

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
        setActiveOption(null);
      },
      onError: (error) => {
        error.message;
        toast.error(error?.message || t("contact_error_generic"));
        // reset();
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
              {[1, 2, 3].map((link, index) => (
                <div
                  className="col-6 col-md-3 p-2"
                  style={{ height: "120px" }}
                  key={index}
                >
                  <Placeholder
                    animation="glow"
                    xs={2}
                    className="icon"
                    style={{ height: "120px", borderRadius: "10px" }}
                  >
                    <Placeholder
                      xs={12}
                      style={{ height: "100%", borderRadius: "10px" }}
                    />
                  </Placeholder>
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
          {user ? (
            <>
              {" "}
              <div className="col-12 col-md-6 p-2">
                <div className="contact-form-wrapper">
                  <h3 className="title">{t("contact_title")}</h3>
                  <p className="desc">{t("contact_description")}</p>

                  <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
                    {/* Subject Options */}
                    {isLoading ? (
                      <>
                        <div className="options mb-3">
                          {[1, 2, 3, 4].map((link, index) => (
                            <Placeholder
                              animation="glow"
                              key={index}
                              xs={2}
                              className="icon"
                              style={{ height: "36px", borderRadius: "10px" }}
                            >
                              <Placeholder
                                xs={12}
                                style={{ height: "100%", borderRadius: "10px" }}
                              />
                            </Placeholder>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="mb-3">
                        <label className="form-label">
                          {t("contact_subject")}
                        </label>
                        <div className="options">
                          {taskSystems?.data?.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={
                                activeOption === opt?.id ? "active" : ""
                              }
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
                    )}

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
                {" "}
                <div className="contact-info-wrapper">
                  <h3 className="info-title">{t("contact_info_title")}</h3>
                  <p className="info-desc">{t("contact_info_description")}</p>

                  <h5 className="info-subtitle">
                    {t("contact_info_how_can_we_help")}
                  </h5>
                  <ul className="info-list">
                    <li>{t("contact_info_service_inquiry")}</li>
                    <li>{t("contact_info_suggestions")}</li>
                    <li>{t("contact_info_report_issue")}</li>
                    <li>{t("contact_info_collaboration")}</li>
                  </ul>

                  <p className="info-footer">
                    {t("contact_info_welcome_message")}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-12  p-2">
                {" "}
                <div className="contact-info-wrapper">
                  <h3 className="info-title">{t("contact_info_title")}</h3>
                  <p className="info-desc">{t("contact_info_description")}</p>

                  <h5 className="info-subtitle">
                    {t("contact_info_how_can_we_help")}
                  </h5>
                  <ul className="info-list">
                    <li>{t("contact_info_service_inquiry")}</li>
                    <li>{t("contact_info_suggestions")}</li>
                    <li>{t("contact_info_report_issue")}</li>
                    <li>{t("contact_info_collaboration")}</li>
                  </ul>

                  <p className="info-footer">
                    {t("contact_info_welcome_message")}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
