/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "minimart-cart";

function clampQuantity(quantity, stock) {
  return Math.max(0, Math.min(quantity, stock));
}

function readStoredCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
    return rawCart ? JSON.parse(rawCart) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart);
  const [cartNotice, setCartNotice] = useState("");
  const noticeTimeoutRef = useRef(null);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    return () => {
      if (noticeTimeoutRef.current) {
        window.clearTimeout(noticeTimeoutRef.current);
      }
    };
  }, []);

  const showCartNotice = (message) => {
    setCartNotice(message);

    if (noticeTimeoutRef.current) {
      window.clearTimeout(noticeTimeoutRef.current);
    }

    noticeTimeoutRef.current = window.setTimeout(() => {
      setCartNotice("");
    }, 2200);
  };

  const addToCart = (product, quantity = 1) => {
    if (product.stock <= 0 || quantity <= 0) {
      showCartNotice(`${product.title} is out of stock.`);
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: clampQuantity(item.quantity + quantity, product.stock),
              }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: clampQuantity(quantity, product.stock) }];
    });

    showCartNotice(`${product.title} added to cart.`);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: clampQuantity(quantity, item.stock) } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => {
    const discountedPrice =
      item.discount > 0 ? Math.round(item.price - (item.price * item.discount) / 100) : item.price;

    return total + discountedPrice * item.quantity;
  }, 0);

  const value = {
    addToCart,
    cartCount,
    cartItems,
    cartNotice,
    cartSubtotal,
    clearCart,
    removeFromCart,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
