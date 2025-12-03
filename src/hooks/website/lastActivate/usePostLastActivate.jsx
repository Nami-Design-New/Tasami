// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../../../lib/axios";

// export default function usePostLastActivate() {
//   useQuery({
//     queryKey: ["last-activate"],
//     queryFn: async () => {
//       const res = await axiosInstance.post("last-activate");
//       return res.data;
//     },

//     // اجعل البيانات "طازجة" لمدة 24 ساعة → لن يعيد الجلب أبداً خلال 24 ساعة
//     staleTime: 24 * 60 * 60 * 1000,

//     // احتفظ بالنتائج في الكاش 24 ساعة → لا يعيد الجلب إلا بعدها
//     cacheTime: 24 * 60 * 60 * 1000,

//     refetchOnWindowFocus: false,
//   });
// }

import { useEffect } from "react";
import { axiosInstance } from "../../../lib/axios";

export default function usePostLastActivate() {
  useEffect(() => {
    const LAST_CALL_KEY = "lastActivateCallAt";
    const lastCallTime = localStorage.getItem(LAST_CALL_KEY);
    const now = Date.now();

    // لو تم استدعاؤه قبل أقل من 24 ساعة → لا تعمل طلب
    if (lastCallTime && now - Number(lastCallTime) < 24 * 60 * 60 * 1000) {
      return;
    }

    // لو مر 24 ساعة → نفّذ الطلب مرة واحدة
    axiosInstance.post("last-activate").finally(() => {
      localStorage.setItem(LAST_CALL_KEY, now.toString());
    });
  }, []);
}
