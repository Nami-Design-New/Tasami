import { createSlice } from "@reduxjs/toolkit";

export const mockFilteredData = [
  {
    region: "الشرق الأوسط",
    data: {
      subscribers: 15000,
      providers: 450,
      ratio: "3%",
      beneficiaries: 75000,
    },
    subData: [
      {
        country: "السعودية",
        data: {
          subscribers: 8000,
          providers: 250,
          ratio: "3.1%",
          beneficiaries: 40000,
        },
        cities: [
          {
            name: "الرياض",
            subscribers: 3500,
            providers: 120,
            ratio: "3.4%",
            beneficiaries: 17500,
          },
        ],
      },
    ],
  },
];

const initialState = {
  filters: null,
  filteredData: mockFilteredData,
  metrics: [
    { id: 1, name: "  عدد المشتركين الاجمالي " },
    { id: 2, name: "  عدد  مقدمي الخدمات و البرامج الاجمالي  " },
    { id: 3, name: "نسبه  مقدمي الخدمات و البرامج  الي المشتركين" },
    { id: 4, name: "عدد المستفيدين" },
  ],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setFilteredData(state, action) {
      state.filteredData = action.payload;
    },
    setMetrics: (state, action) => {
      state.metrics = action.payload;
    },
    resetFilter(state) {
      state.filters = null;
      state.filteredData = [];
    },
  },
});

export const { setFilters, setFilteredData, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
