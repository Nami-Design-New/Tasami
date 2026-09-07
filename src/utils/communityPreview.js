export const COMMUNITY_PREVIEW_LIMIT = 3;

export function getCommunityPreviewItems(items = [], isMember = true) {
  return isMember ? items : items.slice(0, COMMUNITY_PREVIEW_LIMIT);
}

export function isCommunityPreviewItemBlurred(index, isMember = true) {
  return !isMember && index === COMMUNITY_PREVIEW_LIMIT - 1;
}
