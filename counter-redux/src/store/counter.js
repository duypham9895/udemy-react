import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {
  counter: 0,
  isShowCounter: true,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    toggleCounter(state) {
      state.isShowCounter = !state.isShowCounter;
    },
  },
});

export const { increment, decrement, increase, toggleCounter } =
  counterSlice.actions;

const counterReducer = counterSlice.reducer;
export default counterReducer;
