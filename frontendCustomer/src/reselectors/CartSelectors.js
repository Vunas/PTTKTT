import { createSelector } from "reselect";

// Trích xuất thô
export const selectCartItems = (state) => state.cart.items;

// Selector có transform (ví dụ: thêm totalPrice vào từng item)
export const selectMemoizedCartItems = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.map((item) => ({
      ...item,
      totalPrice: item.price * item.qty,
    }))
);