import { useEffect, useRef } from "react";

/**
 * Reusable hook to scroll to a chat message by id
 *
 * @param {Object} params
 * @param {string|number|null} params.targetId
 * @param {Function} params.fetchNextPage
 * @param {boolean} params.hasNextPage
 * @param {Array} params.messages
 * @param {Function} params.onDone
 */
export default function useScrollToMessage({
  targetId,
  fetchNextPage,
  hasNextPage,
  messages,
  onDone,
}) {
  const retryRef = useRef(0);
  const MAX_RETRIES = 10;

  useEffect(() => {
    if (!targetId) return;

    const el = document.querySelector(`[data-message-id="${targetId}"]`);

    // Message found in DOM
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      el.classList.add("highlight-message");

      setTimeout(() => {
        el.classList.remove("highlight-message");
      }, 1500);

      retryRef.current = 0;
      onDone?.();
      return;
    }

    // ❌ Message not found → paginate
    if (hasNextPage && retryRef.current < MAX_RETRIES) {
      retryRef.current += 1;
      fetchNextPage();
    }
  }, [targetId, messages, hasNextPage, fetchNextPage, onDone]);
}
