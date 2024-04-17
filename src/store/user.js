import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //toolkit / createAsyncThunk : axios
import { login } from "../api/user";

export const asyncLogin = createAsyncThunk("user/login", async (data) => {
  const response = await login(data);
  return response.data;
});

const user = createSlice({
  name: "user",
  initialState: {}, // 초기값. user 정보 하나만 가져오기 때문에 {}
  reducers: {
    userSave: (state, action) => {
      return action.payload; // return 값 : state로 들어감
    },
    userLogout: (state, action) => {
      return {}; // return 값 : state로 들어감
    },
  },
  extraReducers: (builder) => {
    // extraReducers : reducers 보다 밑에 위치해 있어야 함
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      // fulfilled : 액션함수(asyncLogin)가 성공했을 때
      console.log(action.payload);

      // redux navigate 시 새로고침 됨 so 로그인 정보는 로컬 스토리지에 저장 필요
      const result = action.payload; // 초기화 state(initialState)에 담김
      localStorage.setItem("token", result.token); // 로그인하는 시점에 담아냄
      localStorage.setItem("user", JSON.stringify(result)); // id와 name값 담겨있는 걸 그대로 사용
      return result;
    });
  },
});

export default user;
export const { userSave, userLogout } = user.actions;
