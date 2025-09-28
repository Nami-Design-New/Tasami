import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useGetPersonalAssistants from "../../hooks/website/personal-assistants/useGetPersonalAssistants";
import EmptySection from "../../ui/EmptySection";
import HelperCard from "../../ui/cards/HelperCard";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import AssistantsSidebar from "../../ui/website/helpers/AssistantsSidebar";

export default function PersonalHelper() {
  const { t } = useTranslation();
  const {
    assistantsData,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPersonalAssistants();

  const allAssistants =
    assistantsData?.pages?.flatMap((page) => page?.data) ?? [];

  return (
    <section className="personal-helpers page">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="section-header">
              <div className="page-header">
                {
                  <Link to="/" className="back-btn">
                    <i className="fa-solid fa-angle-right"></i>
                  </Link>
                }
                <h1> {t("website.assistants.personalAssistants")} </h1>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 p-2">
            <AssistantsSidebar />
          </div>
          <div className="col-12 col-lg-9 p-2">
            <div className="row">
              <div className="col-12 p-2">
                <div className="result-count">
                  <strong>{allAssistants.length}</strong>{" "}
                  {t("website.assistants.personalAssistant")}
                </div>
              </div>
              {!isLoading && allAssistants.length === 0 && (
                <EmptySection
                  height="300px"
                  message={t("website.assistants.noPersonalAssistants")}
                />
              )}
              <InfiniteScroll
                onLoadMore={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              >
                {allAssistants.map((helper) => (
                  <div className="col-12 col-md-6 col-xl-4 p-2" key={helper.id}>
                    <HelperCard helper={helper} />
                  </div>
                ))}{" "}
                {(isLoading || isFetchingNextPage) && (
                  <>
                    {[1, 2, 3].map((i) => (
                      <div className="col-12 col-md-6 col-xl-4 p-2" key={i}>
                        <AudienceCardLoader />
                      </div>
                    ))}
                  </>
                )}
              </InfiniteScroll>{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
