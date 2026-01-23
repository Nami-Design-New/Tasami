export const notificationsColumns = [
  {
    accessorKey: "reference_number",
    id: "reference_number",
    header: "Reference",
    cell: ({ getValue }) => getValue(),
    enableSorting: true,
    enableFiltering: true,
  },
  {
    accessorKey: "id_number",
    id: "id_number",
    header: "ID Number",
    enableFiltering: true,
  },
  {
    accessorKey: "date",
    id: "date",
    header: "Date",
    enableSorting: true,
    enableFiltering: true,
  },
  {
    accessorKey: "time",
    id: "time",
    header: "Time",
  },
  {
    id: "country",
    header: "Country",
    cell: ({ row }) => row.original.country?.title || "-",
    enableFiltering: true,
  },
  {
    id: "city",
    header: "City",
    cell: ({ row }) => row.original.city?.title || "-",
    enableFiltering: true,
  },
  {
    id: "system_type",
    header: "Type",
    cell: ({ row }) => row.original.system_type?.title || "-",
    enableFiltering: true,
  },
];
