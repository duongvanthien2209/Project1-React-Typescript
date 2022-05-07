import axiosClient from 'api/apiClient';
import baseUrl from 'constants';
import { FilterPayload } from 'features/filter/filterSlice';

export const productApi = {
  getAllApi(filterData: FilterPayload) {
    const url = `${baseUrl}/user/products`;
    return axiosClient.post(url, filterData);
  },
};
