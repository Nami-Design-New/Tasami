import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useGetGoals from "../../hooks/website/goals/useGetGoals";
import GoalCard from "../../ui/cards/GoalCard";
import EmptySection from "../../ui/EmptySection";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import AssistantsSidebar from "../../ui/website/helpers/AssistantsSidebar";
export default function PersonalGoals() {
  const { t } = useTranslation();
  const { goals, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetGoals();
  const allGoals = goals?.pages?.flatMap((page) => page?.data) ?? [];
  return (
    <section className="personal-helpers page">
      <div className="container">
        <div className="row">
          {" "}
          <div className="col-12 p-2">
            <div className="section-header">
              <div className="page-header ">
                {
                  <Link to="/" className="back-btn">
                    <i className="fa-solid fa-angle-right"></i>
                  </Link>
                }
                <h1> {t("website.assistants.goals")} </h1>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-12 p-2">
            <AssistantsSidebar isGoal={true} />
          </div>{" "}
          <div className="col-12 col-lg-9 p-2">
            <div className="row">
              <div className="col-12 p-2">
                <div className="result-count ">
                  <strong>{allGoals.length}</strong>{" "}
                  {t("website.assistants.goal")}
                </div>
              </div>{" "}
              {!isLoading && allGoals.length === 0 && (
                <EmptySection
                  height="300px"
                  message={t("website.assistants.noPersonalAssistants")}
                />
              )}{" "}
              <InfiniteScroll
                onLoadMore={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              >
                {allGoals.map((goal) => (
                  <div className="col-12 col-md-6 col-xl-4 p-2" key={goal.id}>
                    <GoalCard goal={goal} />
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
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
