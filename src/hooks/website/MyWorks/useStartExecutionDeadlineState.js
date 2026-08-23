import { useEffect, useMemo, useState } from "react";

import { getStartExecutionDeadlineState } from "../../../utils/startExecutionDeadline";

const COUNTDOWN_INTERVAL_MS = 60 * 1000;

export default function useStartExecutionDeadlineState(item) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, COUNTDOWN_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return useMemo(
    () => getStartExecutionDeadlineState(item, { now }),
    [item, now],
  );
}
