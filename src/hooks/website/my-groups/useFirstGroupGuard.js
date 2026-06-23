import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function useFirstGroupGuard(onAllowed) {
  const navigate = useNavigate();
  const hasActiveGroups = useSelector((state) => {
    const activeGroups = state.authRole.user?.active_groups;

    return Array.isArray(activeGroups)
      ? activeGroups.length > 0
      : Number(activeGroups) > 0;
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
