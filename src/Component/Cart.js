import { useDispatch } from "react-redux";
import { CartItems, updateCart, DeleteCart } from "../actions";
import plusIcon from "../Images/plus.png";
import minusIcon from "../Images/minus.png";

const Cart = ({ item }) => {
  const dispatchPlus = useDispatch();
  const dispatchMinus = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchDelete = useDispatch();

  function handlePlus(item) {
    item.qty += 1;
    dispatchPlus(updateCart(item));
    dispatchTotal(CartItems());
  }

  function handleMinus(item) {
    if (item.qty > 1) {
      item.qty -= 1;
      dispatchMinus(updateCart(item));
      dispatchTotal(CartItems());
    }
  }

  function handleCancel(item) {
    dispatchDelete(DeleteCart(item));
    dispatchTotal(CartItems());
  }
  return (
    <>
      <div
        className="d-flex container-sm gap-3"
        style={{
          width: "45rem",
          backgroundColor: "#D39D55",
          borderRadius: "30px",
          padding: "10px",
        }}
      >
        <img
          src={item.thumbnail}
          alt="error"
          id="card-image "
          style={{ width: "50%", height: "18rem", objectFit: "cover" }}
        />

        <div
          className="d-flex flex-column gap-2 justify-content-center"
          style={{ width: "50%" }}
        >
          <span>{item.title}</span>
          <span className="text-success">
            <span className="text-danger">Price: </span>&#8377;{item.price}
          </span>

          <div className="d-flex gap-3 mt-4">
            <img
              src={plusIcon}
              alt="error"
              width={"30rem"}
              onClick={() => handlePlus(item)}
            />
            <span className="px-2">{item.qty}</span>
            <img
              src={minusIcon}
              alt="error"
              width={"30rem"}
              onClick={() => handleMinus(item)}
            />
          </div>
          <div className="align-self-end mt-5 ">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleCancel(item)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
