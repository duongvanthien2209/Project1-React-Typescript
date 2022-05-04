import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'api/user';
import { AxiosResponse } from 'axios';
import { push } from 'connected-react-router';
import { Response, User } from 'models';
import { toast } from 'react-toastify';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { authActions, LoginPayload, RegisterPayload } from './authSlice';

interface ResponseLogin {
  token: string;
  user: User;
}

interface ResponseRegister {
  message: string;
}

function* handleRegister(payload: RegisterPayload) {
  try {
    const { status, data, error }: Response<ResponseRegister> = yield call(
      authApi.registerApi,
      payload
    );

    if (status === 'success' && data && data.message) {
      toast.success(data.message);
      yield put(authActions.registerSuccess());
      yield put(push('/login'));
    }

    if (status === 'failed' && error && error.message) {
      throw Error(error.message);
    }
  } catch (error: any) {
    if (error.message) toast.error(error.message);
    yield put(authActions.registerFailed());
  }
}

function* handleLogin(payload: LoginPayload) {
  try {
    const { status, data, error }: Response<ResponseLogin> = yield call(
      authApi.loginApi,
      payload
    );

    if (status === 'success' && data && data.token && data.user) {
      const { token, user } = data;
      localStorage.setItem('access_token', token);
      toast.success('Đăng nhập thành công');
      yield put(authActions.loginSuccess(user));
      // Redirect to home
    }

    if (status === 'failed' && error && error.message) {
      throw Error(error.message);
    }
  } catch (error: any) {
    if (error.message) toast.error(error.message);
    yield put(authActions.loginFailed());
  }
}

function* handleLogout() {
  localStorage.removeItem('access_token');
  yield put(authActions.logout);
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout);
    yield fork(handleLogout);
  }
}

function* watchRegisterFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    const action: PayloadAction<RegisterPayload> = yield take(
      authActions.register.type
    );
    if (!isLoggedIn) {
      yield fork(handleRegister, action.payload);
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
  yield fork(watchRegisterFlow);
}
