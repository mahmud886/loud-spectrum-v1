import UserAddressBook from '@/components/account/UserAddressBook';
import { getOrderAddress } from '@/services/get-order-address';

export default async function AddressBookPage() {
  const userAddressBook = await getOrderAddress();
  return (
    <>
      <UserAddressBook userAddressBook={userAddressBook?.data} />
    </>
  );
}
