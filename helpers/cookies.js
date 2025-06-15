// const getCookieValue = (name) => {
//   const cookieString = document.cookie;
//   if (!cookieString) return undefined;
//   const cookies = cookieString.split(';');
//   for (let i = 0; i < cookies.length; i++) {
//     let cookie = cookies[i].trim();
//     if (cookie.startsWith(name + '=')) {
//       return cookie.substring(name.length + 1);
//     }
//   }
//   return undefined;
// };

// export { getCookieValue };

/**
 * Retrieves the value of a cookie by its name.
 * @param {string} name - The name of the cookie to retrieve
 * @returns {string|undefined} The cookie value if found, undefined otherwise
 * @throws {TypeError} If name is not a string
 */
const getCookieValue = (name) => {
  if (typeof name !== 'string') {
    throw new TypeError('Cookie name must be a string');
  }

  if (!name.trim()) {
    throw new Error('Cookie name cannot be empty');
  }

  try {
    return document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.split('=')[1];
  } catch (error) {
    console.error('Error accessing cookies:', error);
    return undefined;
  }
};

export { getCookieValue };
