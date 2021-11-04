import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginState, ILoginPayLoad, ILogin } from "../types/types";

// axios.post 요청(login)
export const setAuth = createAsyncThunk(
  "authReducer/setAuth",
  async ({ email, password }: ILogin) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/user/login`,
      { email: email, password: password },
      {
        withCredentials: true,
      }
    );
  }
);

// 초기 상태값
let initialState: ILoginState = {
  isLogin: false,
  isInValid: false,
  accessToken: "",
};

export const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setLogOut(state) {
      state.isLogin = false;
      state.accessToken = "";
    },
    setSocialLogin(state, action) {
      state.isLogin = true;
      state.isInValid = false;
      state.accessToken = action.payload;
    },
  },
  extraReducers: {
    // pending 상태
    [setAuth.pending.type]: (state) => {
      state.isLogin = false;
      state.isInValid = false;
      state.accessToken = "";
    },
    // fulfilled 상태
    [setAuth.fulfilled.type]: (state, action: ILoginPayLoad) => {
      state.isLogin = true;
      state.isInValid = false;
      state.accessToken = action.payload.data.accessToken;
    },
    // rejected 상태
    [setAuth.rejected.type]: (state) => {
      state.isLogin = false;
      state.isInValid = true;
      state.accessToken = "";
    },
  },
});

export const { setLogOut, setSocialLogin } = authReducer.actions;

export default authReducer.reducer;
