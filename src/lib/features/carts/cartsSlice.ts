import { Discount } from "@/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const calcAdjustedUnitPrice = (data: CartItem): number => {
  if (data.discount.percentage > 0) {
    return Math.round(
      data.price - (data.price * data.discount.percentage) / 100
    );
  }

  if (data.discount.amount > 0) {
    return Math.round(data.price - data.discount.amount);
  }

  return data.price;
};

const recalculateTotals = (state: CartsState) => {
  if (!state.cart) return;

  let totalQty = 0;
  let totalPrice = 0;
  let adjustedTotal = 0;

  state.cart.items.forEach((item) => {
    const unitAdjusted = calcAdjustedUnitPrice(item);

    totalQty += item.quantity;
    totalPrice += item.price * item.quantity;
    adjustedTotal += unitAdjusted * item.quantity;
  });

  state.cart.totalQuantities = totalQty;
  state.totalPrice = totalPrice;
  state.adjustedTotalPrice = adjustedTotal;
};

export type RemoveCartItem = {
  id: number;
};

export type CartItem = {
  id: number;
  name: string;
  srcUrl: string;
  price: number;
  discount: Discount;
  quantity: number;
  stock: number;
};

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

interface CartsState {
  cart: Cart | null;
  totalPrice: number;
  adjustedTotalPrice: number;
  action: "update" | "add" | "delete" | null;
}

const initialState: CartsState = {
  cart: null,
  totalPrice: 0,
  adjustedTotalPrice: 0,
  action: null,
};

export const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      if (!state.cart) {
        state.cart = {
          items: [],
          totalQuantities: 0,
        };
      }

      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          action.payload.quantity,
          existingItem.stock
        );
        state.action = "update";
      } else {
        state.cart.items.push({
          ...action.payload,
          quantity: Math.min(
            action.payload.quantity,
            action.payload.stock
          ),
        });
        state.action = "add";
      }

      recalculateTotals(state);
    },

    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (!state.cart) return;

      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) return;

      existingItem.quantity -= 1;

      if (existingItem.quantity <= 0) {
        state.cart.items = state.cart.items.filter(
          (item) => item.id !== action.payload.id
        );
      }

      state.action = "delete";
      recalculateTotals(state);
    },

    remove: (state, action: PayloadAction<{ id: number }>) => {
      if (!state.cart) return;

      state.cart.items = state.cart.items.filter(
        (item) => item.id !== action.payload.id
      );

      state.action = "delete";
      recalculateTotals(state);
    },
  },
});

export const { addToCart, removeCartItem, remove } =
  cartsSlice.actions;

export default cartsSlice.reducer;
