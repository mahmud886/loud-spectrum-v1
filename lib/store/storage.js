import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// More robust window check to prevent hydration issues
const isClient = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const storage = isClient ? createWebStorage('local') : createNoopStorage();

export default storage;
