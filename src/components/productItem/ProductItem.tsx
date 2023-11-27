import React, { useContext, useEffect, useReducer, useState } from "react";
import './ProductItem.css'
import Button from 'react-bootstrap/Button';
import { Product } from "../../App";
import useApi, { UseApiOptions, UseApiResult } from '../api/api';


export interface ProductItemProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}


const ProductItem: React.FC<ProductItemProps> = ({ cart, setCart }) => {
  const [currencySymbol] = useState("$");
  const [updatedCart, setUpdatedCart] = useState<Product[]>([]);

  const apiOptions: UseApiOptions = {
    url: 'http://localhost:3000',
    method: 'GET',
  }
  const { data, loading, error }: UseApiResult = useApi(apiOptions);

  useEffect(() => {
    // Thực hiện các tác vụ sau khi component đã được render lần đầu tiên.

    // Tạo giá trị ban đầu cho products ở đây nếu cần
    // const initialProducts = [
    //   {
    //     name: "Carton of Cherries",
    //     price: 4,
    //     quantity: 0,
    //     productId: 1,
    //     image: cherry,
    //   },
    //   {
    //     name: "Carton of Strawberries",
    //     price: 5,
    //     quantity: 0,
    //     productId: 2,
    //     image: strawberry,
    //   },
    //   {
    //     name: "Bag of Oranges",
    //     price: 4,
    //     quantity: 0,
    //     productId: 3,
    //     image: orange,
    //   },
    // ];



    // // Set giá trị cho state products
    // setProducts(initialProducts);
  }, []);

  useEffect(() => {
    setCart(updatedCart);
  }, [updatedCart]);

  const addProductToCart = (productId: number) => {
    const updatedCart = [...cart]; // Tạo một bản sao mới của giỏ hàng
    const itemIndex = updatedCart.findIndex((p) => p.productId === productId);
    if (itemIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      updatedCart[itemIndex].quantity += 1;
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng với số lượng là 1
      const productToAdd = data!.find((p) => p.productId === productId);
      if (productToAdd) {
        const newItem = { ...productToAdd, quantity: 1 };
        updatedCart.push(newItem);
      }
    }
    // Cập nhật giỏ hàng bằng cách gọi setCart với giá trị mới
    setUpdatedCart(updatedCart);
  };

  //Render
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-30">Product</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.map((product, index) => (
            <a key={index} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={`../../../crud-json/uploads/${product.file}`}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900"> {currencySymbol}{product.price}</p>
              <Button
                className="add-to-cart" variant="secondary"
                onClick={() => addProductToCart(product.productId)}>Add to Cart</Button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
