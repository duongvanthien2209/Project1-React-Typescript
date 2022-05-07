import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'models';

export interface CartPayload {
  _id: string;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  products: CartItem[];
  total: number;
}

const initialState: CartState = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
      const index = state.products.findIndex(
        (item: CartItem) => item.product._id === action.payload.product._id
      );
      if (index >= 0) {
        state.products[index].quantity += action.payload.quantity;
        state.total +=
          state.products[index].product.price * action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.total += action.payload.product.price * action.payload.quantity;
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      const index = state.products.findIndex(
        (item: CartItem) => item.product._id === action.payload
      );

      if (index >= 0) {
        state.total -=
          state.products[index].product.price * state.products[index].quantity;
        state.products.splice(index, 1);
      }
    },

    changeQuantity(state, action: PayloadAction<CartPayload>) {
      const { _id, quantity } = action.payload;

      if (_id && quantity >= 1) {
        const index = state.products.findIndex(
          (item: CartItem) => item.product._id === _id
        );

        if (index >= 0) {
          state.total +=
            (quantity - state.products[index].quantity) *
            state.products[index].product.price;
          state.products[index].quantity = quantity;
        }
      }
    },
  },
});

// Actions
export const cartActions = cartSlice.actions;

// Selectors
export const getProducts = (state: any) => state.cart.products;
export const getTotal = (state: any) => state.cart.total;

// Reducer
const cartReducer = cartSlice.reducer;

export default cartReducer;
