import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models';

export interface LoginPayload {
  phoneNumber: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  isLogging?: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLogging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.isLogging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.isLogging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state) {
      state.isLogging = false;
    },

    logOut(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },

    register(state, action: PayloadAction<User>) {
      state.isLogging = true;
    },
    registerSuccess(state) {
      state.isLogging = false;
    },
    registerFailed(state) {
      state.isLogging = false;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
