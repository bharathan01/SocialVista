
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isUserLoggedIn: false,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userInfo = action.payload;
      state.isUserLoggedIn = true;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.isUserLoggedIn = false;
    },
  },
});

export const { loginUser, logoutUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;

