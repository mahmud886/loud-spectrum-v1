const API_BASE_URL = 'https://api.countrystatecity.in/v1';

/**
 * Fetches all countries
 * @returns {Promise<Array>} List of countries
 */
export const getCountries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`, {
      headers: {
        accept: 'application/json',
        'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_COUNTRY_STATE_CITY_API_KEY,
      },
    });

    // console.log(response);

    if (!response.ok) {
      return { error: true, message: 'Failed to fetch countries', data: { countries: [] }, notFound: false };
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    return { error: true, message: error.message, data: { countries: [] }, notFound: false };
  }
};

/**
 * Fetches states for a specific country
 * @param {string} countryCode - The country code (e.g., 'US')
 * @returns {Promise<Array>} List of states
 */
export const getStates = async (countryCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries/${countryCode}/states`, {
      headers: {
        accept: 'application/json',
        'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_COUNTRY_STATE_CITY_API_KEY,
      },
    });

    // console.log(response);

    if (!response.ok) {
      return { error: true, message: 'Failed to fetch states', data: { states: [] }, notFound: false };
    }

    const data = await response.json();
    return { error: false, data, notFound: false };
  } catch (error) {
    console.error('Error fetching states:', error);
    return { error: true, message: error.message, data: { states: [] }, notFound: false };
  }
};

/**
 * Fetches cities for a specific state in a country
 * @param {string} countryCode - The country code (e.g., 'US')
 * @param {string} stateCode - The state code (e.g., 'CA')
 * @returns {Promise<Array>} List of cities
 */
export const getCities = async (countryCode, stateCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`, {
      headers: {
        accept: 'application/json',
        'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_COUNTRY_STATE_CITY_API_KEY,
      },
    });

    // console.log(response);

    if (!response.ok) {
      return { error: true, message: 'Failed to fetch cities', data: { cities: [] }, notFound: false };
    }

    const data = await response.json();
    return { error: false, data, notFound: false };
  } catch (error) {
    console.error('Error fetching cities:', error);
    return { error: true, message: error.message, data: { cities: [] }, notFound: false };
  }
};
