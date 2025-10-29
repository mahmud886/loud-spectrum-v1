'use server';
/**
 * Fetches user status from the API with error handling and revalidation
 * @param {string} authToken - The authentication token
 * @returns {Promise<Object>} The user status data
 * @throws {Error} If the fetch fails
 */
export async function getUserStatus(authToken) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-user-status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return { error: true, message: `Failed to get user status: ${response.status} ${response.statusText}`, data: {} };
  }

  const data = await response.json();
  return { error: false, message: 'User status fetched successfully', data: data.data };
}
