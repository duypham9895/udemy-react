import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Cart.module.css";
import Card from "../UI/Card";
import CartItem from "./CartItem";
import { fetchCarts, updateCart } from "../../store/actions/cart";

let isInitial = true;

const Cart = () => {
  const { items, totalQty, totalAmount, isChanged } = useSelector(
    ({ cart }) => cart
  );
  const { isVisibleCart } = useSelector(({ ui }) => ui);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (isChanged) {
      dispatch(updateCart({ items, totalQty, totalAmount }));
    }
  }, [items, totalQty, totalAmount, isChanged, dispatch]);

  if (!isVisibleCart) {
    return;
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map(({ id, title, qty, price, amount }) => (
          <CartItem
            key={id}
            id={id}
            title={title}
            qty={qty}
            price={price}
            amount={amount}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
