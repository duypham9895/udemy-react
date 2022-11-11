import { useDispatch, useSelector } from "react-redux";
import { toggleVisibleCart } from "../../store/slices/ui";

import classes from "./CartButton.module.css";

const CartButton = () => {
  const { totalQty } = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(toggleVisibleCart());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQty}</span>
    </button>
  );
};

export default CartButton;
