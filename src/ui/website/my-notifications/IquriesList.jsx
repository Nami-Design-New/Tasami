import { useTranslation } from "react-i18next";
import useGetInquries from "../../../hooks/website/inquiries/useGetInquries";
import EmptySection from "../../EmptySection";
import InfiniteScroll from "../../loading/InfiniteScroll";
import NotificationLoader from "../../loading/NotificationLoader";
import InQuriyCard from "./InQuriyCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import InputField from "../../forms/InputField";
import searchIcon from "../../../assets/icons/search.svg";

export default function IquriesList() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );
  const {
    inquries,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInquries();
  const allInquries = inquries?.pages?.flatMap((page) => page?.data) ?? [];
  const firstPage = inquries?.pages?.[0];
  const totalInquries = firstPage?.total;

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

  return (
    <div className="notifications-list">
      <div className="inquries-toolbar">
        <div className="form_ui d-flex align-items-center gap-2">
          <h2>
            <span>{totalInquries}</span> {t("notification.tab_inquiries")}
          </h2>
          <InputField
            placeholder={t("notification.inquriesSearch")}
            icon={searchIcon}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </div>
      </div>
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
