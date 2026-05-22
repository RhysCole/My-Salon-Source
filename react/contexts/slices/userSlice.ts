import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserProfile } from "@/Models/types";
import { type RootState } from '@/contexts/store'

interface UserState {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  status: "idle" | "loading" | "succeeded" | "failed" | "initializing";
}


const initialState: UserState = {
  isAuthenticated: true,
  profile: null,
  status: "initializing",
};



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isAuthenticated = true;
      state.profile = action.payload;
      state.status = "idle";
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.profile = null;
      state.status = "idle";
    },
    setLoginLoading: (state) => {
      state.status = "loading";
    },
    setLoginFailed: (state) => {
      state.status = "failed";
    },
    setSessionChecked: (state) => {
        if (state.status === 'initializing') {
            state.status = 'idle'; 
        }
    },
    setSessionInitializing: (state) => {
      state.status = 'initializing';
    },
  },
});

export const { loginSuccess, logout, setLoginLoading, setLoginFailed, setSessionChecked, setSessionInitializing } = userSlice.actions;
export default userSlice.reducer;
export const getSessionInfo = (state: RootState) => state.user.profile;
