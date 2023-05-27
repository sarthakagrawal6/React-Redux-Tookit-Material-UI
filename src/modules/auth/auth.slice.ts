import { createSlice } from "@reduxjs/toolkit";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}
interface Auth {
  user: User | null;
  token: string | null;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  } as Auth,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        firstName: "Sarthak",
        lastName: "Agrawal",
        email: "sarthak@yopmail.com",
      };
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state: Auth) => state.user;
export const selectToken = (state: Auth) => state.token;

export default authSlice.reducer;
