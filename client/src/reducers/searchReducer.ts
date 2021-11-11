import { createSlice } from "@reduxjs/toolkit";
import { ISearch } from "../types/types";

// 초기 상태값
let initialState: ISearch = {
  search: "",
};

export const searchReducer = createSlice({
  name: "searchReducer",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = searchReducer.actions;

export default searchReducer.reducer;
