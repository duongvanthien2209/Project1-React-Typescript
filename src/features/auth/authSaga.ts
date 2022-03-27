import { PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models';
import { call, fork, put, take } from 'redux-saga/effects';
import { authActions } from './authSlice';
import { LoginPayload } from './authSlice';
import userAuthApi from 'api/user/auth';
import { AxiosResponse } from 'axios';
import { Response } from 'models/response';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';

function* handleLogout() {
  localStorage.removeItem('access_token');
  yield put(push('/login'));
}

function* handleLogin(payload: LoginPayload) {
  try {
    const { data }: AxiosResponse = yield call(userAuthApi.login, payload);
    let { status, data: currentData, error }: Response<{ token: string; user: User }> = data;

    if (status === 'success' && currentData && currentData.user) {
      yield put(authActions.loginSuccess(currentData.user));
      toast.success('Đăng nhập thành công');
      if (currentData.user.role === 'user') yield put(push('/'));
      if (currentData.user.role === 'admin') yield put(push('/admin'));
    }

    if (status === 'failed' && error) {
      yield put(authActions.loginFailed());
      toast.error(error.message);
    }
  } catch (error: any) {
    yield put(authActions.loginFailed());
    toast.error(error.message);
  }
}

function* handleRegister(payload: User) {
  try {
    const { data }: AxiosResponse = yield call(userAuthApi.register, payload);
    let { status, data: currentData, error }: Response<{ message: string }> = data;

    if (status === 'success' && currentData) {
      yield put(authActions.registerSuccess());
      toast.success(currentData.message);
      yield put(push('/login'));
    }

    if (status === 'failed' && error) {
      yield put(authActions.registerFailed());
      toast.error(error.message);
    }
  } catch (error: any) {
    yield put(authActions.registerFailed());
    toast.error(error.message);
  }
}

function* loginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logOut);
    yield call(handleLogout); // Blocking
  }
}

function* registerFlow() {
  while (true) {
    const action: PayloadAction<User> = yield take(authActions.register.type);
    yield fork(handleRegister, action.payload);
  }
}

export function* authSaga() {
  yield fork(loginFlow);
  yield fork(registerFlow);
}
