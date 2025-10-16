/**
 * Fetches Product Types counts from the API with error handling and revalidation
 * @returns {Promise<Object>} Product Types counts
 * @throws {Error} If the fetch fails
 */
export async function getProductTypesCounts() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/product-type/counts`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      return {
        error: true,
        message: `Failed to fetch product types counts: ${res.status} ${res.statusText}`,
        data: { productTypesCounts: [] },
      };
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching product types counts:', error);
    return {
      error: true,
      message: `Failed to fetch product types counts: ${error.message}`,
      data: { productTypesCounts: [] },
      notFound: false,
    };
  }
}
