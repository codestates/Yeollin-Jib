import { createSlice } from "@reduxjs/toolkit";
import { IMyPage } from "../types/types";

// 초기 상태값
let initialState: IMyPage = {
  tapName: "내가 쓴 게시글",
};

export const myPageReducer = createSlice({
  name: "myPageReducer",
  initialState,
  reducers: {
    setTapName(state, action) {
      state.tapName = action.payload;
    },
  },
});

export const { setTapName } = myPageReducer.actions;

export default myPageReducer.reducer;
