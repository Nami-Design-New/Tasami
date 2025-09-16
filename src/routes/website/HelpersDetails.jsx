import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import useGetAssistantDetails from "../../hooks/website/personal-assistants/useGetAssistantDetails";
import CustomButton from "../../ui/CustomButton";
import Loading from "../../ui/loading/Loading";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";
import PersonalHelperExperiences from "../../ui/website/helpers/PersonalHelperExperiences";
import PersonalHelperDoc from "../../ui/website/helpers/PersonalHelperDoc";
import OfferCard from "../../ui/cards/OfferCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";
import useFollow from "../../hooks/website/personal-assistants/useFollow";
import { useState } from "react";

export default function HelpersDetails() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);
  const { lang } = useSelector((state) => state.language);
  const { assistantDetails, isLoading } = useGetAssistantDetails();
  const [optimisticFollow, setOptimisticFollow] = useState(
    assistantDetails?.i_follow_him
  );
  const { toggleFollow, isPending } = useFollow();

  const handleBack = () => {
    navigate(-1);
  };

  const handleFollow = (id) => {
    // Save old state in case we need to rollback
    const previousValue = optimisticFollow;

    // Immediately flip the value (optimistic update)
    setOptimisticFollow(!optimisticFollow);

    toggleFollow(id, {
      onError: () => {
        // Rollback if server call fails
        setOptimisticFollow(previousValue);
      },
    });
  };

  if (isLoading) return <Loading />;
  const thisIsMe = user.id === assistantDetails.id;

  return (
    <section className="page helper-details-section">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="header">
              <RoundedBackButton onClick={handleBack}>
                <i
                  className={
                    lang === "ar"
                      ? "fa-solid fa-angle-right"
                      : "fa-solid fa-angle-left"
                  }
                ></i>
              </RoundedBackButton>
              {!assistantDetails.i_follow_him && !thisIsMe && (
                <button
                  className={`follow-btn  ${
                    optimisticFollow ? "unfollow" : ""
                  }`}
                  onClick={() => handleFollow(assistantDetails.id)}
                  disabled={isPending}
                >
                  {optimisticFollow ? (
                    <i className="fa-regular fa-user-xmark"></i>
                  ) : (
                    <i className="fa-regular fa-user-plus"></i>
                  )}
                  {optimisticFollow
                    ? t("website.assistants.unFollow")
                    : t("website.assistants.follow")}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-12">
            <div className="goal-details-card">
              <div className="user-profile">
                <img
                  src={assistantDetails.image}
                  alt={assistantDetails.name}
                  className="avatar"
                />
                <div className="content">
                  <h6>{assistantDetails.name}</h6>
                  <div className="d-flex gap-2 align-items-center">
                    <img src="/icons/flag.svg" />
                    <span>{assistantDetails?.country?.title}</span>
                  </div>
                </div>
                <div className="rating">
                  <img src="/icons/medal.svg" />
                  <span>{assistantDetails.completed_contract}</span>
                </div>
              </div>

              <div className="about">
                <h6>{t("website.assistants.about")}</h6>
                <p>{assistantDetails.about}</p>
              </div>

              <CustomButton size="large" fullWidth>
                {`${t("website.assistants.community")}  ${
                  assistantDetails.name
                }`}
              </CustomButton>
            </div>
          </div>

          <div className="col-lg-8 col-12">
            <div className="personal-assiatant-details-card">
              <div className="exp-info-grid">
                <div className="exp-info-box">
                  <h5>{t("website.assistants.completed_contracts")}</h5>
                  <p>{assistantDetails.completed_contract}</p>
                </div>
                <div className="exp-info-box">
                  <h5>{t("website.assistants.progress_contracts")}</h5>
                  <p>{assistantDetails.progress_contract}</p>
                </div>
              </div>

              <div className="exp-info">
                <h6>{t("website.assistants.experiences")}</h6>
                <PersonalHelperExperiences
                  tabs={assistantDetails.user_experiences}
                />
              </div>

              <div className="exp-info">
                <h6>{t("website.assistants.documents")} </h6>
                <PersonalHelperDoc tabs={assistantDetails.user_documents} />
              </div>

              <div className="more-offers">
                <h6>
                  {t("website.assistants.offers")}{" "}
                  <span> &quot;{assistantDetails.name}&quot;</span>{" "}
                </h6>
                <div className="row">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={16}
                    breakpoints={{
                      768: { slidesPerView: 2, spaceBetween: 12 },
                      1024: { slidesPerView: 2, spaceBetween: 16 },
                      1200: { slidesPerView: 3, spaceBetween: 16 },
                    }}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Autoplay]}
                    observer={false}
                    observeParents={false}
                    watchOverflow={true}
                    resizeObserver={false}
                  >
                    {assistantDetails.user_services.map((offer) => (
                      <SwiperSlide key={offer.id}>
                        <OfferCard offer={offer} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
