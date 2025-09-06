import React, { createContext, useContext, useReducer } from "react";

// Tạo Context
const CartContext = createContext();

// Initial state cho giỏ hàng
const initialState = {
  items: [], // Mảng chứa các sản phẩm trong giỏ
  totalItems: 0, // Tổng số lượng sản phẩm
  totalPrice: 0, // Tổng giá tiền
};

// Cart reducer để xử lý các action
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ, chỉ tăng quantity, KHÔNG tăng totalItems
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems, // Giữ nguyên totalItems
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        // Nếu sản phẩm chưa có trong giỏ, thêm mới và tăng totalItems
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1, // Tăng totalItems khi thêm sản phẩm mới
          totalPrice: state.totalPrice + action.payload.price,
        };
      }

    case "REMOVE_FROM_CART":
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove) {
        const updatedItems = state.items.filter(
          (item) => item.id !== action.payload
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems - 1, // Giảm 1 vì xóa 1 loại sản phẩm
          totalPrice:
            state.totalPrice - itemToRemove.price * itemToRemove.quantity,
        };
      }
      return state;

    case "UPDATE_QUANTITY":
      const itemToUpdate = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemToUpdate) {
        const quantityDiff = action.payload.quantity - itemToUpdate.quantity;
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems, // Giữ nguyên totalItems vì không thay đổi số loại sản phẩm
          totalPrice: state.totalPrice + itemToUpdate.price * quantityDiff,
        };
      }
      return state;

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Các function để thao tác với giỏ hàng
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, quantity },
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook để sử dụng CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
