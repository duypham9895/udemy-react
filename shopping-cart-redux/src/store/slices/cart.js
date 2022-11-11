import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQty: 0,
  totalAmount: 0,
  isChanged: false,
};

const mutateQtyAndAmountStateByItem = ({ state, item, isForward = true }) => {
  if (isForward) {
    state.totalQty += 1;
    state.totalAmount += item.price;
  } else {
    state.totalQty -= 1;
    state.totalAmount -= item.price;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.isChanged = true;

      const newItem = action.payload;
      const foundItem = state.items.find(({ id }) => id === newItem.id);
      if (foundItem) {
        foundItem.qty += 1;
        foundItem.amount += newItem.price;
      } else {
        state.items.push({ ...newItem, qty: 1, amount: newItem.price });
      }

      mutateQtyAndAmountStateByItem({ state, item: newItem, isForward: true });
    },

    removeItemById(state, action) {
      state.isChanged = true;

      const removedId = action.payload;
      const foundItem = state.items.find(({ id }) => id === removedId);
      if (foundItem.qty === 1) {
        state.items = state.items.filter(({ id }) => id !== removedId);
      }

      foundItem.qty -= 1;
      foundItem.amount -= foundItem.price;

      mutateQtyAndAmountStateByItem({
        state,
        item: foundItem,
        isForward: false,
      });
    },

    replaceCart(state, action) {
      const { items, totalQty, totalAmount } = action.payload;
      state.items = items || [];
      state.totalQty = totalQty;
      state.totalAmount = totalAmount;
    },
  },
});

export const { addItem, removeItemById, replaceCart } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
