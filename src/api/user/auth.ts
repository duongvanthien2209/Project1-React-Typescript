import axiosClient from 'api/apiClient';
import { LoginPayload } from 'features/auth/authSlice';
import { User } from 'models';

const baseURL = '/user/auth';

const userAuthApi = {
  login(data: LoginPayload) {
    const url = `${baseURL}/login`;
    return axiosClient.post(url, data);
  },

  register(data: User) {
    const url = `${baseURL}/register`;
    return axiosClient.post(url, data);
  },
};

export default userAuthApi;
