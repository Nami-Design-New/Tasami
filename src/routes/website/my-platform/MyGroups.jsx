import { useTranslation } from "react-i18next";
import ExpDocItemLoader from "../../../ui/loading/ExpDocItemLoader";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import GroupList from "../../../ui/website/platform/groups/GroupList";
import CustomButton from "../../../ui/CustomButton";
import { useEffect, useState } from "react";
import AddGroupModal from "../../../ui/website/platform/groups/AddGroupModal";
import useGetMyGroups from "../../../hooks/website/my-groups/useGetMyGroups";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import GroupLimitReachedModal from "../../../ui/website/platform/groups/GroupLimitReachedModal";
import { hasReachedGroupLimit as checkGroupLimit } from "../../../utils/groupLimits";

export default function MyGroups() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const hasReachedGroupLimit = useSelector((state) =>
    checkGroupLimit(state.authRole.user),
  );
  const {
    myGroups,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyGroups("on");

  const allGroups = myGroups?.pages?.flatMap((page) => page?.data) ?? [];
  const [showAddGroupModal, setShowAddGroupModal] = useState(
    () =>
      location.state?.openCreateGroup === true && !hasReachedGroupLimit,
  );
  const [showGroupLimitModal, setShowGroupLimitModal] = useState(
    () => location.state?.openCreateGroup === true && hasReachedGroupLimit,
  );

  const handleCreateGroup = () => {
    if (hasReachedGroupLimit) {
      setShowGroupLimitModal(true);
      return;
    }

    setShowAddGroupModal(true);
  };

  useEffect(() => {
    if (!location.state?.openCreateGroup) return;

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  return (
    <>
      <section
        className="groups__section position-relative  "
        aria-labelledby="experience-title"
      >
        <div className="position-sticky top-0 z-3 d-flex justify-content-end">
          <CustomButton onClick={handleCreateGroup} size="large">
            {t("website.platform.groups.addNew")}{" "}
          </CustomButton>
        </div>
        {/* Empty state */}
        {!isLoading && allGroups.length === 0 && (
          <div className="empty-data h-100">
            <p>{t("website.platform.groups.noGroups")}</p>
          </div>
        )}

        {/* Data list */}
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          <GroupList allGroups={allGroups} />
        </InfiniteScroll>

        {/* Fetching next page indicator */}
        {(isLoading || isFetchingNextPage) && <ExpDocItemLoader />}
      </section>

      <AddGroupModal
        setShowModal={setShowAddGroupModal}
        showModal={showAddGroupModal}
      />
      <GroupLimitReachedModal
        showModal={showGroupLimitModal}
        onClose={() => setShowGroupLimitModal(false)}
      />
    </>
  );
}
