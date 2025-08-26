import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';

const WholesaleStoreLayout = ({ children }) => {
  return (
    <div className="container">
      <div className="mt-[150px] xl:mt-[170px]">
        <div className="mb-6 flex w-full flex-col items-center justify-between xl:flex-row">
          <h2 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal xl:text-[60px]">
            Wholesale Store
          </h2>
          <DynamicBreadcrumb />
        </div>
      </div>
      {children}
    </div>
  );
};

export default WholesaleStoreLayout;
