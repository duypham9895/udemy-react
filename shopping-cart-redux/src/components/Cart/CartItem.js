import { useDispatch } from "react-redux";
import { addItem, removeItemById } from "../../store/slices/cart";
import classes from "./CartItem.module.css";

const CartItem = ({ id, title, qty, price, amount }) => {
  const dispatch = useDispatch();

  const appendItem = (item) => {
    dispatch(addItem(item));
  };

  const removeItem = (id) => {
    dispatch(removeItemById(id));
  };

  const fixedAmount = amount.toFixed(2);
  const fixedPrice = price.toFixed(2);
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          {fixedAmount}
          <span className={classes["item-price"]}>({fixedPrice}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{qty}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItem.bind(this, id)}>-</button>
          <button onClick={appendItem.bind(this, { id, title, qty, price })}>
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
