import React from "react";
import useGetCommunityDetails from "../../../../hooks/website/communities/useGetCommunityDetails";
import Loading from "../../../loading/Loading";
import CommunityBio from "../../../dash-board/communities-details/CommunityBio";
import CommunityActions from "../../platform/my-community/CommunityActions";
import CommunityStats from "../../../dash-board/communities-details/CommunityStats";

export default function CommunityDetails() {
  const { communityDetails, isLoading } = useGetCommunityDetails();

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
      </section>
    </div>
  );
}
