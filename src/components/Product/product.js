import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  //   console.log(props);
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <Link to={`/product/${key}`}>
          <h4>{name}</h4>
        </Link>
        <p>
          <small>By: {seller} </small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left is Stock. Order Soon! </small>
        </p>
        {props.showAddToCartBtn && (
          <button
            onClick={() => props.handleAddProduct(props.product)}
            className="main-btn"
          >
            <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
