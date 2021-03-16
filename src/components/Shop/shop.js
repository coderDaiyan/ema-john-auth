import React, { useEffect, useState } from "react";
import "./shop.css";
import { Link } from "react-router-dom";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import Product from "../Product/product";
import Cart from "../Cart/cart";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousProduct = productKeys.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      product.quantity = savedCart[existingKey];
      return product;
    });
    setCart(previousProduct);
  }, []);

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === product.key);

    let count = 1;
    let newCart;

    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);

    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCartBtn={true}
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-btn">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
