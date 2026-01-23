export const notificationsFilterConfig = {
  system_type: {
    type: "select",
    options: [
      { value: "outside", label: "outSide" },
      { value: "internal", label: "internal" },
    ],
  },
  system_type_id: {
    type: "select", 
    options: [
      { value: 1, label: "outSide" },
      { value: 2, label: "internal" },
    ],
  },
  date: {
    type: "date",
  },
  country: {
    type: "select",
    options: [
      { value: "11", label: "مصر" },
      { value: "12", label: "السعودية" },
    ],
  },
  city: {
    type: "select",
    options: [
      { value: "18", label: "القاهرة" },
      { value: "19", label: "الرياض" },
    ],
  },
 
};
 const notificationsFilterConfig = {
    system_type: {
      id: "system_type",
      type: "select",
      label: { en: "System Type" },
      options: systemTypes,
      getLabel: (o) => o.title,
      getValue: (o) => o.id,
    },
    system_type_id: {
      id: "system_type_id",
      type: "select",
      label: { en: "System Type ID" },
      options: subjects.map((sub) => ({
        id: sub?.id,
        value: sub?.id,
        label: sub?.title,
      })),
      getLabel: (o) => o.title,
      getValue: (o) => o.id,
    },
    package_id: {
      id: "package_id",
      type: "select",
      label: { en: "Package" },
      options: packages,
      getLabel: (o) => o.title,
      getValue: (o) => o.id,
    },
    region_id: {
      id: "region_id",
      type: "select",
      label: { en: "Region" },
      options: regions,
      getLabel: (o) => o.title,
      getValue: (o) => o.id,
    },
    country_id: {
      id: "country_id",
      type: "select",
      label: { en: "Country" },
      options: countries,
      getLabel: (o) => o.title,
      getValue: (o) => o.id,
    },
    city_id: {
      id: "city_id",
      type: "select",
      label: { en: "City" },
      options: cities,
      getLabel: (o) => o.title,
      getValue: (o) => o.id,
    },
    from_date: { id: "from_date", type: "date", label: { en: "From Date" } },
    to_date: { id: "to_date", type: "date", label: { en: "To Date" } },
  };