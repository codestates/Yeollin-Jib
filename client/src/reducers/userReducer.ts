import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserState, IUserPayLoad } from "../types/types";

export const setUser = createAsyncThunk(
  "userReducer/setUser",
  async (accessToken: string) => {
    try {
      return await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
);

// 초기 상태값
let initialState: IUserState = {
  id: 0,
  email: "",
  nickname: "",
  userArea: "",
  imagePath: "",
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: {
    // pending 상태
    [setUser.pending.type]: (state) => {
      state.id = 0;
      state.email = "";
      state.nickname = "";
      state.userArea = "";
      state.imagePath = "";
    },
    // fulfilled 상태
    [setUser.fulfilled.type]: (state, action: IUserPayLoad) => {
      state.id = action.payload.data.id;
      state.email = action.payload.data.email;
      state.nickname = action.payload.data.nickname;
      state.userArea = action.payload.data.userArea;
      state.imagePath = action.payload.data.imagePath;
    },
    // rejected 상태
    [setUser.rejected.type]: (state) => {
      state.id = 0;
      state.email = "";
      state.nickname = "";
      state.userArea = "";
      state.imagePath = "";
    },
  },
});

export default userReducer.reducer;
