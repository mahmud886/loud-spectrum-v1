'use server';

import { cookies } from 'next/headers';

export const updateUserProfile = async (id, formData) => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if (!authToken) {
      return {
        success: false,
        message: 'Authentication token not found',
      };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users-public/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {
      success: false,
      message: error.message || 'Failed to update profile',
    };
  }
};

export const addNewAddress = async (formData) => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if (!authToken) {
      return {
        success: false,
        message: 'Authentication token not found',
      };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data: data.data };
  } catch (error) {
    console.error('Error adding new address:', error);
    return { success: false, message: error.message, data: { addresss: [] } };
  }
};

export const updateAddress = async (addressId, formData) => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if (!authToken) {
      return {
        success: false,
        message: 'Authentication token not found',
      };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error updating address:', error);
    return {
      success: false,
      message: error.message || 'Failed to update address',
    };
  }
};

export const getAddresses = async () => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if (!authToken) {
      return {
        error: true,
        message: 'Authentication token not found',
        data: { addresss: [] },
      };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { error: false, data: data?.data };
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return { error: true, message: error.message, data: { addresss: [] } };
  }
};
