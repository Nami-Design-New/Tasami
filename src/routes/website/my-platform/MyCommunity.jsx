import { Outlet, useNavigate } from "react-router";
import useGetMyCommunity from "../../../hooks/website/communities/useGetMyCommunity";
import CommunityBio from "../../../ui/dash-board/communities-details/CommunityBio";
import CommunityStats from "../../../ui/dash-board/communities-details/CommunityStats";
import Loading from "../../../ui/loading/Loading";
import CommunityTabs from "../../../ui/website/CommunityTabs";
import CommunityActions from "../../../ui/website/platform/my-community/CommunityActions";
import { useTranslation } from "react-i18next";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import { useSelector } from "react-redux";

export default function MyCommunity() {
  const { myCommunity, isLoading } = useGetMyCommunity();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container page">
      {" "}
      <div className="my-2">
        <RoundedBackButton onClick={() => navigate(-1)}></RoundedBackButton>
      </div>
      <section className="communities-details">
        <div className="communities-image-wrapper">
          <img
            className="communities-image"
            src={
              myCommunity?.image || "/images/dashboard/communities-image.png"
            }
            alt="communities-details"
          />
        </div>

        <div className=" mt-3">
          <div className="row">
            <div className="col-12 p-2">
              <div className="d-flex justify-content-between ">
                <CommunityBio userData={myCommunity?.helper} />
                <CommunityActions community={myCommunity} />
              </div>
            </div>
            <div className="col-12 p-2">
              <CommunityStats community={myCommunity} />
            </div>
            <div className="row p-0">
              <h4 className="chanels">{t("community.channels")}</h4>
              <div className="col-12 col-md-4 p-2">
                <CommunityTabs isMyCommunity={true} />
              </div>
              <div className="col-12 col-md-8 p-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
