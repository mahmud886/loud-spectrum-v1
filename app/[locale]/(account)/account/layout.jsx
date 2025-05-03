import SideMenuList from '@/components/account/SideMenuList';
import { MailIcon, PhoneIcon, UserIcon } from 'lucide-react';

export default function AccountLayout({ children }) {
  return (
    <div className="container pt-[150px] pb-[150px]">
      <div className="flex min-h-full flex-col gap-2 md:min-h-[80dvh] md:flex-row">
        {/* Sidebar - 20% */}
        <aside className="border-umbra-5 bg-umbra-10/20 w-full rounded-[10px] border-1 p-6 md:w-[20%]">
          {/* User Info */}
          <div className="border-umbra-40 mb-8 rounded-[10px] border-1 p-4">
            <h2 className="text-umbra-100 mb-2 inline-flex items-center justify-start gap-2 font-sans text-[20px] leading-[120%] font-normal">
              <UserIcon className="h-4 w-4" /> John Doe
            </h2>
            <div className="flex flex-row gap-2 md:flex-col md:gap-0">
              <p className="text-umbra-100 mb-2 inline-flex items-center justify-start gap-2 font-mono text-[12px] leading-[130%] font-normal">
                <PhoneIcon className="h-4 w-4" /> +1 234 567 890
              </p>
              <p className="text-umbra-100 mb-2 inline-flex items-center justify-start gap-2 font-mono text-[12px] leading-[130%] font-normal">
                <MailIcon className="h-4 w-4" /> john@example.com
              </p>
            </div>
          </div>

          <SideMenuList />
        </aside>

        {/* Main Content - 80% */}
        <main className="border-umbra-5 w-full rounded-[10px] border-1 md:w-[80%] md:p-6">{children}</main>
      </div>
    </div>
  );
}
