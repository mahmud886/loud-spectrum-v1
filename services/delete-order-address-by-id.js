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
