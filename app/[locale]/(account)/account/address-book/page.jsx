import UserAddressBook from '@/components/account/UserAddressBook';
import { getOrderAddress } from '@/services/get-order-address';
import { getTranslations } from 'next-intl/server';

export default async function AddressBookPage() {
  const t = await getTranslations('UserAddressBook');
  try {
    const userAddressBook = await getOrderAddress();
    // Handle error case
    if (userAddressBook?.error) {
      return (
        <div className="p-4">
          <h1 className="text-umbra-100 mb-4 font-sans text-[24px] font-normal">{t('title')}</h1>
          <div className="py-8 text-center">
            <p className="text-red-500">{t('errorMessage')}</p>
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
        <h1 className="text-umbra-100 mb-4 font-sans text-[24px] font-normal">{t('title')}</h1>
        <div className="py-8 text-center">
          <p className="text-red-500">{t('errorMessage')}</p>
        </div>
      </div>
    );
  }
}
