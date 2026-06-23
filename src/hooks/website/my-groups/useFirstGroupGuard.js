import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getActiveGroupsCount } from "../../../utils/groupLimits";

export default function useFirstGroupGuard(onAllowed) {
  const navigate = useNavigate();
  const hasActiveGroups = useSelector((state) => {
    return getActiveGroupsCount(state.authRole.user) > 0;
  });
  const [showFirstGroupWarning, setShowFirstGroupWarning] = useState(false);

  const requestAssistanceCreation = () => {
    if (hasActiveGroups) {
      onAllowed();
      return;
    }

    setShowFirstGroupWarning(true);
  };

  const createFirstGroup = () => {
    setShowFirstGroupWarning(false);
    navigate("/my-platform/my-groups", {
      state: { openCreateGroup: true },
    });
  };

  return {
    requestAssistanceCreation,
    showFirstGroupWarning,
    closeFirstGroupWarning: () => setShowFirstGroupWarning(false),
    createFirstGroup,
  };
}
