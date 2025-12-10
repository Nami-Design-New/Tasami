import * as yup from "yup";

export const performanceFilterSchema = yup
  .object()
  .shape({
    region: yup.string().required("الرجاء اختيار الإقليم"),
    country: yup.string().nullable(),
    city: yup.string().nullable(),
    fromDate: yup.string().required("يرجى اختيار تاريخ البداية"),
    toDate: yup.string().required("يرجى اختيار تاريخ النهاية"),
    metrics: yup
      .array()
      .min(1, "يرجى اختيار مؤشر واحد على الأقل")
      .of(yup.number()),
    showSubData: yup.boolean(),
  })
  .test("valid-hierarchy", "تسلسل غير صحيح في التصفية", function (values) {
    const { region, country, city } = values || {};

    if (city && !country) {
      return this.createError({
        path: "city",
        message: "اختر الدولة قبل اختيار المدينة",
      });
    }

    return true;
  })
  .test("valid-dates", "تاريخ النهاية يجب أن يكون بعد تاريخ البداية", function (values) {
    const { fromDate, toDate } = values || {};

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);

      if (to < from) {
        return this.createError({
          path: "toDate",
          message: "تاريخ النهاية يجب أن يكون بعد تاريخ البداية",
        });
      }
    }

    return true;
  });