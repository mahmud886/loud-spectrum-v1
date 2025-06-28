import UserAddressBook from '@/components/account/UserAddressBook';
import { getOrderAddress } from '@/services/get-order-address';

export default async function AddressBookPage() {
  try {
    const userAddressBook = await getOrderAddress();
    // Handle error case
    if (userAddressBook?.error) {
      return (
        <div className="p-4">
          <h1 className="text-umbra-100 mb-4 font-sans text-[24px] font-normal">Address Book</h1>
          <div className="py-8 text-center">
            <p className="text-red-500">Failed to load addresses. Please try again later.</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <UserAddressBook userAddressBook={userAddressBook?.data} />
      </>
    );
  } catch (error) {
    console.error('Address book page error:', error);
    return (
      <div className="p-4">
        <h1 className="text-umbra-100 mb-4 font-sans text-[24px] font-normal">Address Book</h1>
        <div className="py-8 text-center">
          <p className="text-red-500">Something went wrong. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }
}
