import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();

  return (
    <section>
      <h1>ProductDetail - {productId}</h1>
    </section>
  );
};

export default ProductDetail;
