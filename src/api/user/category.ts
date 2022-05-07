import axiosClient from 'api/apiClient';
import baseUrl from 'constants';

export const categoryApi = {
  url: `${baseUrl}/user/categories`,

  getAllApi() {
    return axiosClient.get(this.url);
  },
};
