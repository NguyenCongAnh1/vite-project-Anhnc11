
import React, { useEffect, useReducer, useState } from 'react';
import './cartItem.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Product } from '../../App';

export interface CartItemProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}


// interface Product {
//   productId: number;
//   quantity: number;
// }
// interface Action {
//   type: string;
//   productId?: number;
//   payload?: Product[];
// }



// function reducer(state: Product[], action: Action): Product[] {
//   const itemCart = state.find((p) => p.productId === action.productId);
//   switch (action.type) {
//     case 'updateCart':
//       return action.payload!;
//     case 'increaseQuantity':
//       console.log("aaaaaa");
//       itemCart!.quantity += 1;
//       return [...state];
//     case 'decreaseQuantity':
//       if (itemCart!.quantity > 1) {
//         updatedCart[itemCart].quantity -= 1;
//        return [...updatedCart];
//       }
//       break;
//     case 'removeProduct':
//       state.filter((p) => p.productId !== action.productId);
//       return { ...state };
//     default:
//       throw new Error();

//   }
// }

const CartItem: React.FC<CartItemProps> = ({ cart, setCart }) => {
  const [currencySymbol] = useState("$");
  const [updatedCart, setUpdatedCart] = useState<Product[]>([]);

  // const [state, dispatch] = useReducer(reducer, cart);

  // useEffect(() => {
  //   dispatch({ type: 'updateCart', payload: cart });
    
  // }, [cart.length]);


  // const increaseQuantity = (productId: number) => {
  //   dispatch({ type: 'increaseQuantity', productId });
  
  
  // };

  // const decreaseQuantity = (productId: number) => {
  //   dispatch({ type: 'decreaseQuantity', productId });
  // };

  // const removeProductFromCart = (productId: number) => {
  //   dispatch({ type: 'removeProduct', productId });
  // };


  useEffect(() => {
    setCart(updatedCart)
  }, [updatedCart])


  const increaseQuantity = (productId: number) => {
    const updatedCart=[...cart];
    const itemCart = updatedCart.find((p) => p.productId === productId);
    itemCart!.quantity += 1;
    setUpdatedCart(updatedCart);
  };

  const decreaseQuantity = (productId: number) => {
    const item = cart.find((p) => p.productId === productId);
    if (item!.quantity > 1) {
      const itemCart = updatedCart.findIndex((p) => p.productId === productId);
      updatedCart[itemCart].quantity -= 1;
      setUpdatedCart([...updatedCart]);
    } else {
      removeProductFromCart(productId);
    }
  };

  const removeProductFromCart = (productId: number) => {
    const updatedCart = cart.filter((p) => p.productId !== productId);
    setUpdatedCart(updatedCart);
  };



  return (
    <div className="carts">
      {cart.map((element) => {
        const itemTotal = element.price * element.quantity; // Tính toán itemTotal ở đây
        return (
          // <div key={element.productId} className="borderCartItem">
          //   <h3>{element.name}</h3>
          //   <p>price: {currencySymbol}{element.price}</p>
          //   <p>quantity: {element.quantity}</p>
          //   <p>total: {currencySymbol}{itemTotal}</p>
          //   <button className="qup" onClick={() => increaseQuantity(element.productId)}>+</button>
          //   <button className="qdown" onClick={() => decreaseQuantity(element.productId)}>-</button>
          //   <button className="remove" onClick={() => removeProductFromCart(element.productId)}>remove</button>
          // </div>
          <Card key={element.productId} style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{element.name}</Card.Title>
              <Card.Text>Price: {currencySymbol}{element.price}</Card.Text>
              <Card.Text>Quantity: {element.quantity}</Card.Text>
              <Card.Text>Total: {currencySymbol}{itemTotal}</Card.Text>

              <Button variant="secondary" className='color-btn' onClick={() => increaseQuantity(element.productId)}>+</Button>
              <Button variant="secondary" className='color-btn' onClick={() => decreaseQuantity(element.productId)}>-</Button>
              <Button variant="secondary" className='color-btn' onClick={() => removeProductFromCart(element.productId)}>Remove</Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>

  );
};

export default CartItem;
