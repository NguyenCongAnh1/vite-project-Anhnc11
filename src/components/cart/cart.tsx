import React, { useState, useEffect, useContext } from "react";
import "./cart.css";

import ProductItem, { ProductItemProps } from "../productItem/ProductItem";
import CartItem from "../cartItem/cartItem";
import CheckOut from "../checkOut/checkOut";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";



const ShoppingCart: React.FC<ProductItemProps> = ({ cart, setCart }) => {

  const [isCheckoutVisible, setCheckoutVisible] = useState(false);

  

  // Tạo một container mới bên ngoài root để render drawCheckout
  const portalContainer = document.createElement('div');
  useEffect(() => {
    document.body.appendChild(portalContainer);

    // Cleanup khi component unmount
    return () => {
      document.body.removeChild(portalContainer);
    };
  }, [portalContainer]);


  useEffect(() => {
    // Initialize store with products, cart, and checkout
    drawProducts();
    drawCart();
    drawCheckout();
  });

  const drawProducts = () => {
    return (
      <div className="products">
        <ProductItem {...{ cart, setCart }} />
      </div>
    );
  };

  const drawCart = () => {
    return (
      <div className="cart">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-30">Cart</h2>
        <CartItem {...{ cart, setCart }} />
      </div>
    );
  };

  const drawCheckout = () => {
    return (
      <CheckOut {...{ cart, setCart, open: isCheckoutVisible, setOpen: setCheckoutVisible }} />
    );
  };

  return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }} >
        <div className="cart-layout">
          <div>
            {drawProducts()} {drawCart()}
          </div>
        </div>
        <div style={{ height: '100px', marginTop: '300px' }}>
          <button onClick={() => setCheckoutVisible(!isCheckoutVisible)}>
            <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="check-out">{drawCheckout()}</div>
      </div>
  );
};

export default ShoppingCart;
