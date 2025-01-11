import React from "react";
import ProductItem from "./ProductItem";
import Sort from "./Sort";
import { useSelector } from "react-redux";

const ProductItemList = () => {
  const data = useSelector((state) => state.products);
  if (data.length === 0) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div
          className="spinner-border "
          style={{ width: "8rem", height: "8rem", color: "green" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="d-flex flex-column container-sm mt-4"
        style={{ backgroundColor: "#D6CFB4", padding: "15px", width: "" }}
      >
        <Sort />
        {data.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div>
    );
  }
};
export default ProductItemList;
