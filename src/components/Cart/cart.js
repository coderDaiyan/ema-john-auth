import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  // console.log(cart);
  let subTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    subTotal = subTotal + product.price * product.quantity;
    subTotal = Math.round((subTotal * 100) / 100);
  }
  //   subTotal = subTotal.toFixed(2);

  let shipping = 0;
  if (subTotal > 1500) {
    shipping = 0;
  } else if (subTotal > 500) {
    shipping = 100.99;
  } else if (subTotal < 500) {
    shipping = 250.99;
  }

  const tax = (subTotal / 10).toFixed(2);

  let totalPrice = (subTotal + shipping + Number(tax)).toFixed(2);
  //   totalPrice = Math.round((totalPrice * 100) / 100);

  return (
    <div>
      <h3 style={{ color: "red", marginLeft: "96px" }}>Order Summery:</h3>
      <h4>Items Ordered: {cart.length}</h4>
      <h4>Sub Total: {subTotal}</h4>
      <h4>Shipping Cost: {shipping}</h4>
      <h4>Tax: {tax}</h4>
      <h4>Total: {totalPrice}</h4>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
