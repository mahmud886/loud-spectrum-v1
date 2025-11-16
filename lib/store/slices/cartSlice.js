import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { openCartDrawer } from './uiSlice';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

// Thunk for adding to cart and opening drawer
export const addToCartAndOpenDrawer = createAsyncThunk('cart/addToCartAndOpenDrawer', async (payload, { dispatch }) => {
  // First dispatch the addToCart action
  dispatch(addToCart(payload));
  // Then open the cart drawer
  dispatch(openCartDrawer());
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      try {
        // Ensure state.items is always an array
        if (!Array.isArray(state.items)) {
          console.warn('Cart state corrupted: items is not an array, resetting...', state.items);
          state.items = [];
        }

        const { id, product, quantity, selectedVolume, price, isRegular, isWholesale, flavor, remarks } =
          action.payload;

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
            remarks: remarks || '',
          });
          toast.success('Added to Cart', {
            description: `${product.name} (${selectedVolume})${flavor ? ` - ${flavor}` : ''} added to cart`,
            icon: '✅',
          });
        }

        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      } catch (error) {
        console.error('Error in addToCart reducer:', error);
        // Reset to safe state
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
        toast.error('Cart Error', {
          description: 'There was an error updating your cart. Please try again.',
          icon: '⚠️',
        });
      }
    },

    removeFromCart: (state, action) => {
      try {
        // Ensure state.items is always an array
        if (!Array.isArray(state.items)) {
          console.warn('Cart state corrupted: items is not an array, resetting...', state.items);
          state.items = [];
        }

        const { id, selectedVolume, flavor } = action.payload;

        // For wholesale items, use the original ID directly since it's already unique
        // For regular items, construct the unique ID as before
        const uniqueId = id.startsWith('wholesale-') ? id : `${id}_${selectedVolume}${flavor ? `_${flavor}` : ''}`;

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
      } catch (error) {
        console.error('Error in removeFromCart reducer:', error);
        // Reset to safe state
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
        toast.error('Cart Error', {
          description: 'There was an error updating your cart. Please try again.',
          icon: '⚠️',
        });
      }
    },

    updateQuantity: (state, action) => {
      try {
        // Ensure state.items is always an array
        if (!Array.isArray(state.items)) {
          console.warn('Cart state corrupted: items is not an array, resetting...', state.items);
          state.items = [];
        }

        const { id, selectedVolume, quantity, flavor } = action.payload;

        // For wholesale items, use the original ID directly since it's already unique
        // For regular items, construct the unique ID as before
        const uniqueId = id.startsWith('wholesale-') ? id : `${id}_${selectedVolume}${flavor ? `_${flavor}` : ''}`;

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
      } catch (error) {
        console.error('Error in updateQuantity reducer:', error);
        // Reset to safe state
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
        toast.error('Cart Error', {
          description: 'There was an error updating your cart. Please try again.',
          icon: '⚠️',
        });
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

    // Add a new action to reset cart state if it gets corrupted
    resetCartState: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, resetCartState } = cartSlice.actions;

// Safe selectors to ensure components always get valid state
export const selectCartItems = (state) => {
  if (!state?.cart?.items || !Array.isArray(state.cart.items)) {
    return [];
  }
  return state.cart.items;
};

export const selectCartTotalQuantity = (state) => {
  if (!state?.cart?.totalQuantity || typeof state.cart.totalQuantity !== 'number') {
    return 0;
  }
  return state.cart.totalQuantity;
};

export const selectCartTotalAmount = (state) => {
  if (!state?.cart?.totalAmount || typeof state.cart.totalAmount !== 'number') {
    return 0;
  }
  return state.cart.totalAmount;
};

export const selectCartState = (state) => {
  if (!state?.cart) {
    return {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    };
  }

  return {
    items: Array.isArray(state.cart.items) ? state.cart.items : [],
    totalQuantity: typeof state.cart.totalQuantity === 'number' ? state.cart.totalQuantity : 0,
    totalAmount: typeof state.cart.totalAmount === 'number' ? state.cart.totalAmount : 0,
  };
};

// Selector to get simplified cart products (memoized to avoid unnecessary rerenders)
export const selectSimplifiedCartProducts = createSelector([selectCartItems], (items) =>
  items.map((item) => ({
    Volume: item?.selectedVolume ?? '',
    Price: typeof item?.price === 'number' ? item.price : 0,
    quantity: typeof item?.quantity === 'number' ? item.quantity : 0,
    totalPrice: typeof item?.totalPrice === 'number' ? item.totalPrice : 0,
    selectedVolume: item?.selectedVolume ?? '',
    category_name: item?.category_name ?? '',
  })),
);

// Utility function to debug cart state
export const debugCartState = (state) => {
  console.log('Current cart state:', state?.cart);
  if (state?.cart && !Array.isArray(state.cart.items)) {
    console.warn('Cart state corrupted: items is not an array', state.cart.items);
    return false;
  }
  return true;
};

// Development utility to clear corrupted cart data from localStorage
export const clearCorruptedCartData = () => {
  if (typeof window !== 'undefined') {
    try {
      const cartData = localStorage.getItem('persist:root');
      if (cartData) {
        const parsedData = JSON.parse(cartData);
        if (parsedData.cart) {
          const cartState = JSON.parse(parsedData.cart);
          if (!Array.isArray(cartState.items)) {
            console.log('Clearing corrupted cart data from localStorage...');
            delete parsedData.cart;
            localStorage.setItem('persist:root', JSON.stringify(parsedData));
            console.log('Corrupted cart data cleared. Please refresh the page.');
            return true;
          }
        }
      }
    } catch (error) {
      console.error('Error clearing corrupted cart data:', error);
    }
  }
  return false;
};

// Make the utility available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.clearCorruptedCartData = clearCorruptedCartData;
}

export default cartSlice.reducer;
