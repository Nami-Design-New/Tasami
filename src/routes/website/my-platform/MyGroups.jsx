
import { useTranslation } from "react-i18next";
import ExpDocItemLoader from "../../../ui/loading/ExpDocItemLoader";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import GroupList from "../../../ui/website/platform/groups/GroupList";
import CustomButton from "../../../ui/CustomButton";
import { useEffect, useRef, useState } from "react";
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

  const user = useSelector((state) => state.authRole.user);
  const hasReachedGroupLimit = checkGroupLimit(user);

  const {
    myGroups,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyGroups("on");

  const allGroups = myGroups?.pages?.flatMap((page) => page?.data) ?? [];

  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showGroupLimitModal, setShowGroupLimitModal] = useState(false);

  const handledOpenCreateGroupRef = useRef(false);

  const handleCreateGroup = () => {
    if (hasReachedGroupLimit) {
      setShowGroupLimitModal(true);
      return;
    }

    setShowAddGroupModal(true);
  };

  useEffect(() => {
    const shouldOpenCreateGroup = location.state?.openCreateGroup === true;

    if (!user || !shouldOpenCreateGroup || handledOpenCreateGroupRef.current) {
      return;
    }

    handledOpenCreateGroupRef.current = true;

    if (hasReachedGroupLimit) {
      setShowGroupLimitModal(true);
    } else {
      setShowAddGroupModal(true);
    }

    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [
    user,
    hasReachedGroupLimit,
    location.state?.openCreateGroup,
    location.pathname,
    navigate,
  ]);

  return (
    <>
      <section
        className="groups__section position-relative"
        aria-labelledby="experience-title"
      >
        <div className="position-sticky top-0 z-3 d-flex justify-content-end">
          <CustomButton onClick={handleCreateGroup} size="large">
            {t("website.platform.groups.addNew")}
          </CustomButton>
        </div>

        {!isLoading && allGroups.length === 0 && (
          <div className="empty-data h-100">
            <p>{t("website.platform.groups.noGroups")}</p>
          </div>
        )}

        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          <GroupList allGroups={allGroups} />
        </InfiniteScroll>

        {(isLoading || isFetchingNextPage) && <ExpDocItemLoader />}
      </section>

      <AddGroupModal
        showModal={showAddGroupModal}
        setShowModal={setShowAddGroupModal}
      />

      <GroupLimitReachedModal
        showModal={showGroupLimitModal}
        onClose={() => setShowGroupLimitModal(false)}
      />
    </>
  );
}
