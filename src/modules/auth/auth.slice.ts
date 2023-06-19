import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

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
    setUser: (state, { payload }: { payload: User }) => {
      state.user = {
        ...payload,
      };
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
