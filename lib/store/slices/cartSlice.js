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
      const { id, product, quantity, selectedVolume, price, isRegular, isWholesale, flavor } = action.payload;

      // Create a unique ID by combining product ID and selectedVolume
      const uniqueId = `${id}_${selectedVolume}${flavor ? `_${flavor}` : ''}`;

      const existingItem = state.items.find((item) => item.id === uniqueId);

      if (existingItem) {
        existingItem.quantity += quantity;
        const calculatedTotal = existingItem.price * existingItem.quantity;
        existingItem.totalPrice = isNaN(calculatedTotal) ? 1 : calculatedTotal;
        toast.info('Cart Updated', {
          description: `Added ${quantity} more ${product.name} (${selectedVolume})${flavor ? ` - ${flavor}` : ''} to cart`,
          icon: '🛒',
        });
      } else {
        const calculatedTotal = price * quantity;
        state.items.push({
          id: uniqueId,
          originalId: id,
          ...product,
          quantity,
          selectedVolume,
          price,
          totalPrice: isNaN(calculatedTotal) ? 1 : calculatedTotal,
          isRegular,
          isWholesale,
          flavor: flavor || '',
        });
        toast.success('Added to Cart', {
          description: `${product.name} (${selectedVolume})${flavor ? ` - ${flavor}` : ''} added to cart`,
          icon: '✅',
        });
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },

    removeFromCart: (state, action) => {
      const { id, selectedVolume, flavor } = action.payload;
      const uniqueId = `${id}_${selectedVolume}${flavor ? `_${flavor}` : ''}`;
      const existingItem = state.items.find((item) => item.id === uniqueId);

      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== uniqueId);
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        toast.error('Removed from Cart', {
          description: `${existingItem.name} (${selectedVolume}) removed from cart`,
          icon: '🗑️',
        });
      }
    },

    updateQuantity: (state, action) => {
      const { id, selectedVolume, quantity, flavor } = action.payload;
      const uniqueId = `${id}_${selectedVolume}${flavor ? `_${flavor}` : ''}`;
      const item = state.items.find((item) => item.id === uniqueId);

      if (item) {
        item.quantity = quantity;
        const calculatedTotal = item.price * quantity;
        item.totalPrice = isNaN(calculatedTotal) ? 1 : calculatedTotal;

        if (item.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== uniqueId);
          toast.error('Removed from Cart', {
            description: `${item.name} (${selectedVolume}) removed from cart`,
            icon: '🗑️',
          });
        } else {
          toast.info('Cart Updated', {
            description: `${item.name} (${selectedVolume}) quantity updated to ${quantity}`,
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
