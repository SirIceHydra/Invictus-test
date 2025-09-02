import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Cart, CartItem } from '../../../types/cart';
import { Product } from '../../../types/product';
import { storage, calculateCartTotal, calculateCartItemCount, generateUniqueId } from '../../../utils/helpers';
import { DEFAULTS, ERROR_MESSAGES } from '../../../utils/constants';

interface CartContextType {
  cart: Cart;
  loading: boolean;
  error: string | null;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartItem: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartItem: (productId: number) => CartItem | undefined;
  isInCart: (productId: number) => boolean;
  getCartItemQuantity: (productId: number) => number;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => {
    const savedCart = storage.get(DEFAULTS.CART_STORAGE_KEY);
    return savedCart || { items: [], total: 0, itemCount: 0 };
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    storage.set(DEFAULTS.CART_STORAGE_KEY, cart);
  }, [cart]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      if (product.stockStatus === 'outofstock') throw new Error(ERROR_MESSAGES.PRODUCT_OUT_OF_STOCK);
      if (product.stockQuantity !== undefined && quantity > product.stockQuantity) throw new Error(ERROR_MESSAGES.INVALID_QUANTITY);
      setCart(prevCart => {
        const existingItem = prevCart.items.find(item => item.productId === product.id);
        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          if (product.stockQuantity !== undefined && newQuantity > product.stockQuantity) throw new Error(ERROR_MESSAGES.INVALID_QUANTITY);
          const updatedItems = prevCart.items.map(item => item.productId === product.id ? { ...item, quantity: newQuantity } : item);
          return { items: updatedItems, total: calculateCartTotal(updatedItems), itemCount: calculateCartItemCount(updatedItems) };
        }
        const newItem: CartItem = {
          id: generateUniqueId(),
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.images[0] || '',
          stockQuantity: product.stockQuantity,
          stockStatus: product.stockStatus,
        };
        const newItems = [...prevCart.items, newItem];
        return { items: newItems, total: calculateCartTotal(newItems), itemCount: calculateCartItemCount(newItems) };
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCartItem = useCallback((productId: number, quantity: number) => {
    setLoading(true);
    setError(null);
    try {
      if (quantity <= 0) { removeFromCart(productId); return; }
      setCart(prevCart => {
        const item = prevCart.items.find(i => i.productId === productId);
        if (!item) throw new Error('Item not found in cart');
        if (item.stockQuantity !== undefined && quantity > item.stockQuantity) throw new Error(ERROR_MESSAGES.INVALID_QUANTITY);
        const updatedItems = prevCart.items.map(i => i.productId === productId ? { ...i, quantity } : i);
        return { items: updatedItems, total: calculateCartTotal(updatedItems), itemCount: calculateCartItemCount(updatedItems) };
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setLoading(true);
    setError(null);
    try {
      setCart(prevCart => {
        const updatedItems = prevCart.items.filter(i => i.productId !== productId);
        return { items: updatedItems, total: calculateCartTotal(updatedItems), itemCount: calculateCartItemCount(updatedItems) };
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0, itemCount: 0 });
  }, []);

  const getCartItem = useCallback((productId: number): CartItem | undefined => cart.items.find(i => i.productId === productId), [cart.items]);
  const isInCart = useCallback((productId: number): boolean => cart.items.some(i => i.productId === productId), [cart.items]);
  const getCartItemQuantity = useCallback((productId: number): number => (cart.items.find(i => i.productId === productId)?.quantity ?? 0), [cart.items]);
  const clearError = useCallback(() => setError(null), []);

  const value: CartContextType = { cart, loading, error, addToCart, updateCartItem, removeFromCart, clearCart, getCartItem, isInCart, getCartItemQuantity, clearError };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}


