export const getMeetingNotificationUrl = (notification) => {
  const meetingId = notification?.operation_id;
  const communityId = notification?.community_id;

  return meetingId && communityId
    ? `/community/${communityId}/meetings?meeting_id=${meetingId}`
    : "/notifications";
};
