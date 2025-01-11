//reducers functions
import { useDispatch, useSelector } from "react-redux";
import { ProductToview, addproducts } from "../actions";
import { addCart, CartItems } from "../actions";
import editImage from "../Images/pen.png";
import deleteImage from "../Images/trash.png";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../Notification/notify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductItem({ item }) {
  const [addedItem, setaddedItem] = useState(true);
  const [title, settitle] = useState(item.title);
  const [price, setprice] = useState(item.price);
  const [description, setdescription] = useState(item.description);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchProduct = useDispatch();

  function handleClick(item) {
    dispatch(ProductToview(item));
    navigate(`/productdetails/${item.id}`);
  }
  function handleCart(item) {
    if (addedItem) {
      item.qty = 1;
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      setaddedItem(false);
      showToastMessage("item Added to cart", "success");
    } else {
      navigate("/cart");
    }
  }
  function handleEdit(item) {
    item.edit = false;
    dispatchProduct(addproducts([...products]));
  }
  // making delete request
  function handleDelelteProduct(item) {
    let index = products.indexOf(item);
    products.splice(index, 1);
    dispatchProduct(addproducts([...products]));
    showToastMessage("item deleted", "warning");
  }
  // closing edit mode
  function handleCancel(item) {
    item.edit = true;
    dispatchProduct(addproducts([...products]));
  }
  // making put request after click on save button of edit
  function handleSave(item) {
    let index = products.indexOf(item);
    products[index] = {
      ...item,
      title,
      price,
      description,
      edit: true,
    };

    dispatchProduct(addproducts([...products]));
    showToastMessage("Edit successful", "success");
  }
  return (
    <div
      className="d-flex container-sm px-1 py-3 mt-4 flex-column flex-lg-row gap-3"
      style={{ backgroundColor: "#D39D55", borderRadius: "10px" }}
    >
      <ToastContainer />
      <div className="d-flex container-sm gap-5">
        <img
          src={item.thumbnail}
          alt=""
          width={"240rem"}
          onClick={() => handleClick(item)}
        />

        <div className="d-flex flex-column gap-2">
          {item.edit ? (
            <span>{item.title}</span>
          ) : (
            <input
              type="text"
              value={title}
              style={{ width: "fit-content", backgroundColor: "#FFF0DC" }}
              onChange={(e) => settitle(e.target.value)}
            ></input>
          )}
          {item.edit ? (
            <span>&#8377;{item.price}</span>
          ) : (
            <input
              type="text"
              value={price}
              className="w-50"
              style={{ backgroundColor: "#FFF0DC" }}
              onChange={(e) => setprice(e.target.value)}
            ></input>
          )}
        </div>
      </div>

      <div className="p-2">
        {item.edit ? (
          <span>{item.description}</span>
        ) : (
          <div className="form-floating">
            <textarea
              className="form-control"
              value={description}
              id="floatingTextarea"
              style={{
                width: "20rem",
                height: "10rem",
                backgroundColor: "#FFF0DC",
              }}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>

      <div className="align-self-end d-flex align-items-center gap-4 flex-lg-grow-1 p-1">
        {item.edit ? (
          <button
            type="button"
            className="btn btn-primary"
            style={{
              border: "none",
              width: "9rem",
              backgroundColor: "var(--nav)",
            }}
            onClick={() => handleCart(item)}
          >
            {addedItem ? "Add to Cart" : "Go to Cart "}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleCancel(item)}
          >
            Cancel
          </button>
        )}

        {item.edit ? (
          <>
            <span>
              <img
                src={editImage}
                alt="error"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(item)}
              />
            </span>
            <span>
              <img
                src={deleteImage}
                alt="error"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleDelelteProduct(item)}
              />
            </span>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => handleSave(item)}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
