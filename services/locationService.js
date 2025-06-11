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

    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
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

    if (!response.ok) {
      throw new Error('Failed to fetch states');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching states:', error);
    throw error;
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

    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};
