import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, product, quantity, selectedVolume, price } = action.payload;
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
          price,
          totalPrice: price * quantity,
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

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
