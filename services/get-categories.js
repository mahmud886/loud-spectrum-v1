/**
 * Fetches categories from the API with error handling and revalidation
 * @returns {Promise<Object>} The categories data
 * @throws {Error} If the fetch fails
 */
export async function getCategories() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again later.');
  }
}
