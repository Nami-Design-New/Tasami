export const refreshCommunityIndicatorQueries = (
  queryClient,
  communityId,
) => {
  const communityQueryKey = communityId
    ? ["community-details", communityId]
    : ["my-community"];

  void Promise.allSettled([
    queryClient.invalidateQueries({ queryKey: communityQueryKey }),
    queryClient.invalidateQueries({ queryKey: ["my-communities"] }),
    queryClient.invalidateQueries({ queryKey: ["counters-notify"] }),
  ]);
};
