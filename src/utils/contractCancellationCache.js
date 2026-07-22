const DEFERRED_QUERY_KEYS = [
  ["assistants"],
  ["work-group"],
  ["work-details"],
  ["contract-details"],
];

const LIST_QUERY_KEYS = [["my-works"], ["my-contracts"]];

export function refreshAfterContractCancellation(queryClient) {
  return Promise.all([
    ...DEFERRED_QUERY_KEYS.map((queryKey) =>
      queryClient.invalidateQueries({ queryKey, refetchType: "none" }),
    ),
    ...LIST_QUERY_KEYS.map((queryKey) =>
      queryClient.invalidateQueries({ queryKey }),
    ),
  ]);
}
