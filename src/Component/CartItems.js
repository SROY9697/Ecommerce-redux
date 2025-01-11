import React from "react";
//get cart component
import Cart from "./Cart";
//get styled
import styled from "styled-components";
//get redux hook
import { useSelector } from "react-redux";

const PriceDetail = styled.div`
  width: 30%;
  height: fit-content;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

const CartItemComponent = () => {
  let CartItem = useSelector((state) => state.cart);
  let totalItem = useSelector((state) => state.totalCart);
  //handle total quantity
  let totalPrice = CartItem.reduce((total, item) => {
    return (total += item.price * item.qty);
  }, 0);

  if (CartItem.length === 0)
    return <h1 className="text-center mt-5">Your cart is empty</h1>;
  return (
    <div className=" container-sm d-flex flex-column flex-lg-row mt-4 gap-3 ">
      <div className="d-flex flex-column gap-3">
        {CartItem.map((item) => (
          <Cart item={item} key={item.id} />
        ))}
      </div>
      {/* price summary section  */}
      <PriceDetail className=" p-5 d-flex flex-column gap-2 ">
        <span className="fs-5  pb-2 fw-bold">Price Details</span>

        <div className="d-flex justify-content-between">
          <span>Price</span>
          <span>&#8377;{totalPrice.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Quantity</span>
          <span>{totalItem} items</span>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <h5>Total Amount</h5>
          <span>&#8377;{totalPrice.toFixed(2)}</span>
        </div>
      </PriceDetail>
    </div>
  );
};
export default CartItemComponent;
