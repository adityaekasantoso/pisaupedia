import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  name: string;
  srcUrl: string;
  price_idr: number;
  price_usd: number;
  quantity: number;
  stock: number;
  discount_percentage: number;
  discount_amount: number;
};
export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

interface CartsState {
  cart: Cart | null;
  totalPrice: number;
  adjustedTotalPrice: number;
  currency: "IDR" | "USD";
  action: "update" | "add" | "delete" | null;
}

const initialState: CartsState = {
  cart: null,
  totalPrice: 0,
  adjustedTotalPrice: 0,
  currency: "IDR",
  action: null,
};

const getBasePrice = (
  item: CartItem,
  currency: "IDR" | "USD"
): number => {
  return currency === "USD"
    ? Number(item.price_usd ?? 0)
    : Number(item.price_idr ?? 0);
};

const calcAdjustedUnitPrice = (
  item: CartItem,
  currency: "IDR" | "USD"
): number => {

  const basePrice = getBasePrice(item, currency);

  const percentage = Number(item.discount_percentage ?? 0);
  const amount = Number(item.discount_amount ?? 0);

  if (percentage > 0) {
    return Math.round(basePrice - (basePrice * percentage) / 100);
  }

  if (amount > 0) {
    return Math.max(0, Math.round(basePrice - amount));
  }

  return basePrice;
};

const recalcTotals = (state: CartsState) => {

  if (!state.cart) return;

  let totalQty = 0;
  let totalPrice = 0;
  let adjustedTotal = 0;

  state.cart.items.forEach((item) => {

    const basePrice = getBasePrice(item, state.currency);
    const unitPrice = calcAdjustedUnitPrice(item, state.currency);

    totalQty += item.quantity;

    totalPrice += basePrice * item.quantity;

    adjustedTotal += unitPrice * item.quantity;

  });

  state.cart.totalQuantities = totalQty;
  state.totalPrice = totalPrice;
  state.adjustedTotalPrice = adjustedTotal;
};

export const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
setCurrency: (state, action: PayloadAction<"IDR" | "USD">) => {

  state.currency = action.payload;

  recalcTotals(state);

},
    addToCart: (state, action: PayloadAction<CartItem>) => {
      if (!state.cart) {
        state.cart = { items: [], totalQuantities: 0 };
      }

      const existingItem = state.cart.items.find(
        (i) => i.id === action.payload.id
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
          quantity: Math.min(action.payload.quantity, action.payload.stock),
        });
        state.action = "add";
      }

      recalcTotals(state);
    },

    removeCartItem: (state, action: PayloadAction<{ id: number }>) => {
      if (!state.cart) return;

      const existingItem = state.cart.items.find(
        (i) => i.id === action.payload.id
      );
      if (!existingItem) return;

      existingItem.quantity -= 1;

      if (existingItem.quantity <= 0) {
        state.cart.items = state.cart.items.filter(
          (i) => i.id !== action.payload.id
        );
      }

      state.action = "delete";
      recalcTotals(state);
    },

    remove: (state, action: PayloadAction<{ id: number }>) => {
      if (!state.cart) return;

      state.cart.items = state.cart.items.filter(
        (i) => i.id !== action.payload.id
      );

      state.action = "delete";
      recalcTotals(state);
    },

    clearCart: (state) => {
      state.cart = { items: [], totalQuantities: 0 };
      state.totalPrice = 0;
      state.adjustedTotalPrice = 0;
      state.action = null;
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  remove,
  clearCart,
  setCurrency,
} = cartsSlice.actions;

export default cartsSlice.reducer;