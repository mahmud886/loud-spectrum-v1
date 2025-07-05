/**
 * Deletes order addresses by their IDs
 * @param {string|string[]} addressId - The ID or array of IDs of the addresses to delete
 * @param {string} authToken - The authentication token for the request
 * @returns {Promise<Object>} The response data
 * @throws {Error} If the fetch fails
 */
export const deleteOrderAddressById = async (addressId, authToken) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/address`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify({ ids: Array.isArray(addressId) ? addressId : [addressId] }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { error: false, data: data?.data };
  } catch (error) {
    console.error('Error deleting addresses:', error);
    return { error: true, message: error.message, data: { address: [] } };
  }
};
