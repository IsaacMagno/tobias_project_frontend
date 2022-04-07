import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: [],
    logged: false,
    token: "",
    phrase: "",
  },
  reducers: {
    setUser(state, { payload }) {
      return { ...state, user: payload };
    },
    setLoggin(state, { payload }) {
      return { ...state, logged: payload };
    },
    setToken(state, { payload }) {
      return { ...state, token: payload };
    },
    setPhrase(state, { payload }) {
      return { ...state, phrase: payload };
    },
  },
});

export const { setUser, setLoggin, setToken, setPhrase } = userSlice.actions;

export default userSlice.reducer;
