import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'models';
import { ResponseProduct } from './filterSaga';

export interface FilterPayload {
  isLoading?: boolean;
  categoryId?: string;
  q?: string;
  _page?: number;
  total?: number;
  products?: Product[];
}

export type FilterState = Required<FilterPayload>;

const initialState: FilterState = {
  isLoading: false,
  categoryId: '',
  q: '',
  _page: 0,
  total: 0,
  products: [],
};

const filterSlide = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    responseProductsSuccess(state, action: PayloadAction<ResponseProduct>) {
      const { total, products }: ResponseProduct = action.payload;
      state.isLoading = false;
      if (Number.isInteger(total)) {
        state.total = total;
      }
      if (products) {
        state.products = products;
      }
      if (state._page === 0) state._page = 1;
    },

    changeCategory(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.categoryId = action.payload;
    },
    changeCategoryFailed(state) {
      state.isLoading = false;
    },

    search(state, action: PayloadAction<FilterPayload>) {
      state.isLoading = true;
      if (action.payload && action.payload.q) state.q = action.payload.q;
    },
    searchFailed(state) {
      state.isLoading = false;
    },

    changePage(state, action: PayloadAction<FilterPayload>) {
      state.isLoading = true;
      if (action.payload && action.payload._page)
        state._page = action.payload._page;
    },
    changePageFailed(state) {
      state.isLoading = false;
    },
  },
});

// Actions
export const filterActions = filterSlide.actions;

// Selectors
export const getCurrentCategoryId = (state: any) => state.filter.categoryId;
export const getProducts = (state: any) => state.filter.products;
export const getCurrentPage = (state: any) => state.filter._page;
export const getCurrentSearch = (state: any) => state.filter.q;
export const getTotal = (state: any) => state.filter.total;

// Reducers
const filterReducer = filterSlide.reducer;

export default filterReducer;
