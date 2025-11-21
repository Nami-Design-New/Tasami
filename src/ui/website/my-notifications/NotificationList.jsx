import { useTranslation } from "react-i18next";
import useDeleteAllNotifications from "../../../hooks/website/notification/useDeleteAllNotifications";
import CustomButton from "../../CustomButton";
import NotificationCard from "./NotificationCard";
import { useQueryClient } from "@tanstack/react-query";
import useGetNotifications from "../../../hooks/website/notification/useGetNotifications";
import InfiniteScroll from "../../loading/InfiniteScroll";
import EmptySection from "../../EmptySection";
import NotificationLoader from "../../loading/NotificationLoader";
import { useSearchParams } from "react-router";
import InputField from "../../forms/InputField";
import { useEffect, useState } from "react";

export default function NotificationList() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );
  const queryClient = useQueryClient();
  const {
    notifications,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetNotifications();

  console.log("is loading", isLoading);

  const allNotifications =
    notifications?.pages?.flatMap((page) => page?.data) ?? [];
  // Debounce input before updating search params
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (inputValue.trim()) {
          params.set("search", inputValue.trim());
        } else {
          params.delete("search");
        }
        return params;
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, setSearchParams]);
  const { deleteAllNotifications, isPending } = useDeleteAllNotifications();
  const handleDeleteAllNotifications = () => {
    deleteAllNotifications(null, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["notifications"],
        });
      },
    });
  };
  return (
    <div className="notifications-list">
      {" "}
      {/* Search */}
      <div className="form_ui my-2">
        <InputField
          placeholder={t("notification.search")}
          icon="/icons/search.svg"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <h2>{t("notification.latest")}</h2>
        {allNotifications?.length > 0 && (
          <CustomButton
            color="fire"
            onClick={handleDeleteAllNotifications}
            loading={isPending}
          >
            {t("deleteAll")}{" "}
          </CustomButton>
        )}
      </div>{" "}
      <>
        {!isLoading && allNotifications.length === 0 && (
          <EmptySection height="500px" message={t("notification.empty")} />
        )}

        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allNotifications.map((item) => (
            <NotificationCard item={item} key={item.id} />
          ))}
        </InfiniteScroll>

        {(isLoading || isFetchingNextPage) && (
          <div className="row">
            {[1, 2, 3].map((i) => (
              <div className="col-12 p-2" key={i}>
                <NotificationLoader />
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  );
}
