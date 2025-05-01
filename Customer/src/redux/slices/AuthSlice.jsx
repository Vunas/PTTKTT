import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false, // Mặc định chưa đăng nhập
  user: null,        // Lưu thông tin người dùng (nếu có)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload; // Lưu thông tin user
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;