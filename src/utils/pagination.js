export function getNextPageParam(lastPage) {
  const nextPageUrl = lastPage?.next_page_url;
  if (!nextPageUrl) return undefined;

  return new URL(nextPageUrl).searchParams.get("page") ?? undefined;
}
