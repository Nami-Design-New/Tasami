import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./providers/router";

import i18n from "./utils/i18n";
import useNetworkStatus from "./hooks/shared/useNetworkStatus";
import OfflineBanner from "./ui/common/OfflineBanner";

export default function App() {
  const isOnline = useNetworkStatus();

  const lang = useSelector((state) => state.language.lang);
  useEffect(() => {
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <>
      {" "}
      {!isOnline ? (
        <OfflineBanner onRetry={() => window.location.reload()} />
      ) : (
        <>
          {" "}
          <Toaster
            expand={false}
            duration={2000}
            richColors
            position="bottom-right"
          />
          <RouterProvider router={router} />
        </>
      )}
    </>
  );
}
// import { useEffect, useRef } from "react"; // 1. Added useRef
// import { useSelector } from "react-redux";
// import { RouterProvider } from "react-router";
// import { Toaster, toast } from "sonner"; // 2. Added toast from sonner
// import { router } from "./providers/router";

// import i18n from "./utils/i18n";
// import useNetworkStatus from "./hooks/shared/useNetworkStatus";
// import OfflineBanner from "./ui/common/OfflineBanner";

// export default function App() {
//   const isOnline = useNetworkStatus();
//   const lang = useSelector((state) => state.language.lang);

//   // 3. Select the level from your Redux state
//   const level = useSelector((state) => state.user.level);
//   const prevLevelRef = useRef(level);

//   // Language Effect
//   useEffect(() => {
//     const body = document.querySelector("body");
//     lang === "en" ? body.classList.add("en") : body.classList.remove("en");
//     i18n.changeLanguage(lang);
//   }, [lang]);

//   // 4. Level Up Effect
//   useEffect(() => {
//     // Only show toast if level exists and is higher than the previous level
//     if (prevLevelRef.current !== undefined && level > prevLevelRef.current) {
//       toast.success(`🎉 Congratulations! You reached Level ${level}!`, {
//         description: "Keep up the great work!",
//       });
//     }
//     // Sync the ref with the current level
//     prevLevelRef.current = level;
//   }, [level]);

//   return (
//     <>
//       {!isOnline ? (
//         <OfflineBanner onRetry={() => window.location.reload()} />
//       ) : (
//         <>
//           <Toaster
//             expand={false}
//             duration={3000}
//             richColors
//             position="bottom-right"
//           />
//           <RouterProvider router={router} />
//         </>
//       )}
//     </>
//   );
// }
