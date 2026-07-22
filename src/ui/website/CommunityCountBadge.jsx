import { getCommunityCount } from "../../utils/communityCounts";

export default function CommunityCountBadge({ count, className = "" }) {
  const normalizedCount = getCommunityCount(count);

  if (normalizedCount === 0) return null;

  return (
    <span className={`community-count-badge ${className}`.trim()}>
      {normalizedCount > 99 ? "99+" : normalizedCount}
    </span>
  );
}
