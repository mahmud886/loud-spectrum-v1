'use client';

import { useRouter } from '@/i18n/navigation';
import { selectCurrentUser } from '@/lib/store/slices/authSlice';
import { MailIcon, PhoneIcon, UserIcon, UserRoundCog } from 'lucide-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function UserInformation() {
  const userInformation = useSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    if (!userInformation) {
      router.push('/login');
    }
  }, [userInformation, router]);

  return (
    <>
      {userInformation && (
        <div className="border-umbra-40 mb-8 rounded-[10px] border-1 bg-green-50 p-4">
          {userInformation?.name && (
            <h2 className="text-umbra-100 mb-2 inline-flex flex-wrap items-center justify-start gap-2 font-sans text-[15px] leading-[120%] font-normal">
              <UserIcon className="h-4 w-4" /> {userInformation.name}
            </h2>
          )}
          <div className="flex flex-row flex-wrap items-center gap-2 xl:flex-col xl:items-start xl:gap-0">
            {userInformation?.phone_number && (
              <p className="text-umbra-100 inline-flex items-center justify-start gap-2 font-mono text-[12px] leading-[130%] font-normal xl:mb-2">
                <PhoneIcon className="h-4 w-4" /> {userInformation.phone_number}
              </p>
            )}
            {userInformation?.email && (
              <p className="text-umbra-100 inline-flex items-center justify-start gap-2 font-mono text-[10px] leading-[130%] font-normal xl:mb-2">
                <MailIcon className="h-4 w-4" /> {userInformation.email}
              </p>
            )}
            {userInformation?.role && (
              <p className="text-umbra-100 mb-2 inline-flex items-center justify-start gap-2 font-mono text-[10px] leading-[130%] font-normal xl:mb-0">
                <UserRoundCog className="h-4 w-4" /> {userInformation.role}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
