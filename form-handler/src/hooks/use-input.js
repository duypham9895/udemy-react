import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case "CHANGE":
      return { value: data, isTouched: state.isTouched };

    case "BLUR":
      return { value: state.value, isTouched: data };

    default:
      return initialState;
  }
};

const useInput = (validateValue) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { value, isTouched } = state;

  const isValidValue = validateValue(value);
  const hasError = !isValidValue && isTouched;

  const changeValueHandler = (e) => {
    dispatch({ type: "CHANGE", data: e.target.value });
  };

  const blurValueHandler = () => {
    dispatch({ type: "BLUR", data: true });
  };

  const resetValue = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: value,
    isValidValue,
    hasError,
    changeValueHandler,
    blurValueHandler,
    resetValue,
  };
};

export default useInput;
