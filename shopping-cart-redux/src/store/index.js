import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cart";
import uiReducer from "./slices/ui";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});

export default store;
