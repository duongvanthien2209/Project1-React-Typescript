import { PayloadAction } from '@reduxjs/toolkit';
import { productApi } from 'api/user';
import { Product, Response } from 'models';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { filterActions, FilterPayload } from './filterSlice';

export interface ResponseProduct {
  products: Product[];
  total: number;
}

function* handleChangeCategory(action: PayloadAction<string>) {
  try {
    const filterData: FilterPayload = { categoryId: action.payload };

    const { status, data, error }: Response<ResponseProduct> = yield call(
      productApi.getAllApi,
      filterData
    );

    if (status === 'success' && data) {
      yield put(filterActions.responseProductsSuccess(data));
    }

    if (status === 'failed' && error && error.message) {
      throw Error(error.message);
    }
  } catch (error: any) {
    if (error.message) toast.error(error.message);
    yield put(filterActions.changeCategoryFailed());
  }
}

function* handleSearch(action: PayloadAction<FilterPayload>) {
  try {
    const { status, data, error }: Response<ResponseProduct> = yield call(
      productApi.getAllApi,
      action.payload
    );

    if (status === 'success' && data) {
      yield put(filterActions.responseProductsSuccess(data));
    }

    if (status === 'failed' && error && error.message) {
      throw Error(error.message);
    }
  } catch (error: any) {
    if (error.message) toast.error(error.message);
    yield put(filterActions.searchFailed());
  }
}

function* handleChangePage(action: PayloadAction<FilterPayload>) {
  try {
    const { status, data, error }: Response<ResponseProduct> = yield call(
      productApi.getAllApi,
      action.payload
    );

    if (status === 'success' && data) {
      yield put(filterActions.responseProductsSuccess(data));
    }

    if (status === 'failed' && error && error.message) {
      throw Error(error.message);
    }
  } catch (error: any) {
    if (error.message) toast.error(error.message);
    yield put(filterActions.changePageFailed());
  }
}

export function* filterSaga() {
  yield takeLatest(filterActions.changeCategory.type, handleChangeCategory);
  yield takeLatest(filterActions.search.type, handleSearch);
  yield takeLatest(filterActions.changePage.type, handleChangePage);
}
