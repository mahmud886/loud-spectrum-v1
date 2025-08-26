import SideMenuList from '@/components/account/SideMenuList';
import UserInformation from '@/components/account/UserInformation';

export default function AccountLayout({ children }) {
  return (
    <div className="container pt-[150px] pb-[150px]">
      <div className="flex min-h-full flex-col gap-2 xl:min-h-[80dvh] xl:flex-row">
        {/* Sidebar - 20% */}
        <aside className="border-umbra-5 bg-umbra-10/20 w-full rounded-[10px] border-1 xl:w-[20%]">
          {/* User Info */}
          <UserInformation />
          <SideMenuList />
        </aside>

        {/* Main Content - 80% */}
        <main className="border-umbra-5 w-full rounded-[10px] border-1 xl:w-[80%] xl:p-6">{children}</main>
      </div>
    </div>
  );
}
