import React from "react";

const ReviewItem = (props) => {
  const { name, price, quantity, key } = props.product;
  const style = {
    borderBottom: "2px solid lightgrey",
    marginBottom: "50px",
    marginLeft: "170px",
  };
  return (
    <div style={style}>
      <h4 style={{ color: "purple" }}>{name}</h4>
      <p>Price: {price}</p>
      <p>Quantity: {quantity}</p>
      <br />
      <button
        style={{ marginBottom: "10px" }}
        onClick={() => props.removeProduct(key)}
        className="main-btn"
      >
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
