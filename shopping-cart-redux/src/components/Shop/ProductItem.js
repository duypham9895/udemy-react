import { useDispatch } from "react-redux";
import { addItem } from "../../store/slices/cart";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = ({ id, title, qty = 1, price, description }) => {
  const dispatch = useDispatch();

  const addItemHandler = (item) => {
    dispatch(addItem(item));
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button
            onClick={addItemHandler.bind(this, {
              id,
              title,
              qty,
              price,
              description,
            })}
          >
            Add to Cart
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
