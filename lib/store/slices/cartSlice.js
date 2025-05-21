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

      state.totalQuantity += quantity;
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
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
        const quantityDiff = quantity - item.quantity;
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;

        state.totalQuantity += quantityDiff;
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);

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
