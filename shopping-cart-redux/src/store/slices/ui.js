const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isVisibleCart: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleVisibleCart(state) {
      state.isVisibleCart = !state.isVisibleCart;
    },
    showNotification(state, action) {
      state.notification = { ...action.payload };
    },
  },
});

export const { toggleVisibleCart, showNotification } = uiSlice.actions;

const uiReducer = uiSlice.reducer;
export default uiReducer;
