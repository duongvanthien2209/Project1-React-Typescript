import axiosClient from 'api/apiClient';
import { AxiosResponse } from 'axios';
import { ResponseCategories } from 'components/Common';
import baseUrl from 'constants';
import { Response } from 'models';

export const categoryApi = {
  url: `${baseUrl}/user/categories`,

  getAllApi() {
    return axiosClient.get<Response<ResponseCategories>>(this.url);
  },
};
