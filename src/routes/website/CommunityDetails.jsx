import useGetCommunityDetails from "../../hooks/website/communities/useGetCommunityDetails";
import Loading from "../../ui/loading/Loading";
import CommunityBio from "../../ui/dash-board/communities-details/CommunityBio";
import CommunityActions from "../../ui/website/platform/my-community/CommunityActions";
import CommunityStats from "../../ui/dash-board/communities-details/CommunityStats";
import CommunityTabs from "../../ui/website/CommunityTabs";
import { Outlet, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";

export default function CommunityDetails() {
  const { communityDetails, isLoading } = useGetCommunityDetails();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  if (isLoading) return <Loading />;
  return (
    <div className="container page">
      {" "}
      <div className="my-2">
        <RoundedBackButton onClick={() => navigate(-1)}>
          {lang === "ar" ? (
            <i className="fa-solid fa-angle-right"></i>
          ) : (
            <i className="fa-solid fa-angle-left"></i>
          )}
        </RoundedBackButton>
      </div>
      <section className="communities-details">
        <div className="communities-image-wrapper">
          <img
            className="communities-image"
            src={
              communityDetails?.image ||
              "/images/dashboard/communities-image.png"
            }
            alt="communities-details"
          />
        </div>
        <div className=" mt-3">
          <div className="row">
            <div className="col-12 p-2">
              {" "}
              <div className="d-flex justify-content-between ">
                <CommunityBio userData={communityDetails?.helper} />
                <CommunityActions
                  community={communityDetails}
                  isMyCommunity={false}
                />
              </div>
              <p className="community-desc">
                {communityDetails?.helper?.about}
              </p>
            </div>
            <div className="col-12 p-2">
              <CommunityStats community={communityDetails} />
            </div>
          </div>
        </div>
        <div className="row">
          <h4 className="chanels">{t("community.channels")}</h4>
          <div className="col-4 p-2">
            <CommunityTabs
              isMyCommunity={false}
              communityId={communityDetails?.id}
            />
          </div>
          <div className="col-8 p-0">
            <Outlet context={{ communityDetails }} />
          </div>
        </div>
      </section>
    </div>
  );
}
