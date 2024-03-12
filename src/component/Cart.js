// Cart.jsx

import { data } from "./data";
import { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import "./Cart.css";

function Cart() {
  const [totalItem, setTotalItem] = useState();
  const [totalData, setTotalData] = useState([...data]);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    let tempData = [...totalData];
    let price = 0;
    let quantity = 0;

    for (let ele of tempData) {
      let currentQuantity = Number(ele.quantity);
      let currentPrice = Number(ele.price);
      price += currentPrice * currentQuantity;
      quantity += currentQuantity;
    }

    setTotalPrice(price.toFixed(2));
    setTotalItem(quantity);
  }, [totalData]);

  function updateValue(tempData) {
    let price = 0;
    let quantity = 0;

    for (let ele of tempData) {
      let currentQuantity = Number(ele.quantity);
      let currentPrice = Number(ele.price);
      price += currentPrice * currentQuantity;
      quantity += currentQuantity;
    }

    setTotalPrice(price.toFixed(2));
    setTotalItem(quantity);
  }

  function addOne(index) {
    let tempData = [...totalData];
    let value = Number(tempData[index].quantity);
    tempData[index].quantity = value + 1;
    setTotalData([...tempData]);
    updateValue(tempData);
  }

  function subOne(index) {
    let tempData = [...totalData];
    if (Number(totalData[index].quantity) > 1) {
      let value = Number(tempData[index].quantity);
      tempData[index].quantity = value - 1;
      setTotalData([...tempData]);
    } else {
      tempData.splice(index, 1);
      setTotalData([...tempData]);
      setTotalItem(tempData.length);
    }
    if (tempData.length === 0) alert("Your cart is going to Empty");
    updateValue(tempData);
  }

  function removeEle(index) {
    let tempData = [...totalData];
    tempData.splice(index, 1);
    setTotalData([...tempData]);
    setTotalItem(tempData.length);
    if (tempData.length === 0) alert("Your cart is going to Empty");

    updateValue(tempData);
  }

  function clearCart() {
    setTotalData([]);
    setTotalPrice(0);
    setTotalItem(0);
    alert("You want to Empty the cart");
  }

  return (
    <div className="custom-container">
      <div className="custom-header">
        <div>
          <h1 className="custom-title">Your Cart</h1>
        </div>
        <div className="custom-cart-icon">
        <i><FaCartPlus /></i>
        <p className="custom-cart-count">{totalItem}</p>
        </div>
      </div>
      <div className="custom-subtitle">YOUR BAG</div>
      <div className="custom-products">
        {totalData.map((item, index) => {
          return (
            <div key={index} className="custom-product">
              <div className="custom-product-details">
                <div>
                  <img src={item.src} alt="" className="custom-product-image" />
                </div>
                <div>
                  <p className="custom-product-name">{item.name}</p>
                  <p>${item.price}</p>
                  <button
                    className="custom-remove-button"
                    onClick={() => {
                      removeEle(index);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="custom-quantity-controls">
                <p
                  onClick={() => {
                    addOne(index);
                  }}
                  className="custom-chevron-up cursor-pointer"
                >
                  +
                </p>
                <p>{item.quantity}</p>
                <p
                  className="custom-chevron-down cursor-pointer"
                  onClick={() => {
                    subOne(index);
                  }}
                >
                  -
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="custom-divider"></div>
      <div className="custom-total-section">
        <div className="custom-total">
          <div><span className="custom-total-label">Total</span></div>
          <div><span className="custom-total-amount">$ {totalPrice}</span></div>
        </div>
        <div className="custom-clear-button">
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
