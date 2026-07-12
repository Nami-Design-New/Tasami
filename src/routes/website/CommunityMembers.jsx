import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import useGetCommunityMembers from "../../hooks/website/communities/useGetCommunityMembers";
import EmptySection from "../../ui/EmptySection";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";
import AudienceCard from "../../ui/website/platform/audience/AudienceCard";

const getPageMembers = (page) => {
  if (Array.isArray(page?.data)) return page.data;
  if (Array.isArray(page?.data?.data)) return page.data.data;
  if (Array.isArray(page?.data?.members)) return page.data.members;
  if (Array.isArray(page?.members)) return page.members;
  return [];
};

const getMembersTotal = (firstPage, membersCount) =>
  firstPage?.total ??
  firstPage?.data?.total ??
  firstPage?.members_count ??
  firstPage?.data?.members_count ??
  membersCount;

export default function CommunityMembers() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id");
  const {
    communityMembers,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCommunityMembers(userId);

  const allMembers = communityMembers?.pages?.flatMap(getPageMembers) ?? [];
  const membersCount = getMembersTotal(communityMembers?.pages?.[0], allMembers.length);

  return (
    <section className="community-members-page page">
      <div className="container">
        <div className="community-members-header">
          <div className="community-members-title">
            <RoundedBackButton onClick={() => navigate(-1)} />
            <h1>{t("community.membersList")}</h1>
          </div>
          <span>
            {membersCount} {t("community.membersCountLabel")}
          </span>
        </div>

        {!isLoading && allMembers.length === 0 && (
          <EmptySection height="420px" message={t("community.noMembers")} />
        )}

        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          <div className="community-members-list">
            {allMembers.map((member) => (
              <AudienceCard
                key={member?.id || member?.user?.id || member?.user_id}
                data={member}
              />
            ))}
          </div>
        </InfiniteScroll>

        {(isLoading || isFetchingNextPage) && (
          <div className="community-members-list">
            {[1, 2, 3, 4].map((item) => (
              <AudienceCardLoader key={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
