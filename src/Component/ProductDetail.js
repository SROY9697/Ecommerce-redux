//get actions from redux
import { addCart, CartItems } from "../actions";
import { useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from "../Notification/notify";

const ProductDetail = ({ item }) => {
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();

  function handleClick(item) {
    if (!item.qty) {
      item.qty = 1;
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      showToastMessage("item Added to cart", "success");
    } else {
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      showToastMessage("item Added to cart", "success");
    }
  }
  return (
    <div className="container-sm d-flex flex-lg-row  flex-column mt-4 gap-5 pb-5">
      <ToastContainer />
      {item.images ? (
        <div
          className=" border border-1 "
          style={{ width: "50%", objectFit: "cover", borderRadius: "30px" }}
        >
          <div>
            <div className="carousel-inner">
              {item.images[0] && (
                <div className="carousel-item active">
                  <img
                    src={item.thumbnail}
                    className="d-block w-80"
                    alt="error"
                    style={{ maxHeight: "18rem" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <img src={item.thumbnail} alt="error" id="detailAddedImage" />
      )}

      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column gap-2">
          <span>{item.title}</span>

          <div className="d-flex gap-3 ">
            <span className="text-success">
              <span className="text-danger">Price: </span>&#8377;{item.price}
            </span>
            <span className="text-danger">
              Discount:
              <span className="text-success">
                {item.discountPercentage ? item.discountPercentage : ""}%
              </span>
            </span>
          </div>
          <span className="text-danger">
            Category:<span className="text-success">{item.category}</span>
          </span>
        </div>
        <div className="d-flex flex-column gap-3">
          <span className="text-danger">
            Stocks:
            <span className="text-success">{item.stock ? item.stock : ""}</span>
          </span>
          <span className="text-danger">
            Description :{" "}
            <span className="text-success">{item.description}</span>
          </span>
        </div>

        <div className="align-self-end">
          <button
            type="button"
            className="btn btn-primary"
            style={{
              width: "9rem",
              backgroundColor: "var(--nav)",
            }}
            onClick={() => handleClick(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
