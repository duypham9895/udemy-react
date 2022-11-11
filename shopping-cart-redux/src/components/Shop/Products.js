import { nanoid } from "nanoid";

import classes from "./Products.module.css";
import ProductItem from "./ProductItem";

const DUMMY_PRODUCTS = [
  {
    id: nanoid(),
    price: 6,
    title: "My First Book",
    description: "The first book I ever wrote",
  },
  {
    id: nanoid(),
    price: 5,
    title: "My Second Book",
    description: "The second book I ever wrote",
  },
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(({ id, price, title, description }) => (
          <ProductItem
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
