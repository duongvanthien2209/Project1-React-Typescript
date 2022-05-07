import axiosClient from 'api/apiClient';
import baseUrl from 'constants';
import { LoginPayload, RegisterPayload } from 'features/auth/authSlice';

export const authApi = {
  loginApi(loginData: LoginPayload) {
    console.log('PAYLOAD: ', loginData);
    const url = `${baseUrl}/user/auth/login`;
    return axiosClient.post(url, loginData);
  },

  registerApi(registerData: RegisterPayload) {
    const url = `${baseUrl}/user/auth/register`;
    return axiosClient.post(url, registerData);
  },
};
