import { createSlice } from "@reduxjs/toolkit";
import { IisMine } from "../types/types";

// 초기 상태값
let initialState: IisMine = {
  isMine: false,
};

export const isMineReducer = createSlice({
  name: "isMineReducer",
  initialState,
  reducers: {
    isMineTrue(state) {
      state.isMine = true;
    },
    isMineFalse(state) {
      state.isMine = false;
    },
  },
});
export const { isMineTrue, isMineFalse } = isMineReducer.actions;
export default isMineReducer.reducer;
