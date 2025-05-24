import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { setOrderDetails } from './checkoutSlice';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 100,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, product, quantity, selectedVolume } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        toast.info('Cart Updated', {
          description: `Added ${quantity} more ${product.name} to cart`,
          icon: '🛒',
        });
      } else {
        state.items.push({
          id,
          ...product,
          quantity,
          selectedVolume,
          totalPrice: product.price * quantity,
        });
        toast.success('Added to Cart', {
          description: `${product.name} added to cart`,
          icon: '✅',
        });
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        toast.error('Removed from Cart', {
          description: `${existingItem.name} removed from cart`,
          icon: '🗑️',
        });
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;

        if (item.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== id);
          toast.error('Removed from Cart', {
            description: `${item.name} removed from cart`,
            icon: '🗑️',
          });
        } else {
          toast.info('Cart Updated', {
            description: `${item.name} quantity updated to ${quantity}`,
            icon: '🔄',
          });
        }

        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      toast.error('Cart Cleared', {
        description: 'All items removed from cart',
        icon: '🗑️',
      });
    },
  },
});

// Create a middleware to sync cart total with checkout
export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Check if the action is one that modifies the cart
  if (['cart/addToCart', 'cart/removeFromCart', 'cart/updateQuantity', 'cart/clearCart'].includes(action.type)) {
    const state = store.getState();
    const cartTotal = state.cart.totalAmount;
    const currentOrder = state.checkout.order;

    // Update checkout order details with new subtotal while preserving discount
    store.dispatch(
      setOrderDetails({
        subtotal: cartTotal,
        shipping: currentOrder.shipping,
        discount: currentOrder.discount,
        total: cartTotal + (currentOrder.shipping || 0) - (currentOrder.discount || 0),
      }),
    );
  }

  return result;
};

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
