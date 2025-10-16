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
      return { error: true, message: `Failed to fetch categories: ${res.status} ${res.statusText}`, categories: [] };
    }

    const data = await res.json();

    // Validate the API response structure
    if (!data || !data.data || !Array.isArray(data.data.categories)) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Invalid API response structure for categories', data);
      }
      return { error: true, message: 'Invalid API response', categories: [] };
    }

    // Check if we have valid categories
    if (data.data.categories.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log('No categories found');
      }
      return { notFound: true, message: 'No categories found', categories: [] };
    }

    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { error: true, message: error.message, categories: [] };
  }
}
