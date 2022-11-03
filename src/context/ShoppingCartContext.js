import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../redux/productSlice";
const ShoppingCartContext = createContext({});

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }) => {
  const products = useSelector(selectProducts);
  const [cartItems, setCartItems] = useState([]);
  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const getCart = () => {
    return cartItems;
  };
  const clearCart = () => {
    setCartItems([]);
  };
  const getTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const product = products.find((i) => i._id === item.id);
      total += product.price * item.quantity;
    });
    return total;
  };
  const increaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id))
        return currItems.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity + 1 };
          else return item;
        });
      else return [...currItems, { id, quantity: 1 }];
    });
  };
  const decreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1)
        return currItems.filter((item) => item.id !== id);
      else
        return currItems.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity - 1 };
          else return item;
        });
    });
  };
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        getCart,
        getTotal,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
