import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('')
  return (
    <footer className="bg-umbra-100 text-white md:px-[80px] md:pt-[80px] md:pb-[50px]">
      {/*for desktop*/}
      <div className="hidden flex-col justify-center space-y-[150px] md:flex">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          {/* Menu, Account, and Support Sections */}
          <div className="flex max-w-[455px] justify-between text-sm">
            <div>
              <h3 className="text-white-40 mb-2 text-[14px] capitalize">{t('Menu')}</h3>
              <ul className="w-full space-y-4">
                <li>
                  <a href="#" className="footer-text">
                    {t('Shop')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('NEW')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('The_lab')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('About')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('Blog')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white-40 mb-2 text-[14px] capitalize">{t('Account')}</h3>
              <ul className="w-full space-y-4">
                <li>
                  <a href="#" className="footer-text">
                    {t('Log_in')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('Cart')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white-40 mb-2 text-[14px] capitalize">{t('Support')}</h3>
              <ul className="w-full space-y-4">
                <li>
                  <a href="#" className="footer-text">
                    {t('Shipping_&_Returns')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('Contact')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('FAQ')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button className="main-button-white h-[44px] w-[244px] rounded-full font-normal">
              {t('Wholesale_Registration')}
            </button>
            <LanguageSwitcher />
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <img src="/footer-logo.svg" alt="" />
            <div className="flex space-x-6">
              <a href="#" className="footer-text">
                {t('Youtube')}
              </a>
              <a href="#" className="footer-text">
                {t('Instagram')}
              </a>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="mt-10 flex flex-col items-center justify-between border-t border-gray-700 pt-6 text-sm text-gray-400 md:flex-row">
            <p className="text-white-100/50 font-sans text-[17px]">
              Est. 2015 &nbsp; | &nbsp; Copyright © 2024 Medical Terpenes
            </p>
            <div className="flex space-x-6">
              <a href="#" className="footer-text/50">
                {t('Quality_&_Safety')}
              </a>
              <a href="#" className="footer-text/50">
                {t('Legal')}
              </a>
              <a href="#" className="footer-text/50">
                {t('Privacy_Policy')}
              </a>
              <a href="#" className="footer-text/50">
                {t('Terms_&_Conditions')}
              </a>
            </div>
          </div>
        </div>
      </div>
      {/*for desktop*/}
      {/*============================================================================*/}
      {/*for mobile*/}
      <div className="visible mx-auto w-full px-5 md:hidden">
        <div className="flex flex-col gap-[80px] pt-[80px] pb-5">
          <div className="flex flex-col items-center justify-between">
            <div className="flex flex-col justify-between gap-10 pb-5">
              <img src="/footer-logo.svg" alt="" />
              <div className="flex space-x-6">
                <a href="#" className="footer-text">
                  {t('Youtube')}
                </a>
                <a href="#" className="footer-text">
                  {t('Instagram')}
                </a>
              </div>
            </div>
            <div className="flex w-full items-center justify-center border-t border-white/20 pt-5">
              <LanguageSwitcher />
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="mb-4 border-b border-white/20 pb-4">
              <h3 className="text-white-40 mb-2 text-[14px] capitalize">{t('Menu')}</h3>
              <ul className="w-full space-y-4">
                <li>
                  <a href="#" className="footer-text">
                    {t('Shop')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('NEW')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('The_lab')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('About')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('Blog')}
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-4 border-b border-white/20 pb-4">
              <h3 className="text-white-40 mb-2 text-[14px] capitalize">{t('Account')}</h3>
              <ul className="w-full space-y-4">
                <li>
                  <a href="#" className="footer-text">
                    {t('Log_in')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('Cart')}
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-b border-white/20 pb-4">
              <h3 className="text-white-40 mb-2 text-[14px] capitalize">{t('Support')}</h3>
              <ul className="w-full space-y-4">
                <li>
                  <a href="#" className="footer-text">
                    {t('Shipping_&_Returns')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('Contact')}
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-text">
                    {t('FAQ')}
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-5 flex w-full items-center justify-center">
              <button className="main-button-white h-[44px] w-full rounded-full font-normal">
                {t('Wholesale_Registration')}
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[40px]">
            <div className="flex flex-wrap space-x-2 gap-y-5 text-gray-500">
              <a href="#" className="text-white-100/50 font-sans text-[17px]">
                {t('Quality_&_Safety')}
              </a>
              <span>|</span>
              <a href="#" className="text-white-100/50 font-sans text-[17px]">
                {t('Legal')}
              </a>
              <span>|</span>
              <a href="#" className="text-white-100/50 font-sans text-[17px]">
                {t('Privacy_Policy')}
              </a>
              <span>|</span>
              <a href="#" className="text-white-100/50 font-sans text-[17px]">
                {t('Terms_&_Conditions')}
              </a>
            </div>
            <p className="text-white-100/50 font-sans text-[17px] leading-10">
              Est. 2015 &nbsp; | &nbsp; Copyright © 2024 Medical Terpenes
            </p>
          </div>
        </div>
      </div>
      {/*for mobile*/}
    </footer>
  );
};

export default Footer;
