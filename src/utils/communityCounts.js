export function getCommunityCount(...values) {
  const count = values
    .map(Number)
    .find((value) => Number.isFinite(value) && value > 0);

  return count ? Math.floor(count) : 0;
}
