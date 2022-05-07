import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models';

export interface LoginPayload {
  phoneNumber: string;
  password: string;
}

export type RegisterPayload = LoginPayload & {
  firstName: string;
  lastName: string;
};

export interface AuthState {
  isLoggedIn: boolean;
  isLoading?: boolean;
  currentUser?: User;
}

// InitialState
const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  currentUser: undefined,
};

const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    loginFailed(state) {
      state.isLoading = false;
    },

    register(state, action: PayloadAction<RegisterPayload>) {
      state.isLoading = true;
    },
    registerSuccess(state) {
      state.isLoading = false;
    },
    registerFailed(state) {
      state.isLoading = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const authActions = authSlide.actions;

// Selectors
export const getIsLoggedIn = (state: any) => state.auth.isLoggedIn;

// Reducer
const authReducer = authSlide.reducer;

export default authReducer;
