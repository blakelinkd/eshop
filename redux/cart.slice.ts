import { Product } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
  [key: string]: any;
  product: Product;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state: CartItem[], action: PayloadAction<CartItem>) => {
      const { id, product } = action.payload;
      const itemIndex = state.findIndex((item) => item.id === id);

      if (itemIndex === -1) {
        state.push({ ...action.payload, quantity: 1 });
      } else {
        state[itemIndex].quantity++;
      }
    },
    incrementQuantity: (state: CartItem[], action: PayloadAction<number>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state: CartItem[], action: PayloadAction<number>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          const index = state.findIndex((item) => item.id === action.payload);
          state.splice(index, 1);
        } else {
          item.quantity--;
        }
      }
    },
    removeFromCart: (state: CartItem[], action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
