import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
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
import ContactDesc from "../../ui/ContactDesc";
import useContactUsAsGuest from "../../hooks/website/contact-us/useContactUsAsGuest";
import { useSearchParams } from "react-router";

export default function Contact() {
  const { t } = useTranslation();
  const [activeOption, setActiveOption] = useState(null);
  const { user } = useSelector((state) => state.authRole);
  const { contactUs, isPending } = useContactUs();
  const { contactUsAsGuest, contactUsPendingGuest } = useContactUsAsGuest();
  const { settings, isLoading: settingsLoading } = useSettings();
  const [searchParams, setSearchParams] = useSearchParams();
  const isComplaint = (val) => String(val) === "complaint";
  // Validation schema
  const schema = yup.object().shape({
    subject: user
      ? yup.string().required(t("contact_error_subject"))
      : yup.string().nullable(),
    title: yup.string().required(t("contact_error_title")),

    email: yup.string().when("subject", {
      is: isComplaint,
      then: (schema) =>
        schema
          .required(t("contact_error_email"))
          .email(t("contact_error_email_invalid")),
      otherwise: (schema) =>
        user
          ? schema.nullable()
          : schema
              .required(t("contact_error_email"))
              .email(t("contact_error_email_invalid")),
    }),
    message: yup
      .string()
      .required(t("contact_error_message"))
      .min(15, t("contact_error_message_min")),
  });

  const { taskSystems, isLoading } = useGetTaskSystems(user);

  //  Inject Complaint Subject
  const COMPLAINT_SUBJECT = useMemo(
    () => ({
      id: "complaint",
      code: "complaint",
      title: t("contact_complaint"),
      isComplaint: true,
    }),
    [t],
  );

  const mergedTaskSystems = useMemo(() => {
    return user
      ? [COMPLAINT_SUBJECT, ...(taskSystems?.data || [])]
      : taskSystems?.data || [];
  }, [user, taskSystems, COMPLAINT_SUBJECT]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const subjectCode = searchParams.get("subject");

    if (subjectCode && mergedTaskSystems.length) {
      const matched = mergedTaskSystems.find(
        (item) => item.code === subjectCode,
      );

      if (matched) {
        setActiveOption(matched.id);
        setValue("subject", matched.id);
      } else {
        setSearchParams({});
      }
    }
  }, [searchParams, mergedTaskSystems, setValue, setSearchParams]);

  //  Submit (dynamic logic)
  const onSubmit = async (data) => {
    const selected = mergedTaskSystems.find((item) => item.id === data.subject);
    console.log(selected);

    // Complaint → send as guest
    if (selected?.isComplaint) {
      const payload = {
        email: user?.email || data?.email,
        title: data?.title,
        description: data?.message,
      };

      contactUsAsGuest(payload, {
        onSuccess: (res) => {
          toast.success(res?.message);
          reset();
          setActiveOption(null);
          setSearchParams({});
        },
        onError: (error) => {
          toast.error(error?.message || t("contact_error_generic"));
        },
      });

      return;
    }

    //  Normal flow
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
        setSearchParams({});
      },
      onError: (error) => {
        toast.error(error?.message || t("contact_error_generic"));
      },
    });
  };

  const submit = async (data) => {
    const payload = {
      email: data?.email,
      title: data?.title,
      description: data?.message,
    };

    contactUsAsGuest(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        reset();
      },
      onError: (error) => {
        toast.error(error?.message || t("contact_error_generic"));
      },
    });
  };

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
                          {mergedTaskSystems?.map((opt) => (
                            <button
                              key={opt?.id}
                              type="button"
                              className={
                                activeOption === opt?.id ? "active" : ""
                              }
                              onClick={() => {
                                setActiveOption(opt?.id);
                                setValue("subject", opt?.id);

                                //  update URL
                                setSearchParams({
                                  subject: opt?.code,
                                });
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
                    {activeOption === "complaint" && (
                      <div className="mb-3">
                        <InputField
                          label={t("contact_field_email")}
                          placeholder={t("contact_placeholder_email")}
                          {...register("email")}
                          error={errors.email?.message}
                        />
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

                    <CustomButton
                      disabled={isPending}
                      loading={isPending || contactUsPendingGuest}
                    >
                      {t("contact_submit")}
                    </CustomButton>
                  </form>
                </div>
              </div>
              <div className="col-12 col-md-6 p-2">
                <ContactDesc />
              </div>
            </>
          ) : (
            <>
              <div className="col-12 col-md-6 p-2">
                <div className="contact-form-wrapper">
                  <h3 className="title">{t("contact_title")}</h3>
                  <p className="desc">{t("contact_description")}</p>

                  <form className="form_ui" onSubmit={handleSubmit(submit)}>
                    <div className="mb-3">
                      <InputField
                        label={t("contact_field_email")}
                        placeholder={t("contact_placeholder_email")}
                        {...register("email")}
                        error={errors.email?.message}
                      />
                    </div>{" "}
                    <div className="mb-3">
                      <InputField
                        label={t("contact_field_title")}
                        placeholder={t("contact_placeholder_title")}
                        {...register("title")}
                        error={errors.title?.message}
                      />
                    </div>
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
                    <CustomButton
                      disabled={contactUsPendingGuest}
                      loading={contactUsPendingGuest}
                    >
                      {t("contact_submit")}
                    </CustomButton>
                  </form>
                </div>
              </div>
              <div className="col-12 col-md-6 p-2">
                <ContactDesc />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
