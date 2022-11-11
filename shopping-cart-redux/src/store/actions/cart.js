import { replaceCart } from "../slices/cart";
import { showNotification } from "../slices/ui";

export const fetchCarts = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-complete-guilde-default-rtdb.asia-southeast1.firebasedatabase.app/carts.json"
      );

      if (!response.ok) {
        throw new Error("Fetching cart data failed!");
      }

      const data = await response.json();

      return data;
    };
    try {
      const cart = await fetchData();
      dispatch(replaceCart(cart));
    } catch (error) {
      dispatch(
        showNotification({
          status: "ERROR",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const updateCart = ({ items, totalQty, totalAmount }) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "PENDING",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-complete-guilde-default-rtdb.asia-southeast1.firebasedatabase.app/carts.json",
        {
          headers: { "Content-Type": "application/json" },
          method: "PUT",
          body: JSON.stringify({ items, totalQty, totalAmount }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        showNotification({
          status: "SUCCESS",
          title: "Success",
          message: "Sending cart data successfully.",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: "ERROR",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
