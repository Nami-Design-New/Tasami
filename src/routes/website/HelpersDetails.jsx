import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useFollow from "../../hooks/website/personal-assistants/useFollow";
import useGetAssistantDetails from "../../hooks/website/personal-assistants/useGetAssistantDetails";
import OfferCard from "../../ui/cards/OfferCard";

import CustomLink from "../../ui/CustomLink";

import Loading from "../../ui/loading/Loading";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";
import PersonalHelperDoc from "../../ui/website/helpers/PersonalHelperDoc";
import PersonalHelperExperiences from "../../ui/website/helpers/PersonalHelperExperiences";

export default function HelpersDetails() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authRole);
  const { lang } = useSelector((state) => state.language);
  const { assistantDetails, isLoading } = useGetAssistantDetails();
  const queryClient = useQueryClient();
  const [optimisticFollow, setOptimisticFollow] = useState(
    assistantDetails?.i_follow_him
  );

  useEffect(() => {
    if (assistantDetails) {
      setOptimisticFollow(assistantDetails.i_follow_him);
    }
  }, [assistantDetails]);
  const { toggleFollow, isPending } = useFollow();

  const handleBack = () => {
    navigate(-1);
  };

  const handleFollow = (id) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const previousValue = optimisticFollow;

    // Optimistic update
    setOptimisticFollow(!optimisticFollow);

    toggleFollow(id, {
      onSuccess: (res) => {
        if (res?.data?.i_follow_him !== undefined) {
          setOptimisticFollow(res.data.i_follow_him);
        }

        if (res?.data?.i_follow_him === false) {
          navigate("/my-profile/followings");
        }
        queryClient.refetchQueries({
          queryKey: ["my-following"],
        });
      },
      onError: () => {
        // Rollback if API fails
        setOptimisticFollow(previousValue);
      },
      onSettled: () => {
        // Optionally refetch assistant details too
        queryClient.invalidateQueries({
          queryKey: ["assistant-details", id],
        });
      },
    });
  };

  if (isLoading) return <Loading />;
  const thisIsMe = user?.id === assistantDetails?.id;

  return (
    <section className="page helper-details-section">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="header">
              <RoundedBackButton onClick={handleBack}></RoundedBackButton>
              {!thisIsMe && (
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

          <div className="col-lg-4 col-12 p-2">
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
              {assistantDetails.community_id !== null && !thisIsMe && (
                <CustomLink
                  to={
                    !user
                      ? "/login"
                      : `/community/${assistantDetails.community_id}`
                  }
                  size="large"
                  fullWidth
                  className="mt-3"
                >
                  {`${t("website.assistants.community")} ${
                    assistantDetails.name
                  }`}
                </CustomLink>
              )}
              {thisIsMe && (
                <CustomLink
                  to="/my-community"
                  size="large"
                  fullWidth
                  className="mt-3"
                >
                  {t("website.assistants.myCommunity")}
                </CustomLink>
              )}
            </div>
          </div>

          <div className="col-lg-8 col-12 p-2">
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
                    spaceBetween={0}
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
