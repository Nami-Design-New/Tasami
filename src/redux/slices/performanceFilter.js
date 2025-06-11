import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: null,
  filteredData: [],
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
