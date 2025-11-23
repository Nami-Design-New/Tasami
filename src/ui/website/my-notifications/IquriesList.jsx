import { useTranslation } from "react-i18next";
import useGetInquries from "../../../hooks/website/inquiries/useGetInquries";
import EmptySection from "../../EmptySection";
import InfiniteScroll from "../../loading/InfiniteScroll";
import NotificationLoader from "../../loading/NotificationLoader";
import InQuriyCard from "./InQuriyCard";

export default function IquriesList() {
  const { t } = useTranslation();
  const {
    inquries,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInquries();
  const allInquries = inquries?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <div className="notifications-list">
      {" "}
      <div className="row">
        {!isLoading && allInquries.length === 0 && (
          <EmptySection height="500px" message={t("notification.noInquriy")} />
        )}
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allInquries.map((item) => (
            <div className="col-12 p-2" key={item.id}>
              <InQuriyCard item={item} />
            </div>
          ))}{" "}
          {(isLoading || isFetchingNextPage) && (
            <div className="row">
              {[1, 2, 3].map((i) => (
                <div className="col-12 p-2" key={i}>
                  <NotificationLoader />
                </div>
              ))}
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
