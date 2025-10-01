import { useTranslation } from "react-i18next";
import ExpDocItemLoader from "../../../ui/loading/ExpDocItemLoader";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import GroupList from "../../../ui/website/platform/groups/GroupList";
import CustomButton from "../../../ui/CustomButton";
import { useState } from "react";
import AddGroupModal from "../../../ui/website/platform/groups/AddGroupModal";
import useGetMyGroups from "../../../hooks/website/my-groups/useGetMyGroups";

export default function MyGroups() {
  const { t } = useTranslation();
  const {
    myGroups,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyGroups("on");

  const allGroups = myGroups?.pages?.flatMap((page) => page?.data) ?? [];
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  return (
    <>
      <section
        className="groups__section position-relative  "
        aria-labelledby="experience-title"
      >
        <div className="position-sticky top-0 z-3 d-flex justify-content-end">
          <CustomButton onClick={() => setShowAddGroupModal(true)} size="large">
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
    </>
  );
}
