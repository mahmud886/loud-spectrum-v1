/**
 * Fetches product details from the API with error handling and revalidation
 * @param {string} slug - The slug of the product to fetch
 * @returns {Promise<Object>} The product details data
 * @throws {Error} If the fetch fails
 */
export async function getProductDetails(slug) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/get-product-by-slug/${slug}`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product details: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Validate the API response structure
    if (!data || !data.data || !Array.isArray(data.data.products)) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Invalid API response structure for product slug: ${slug}`, data);
      }
      return { notFound: true, message: 'Invalid API response', data: { products: [], count: 0 } };
    }

    // Check if we have a valid product
    const product = data.data.products[0];

    // If products array is empty or no product found, return not found
    if (data.data.products.length === 0 || !product || Object.keys(product).length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Product not found for slug: ${slug}`);
      }
      return { notFound: true, message: 'Product not found', data: { products: [], count: 0 } };
    }

    // Additional validation: check if the product has required fields
    if (!product._id || !product.name) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Invalid product data for slug: ${slug}`, product);
      }
      return { notFound: true, message: 'Invalid product data', data: { products: [], count: 0 } };
    }

    return product;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return { error: true, message: error.message, data: { products: [], count: 0 }, notFound: false };
  }
}
