import useGetCommunityDetails from "../../../../hooks/website/communities/useGetCommunityDetails";
import Loading from "../../../loading/Loading";
import CommunityBio from "../../../dash-board/communities-details/CommunityBio";
import CommunityActions from "../../platform/my-community/CommunityActions";
import CommunityStats from "../../../dash-board/communities-details/CommunityStats";
import CommunityTabs from "../../CommunityTabs";
import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";

export default function CommunityDetails() {
  const { communityDetails, isLoading } = useGetCommunityDetails();
  const { t } = useTranslation();
  if (isLoading) return <Loading />;
  return (
    <div className="container">
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
                />{" "}
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
          <div className="col-12 col-lg-3 p-2">
            <CommunityTabs />
          </div>
          <div className="col-12 col-lg-9 p-0">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}
