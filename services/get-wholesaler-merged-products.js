/**
 * Fetches Wholesaler Merged Products from the API with error handling and revalidation
 * @returns {Promise<Object>} Wholesaler Merged Products
 * @throws {Error} If the fetch fails
 */
export async function getWholesalerMergedProducts() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/merged-products`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      return {
        error: true,
        message: `Failed to fetch wholesaler merged products: ${res.status} ${res.statusText}`,
        data: { wholesalerMergedProducts: [] },
      };
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching wholesaler merged products:', error);
    return {
      error: true,
      message: `Failed to fetch wholesaler merged products: ${error.message}`,
      data: { wholesalerMergedProducts: [] },
      notFound: false,
    };
  }
}
