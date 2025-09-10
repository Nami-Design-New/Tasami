import useGetMyCommunity from "../../../hooks/website/communities/useGetMyCommunities";
import CommunityBio from "../../../ui/dash-board/communities-details/CommunityBio";
import CommunityStats from "../../../ui/dash-board/communities-details/CommunityStats";
import CommunityActions from "../../../ui/website/platform/my-community/CommunityActions";

export default function MyCommunity() {
  const { myCommunity, isLoading } = useGetMyCommunity();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="communities-details">
      <div className="communities-image-wrapper">
        <img
          className="communities-image"
          src={myCommunity?.image || "/images/dashboard/communities-image.png"}
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
        </div>
      </div>
    </section>
  );
}
