import { Discount } from "@/types/product.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const calcAdjustedTotalPrice = (
  data: CartItem,
  quantity?: number
): number => {
  const finalPrice =
    data.discount.percentage > 0
      ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
      : data.discount.amount > 0
      ? Math.round(data.price - data.discount.amount)
      : data.price;

  return finalPrice * (quantity ? quantity : data.quantity);
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
      if (state.cart === null) {
        state.cart = {
          items: [action.payload],
          totalQuantities: action.payload.quantity,
        };

        state.totalPrice =
          action.payload.price * action.payload.quantity;

        state.adjustedTotalPrice =
          calcAdjustedTotalPrice(action.payload);

        state.action = "add";
        return;
      }

      const isItemInCart = state.cart.items.find(
        (item) => item.id === action.payload.id
      );

      if (isItemInCart) {
        state.cart.items = state.cart.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              }
            : item
        );

        state.cart.totalQuantities += action.payload.quantity;
        state.totalPrice +=
          action.payload.price * action.payload.quantity;

        state.adjustedTotalPrice +=
          calcAdjustedTotalPrice(action.payload);

        state.action = "update";
        return;
      }

      state.cart.items.push(action.payload);
      state.cart.totalQuantities += action.payload.quantity;

      state.totalPrice +=
        action.payload.price * action.payload.quantity;

      state.adjustedTotalPrice +=
        calcAdjustedTotalPrice(action.payload);

      state.action = "add";
    },

    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (!state.cart) return;

      const isItemInCart = state.cart.items.find(
        (item) => item.id === action.payload.id
      );

      if (!isItemInCart) return;

      state.cart.items = state.cart.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      state.cart.totalQuantities -= 1;
      state.totalPrice -= isItemInCart.price;

      state.adjustedTotalPrice -=
        calcAdjustedTotalPrice(isItemInCart, 1);

      state.action = "delete";
    },

    remove: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      if (!state.cart) return;

      const isItemInCart = state.cart.items.find(
        (item) => item.id === action.payload.id
      );

      if (!isItemInCart) return;

      state.cart.items = state.cart.items.filter(
        (item) => item.id !== action.payload.id
      );

      state.cart.totalQuantities -= isItemInCart.quantity;
      state.totalPrice -=
        isItemInCart.price * isItemInCart.quantity;

      state.adjustedTotalPrice -=
        calcAdjustedTotalPrice(
          isItemInCart,
          isItemInCart.quantity
        );

      state.action = "delete";
    },
  },
});

export const { addToCart, removeCartItem, remove } =
  cartsSlice.actions;

export default cartsSlice.reducer;
