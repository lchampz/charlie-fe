import React, { useState, useContext, createContext } from "react";
import { useToast } from "./useToast";

const CartContext = createContext({
  cart: [],
  removeFromCart: (item, qtd = 1) => {},
  addToCart: (item, qtd = 1) => {},
  getCounter: () => Number
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToast = useToast();

  const removeFromCart = (item, qtd = 1) => {
    const product = cart.find((cartItem) => cartItem.PRODUTO_ID === item.PRODUTO_ID);

    if (!product) {
      addToast("Item não encontrado no carrinho!", "fail");
      return;
    }

    if (product.qtd > qtd) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.PRODUTO_ID === item.PRODUTO_ID
          ? { ...cartItem, qtd: cartItem.qtd - qtd }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((cartItem) => cartItem.PRODUTO_ID !== item.PRODUTO_ID);
      setCart(updatedCart);
    }
  };

  const addToCart = (item, qtd = 1) => {
    const product = cart.find((cartItem) => cartItem.PRODUTO_ID === item.PRODUTO_ID);

    if (!product) {
      const newProduct = { ...item, qtd };
      setCart((prevCart) => [...prevCart, newProduct]);
    } else {
      const updatedCart = cart.map((cartItem) =>
        cartItem.PRODUTO_ID === item.PRODUTO_ID
          ? { ...cartItem, qtd: parseInt(cartItem.qtd) + parseInt(qtd) }
          : cartItem
      );
      setCart(updatedCart);
    }
    addToast("Produto inserido com sucesso!", "success");
  };

  const getCounter = () => {
    return cart.reduce((acc, item) => acc + item.qtd, 0);
  }

  return (
    <CartContext.Provider value={{ cart, removeFromCart, addToCart, getCounter }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("need CartProvider!");
  }

  return context;
};
