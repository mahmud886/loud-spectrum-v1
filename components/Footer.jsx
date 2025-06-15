'use client';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('');
  return (
    <footer className="bg-umbra-100 text-white md:pt-[80px] md:pb-[50px]">
      <div className="container px-5 md:px-[40px] lg:px-[40px] xl:px-[80px] 2xl:px-[320px]">
        {/*for desktop*/}
        <div className="hidden flex-col justify-center space-y-[150px] md:flex">
          <div className="mx-auto grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            {/* Menu, Account, and Support Sections */}
            <div className="flex max-w-[455px] justify-between text-sm">
              <div>
                <h3 className="text-white-40 mb-2 text-[14px] capitalize">{t('Menu')}</h3>
                <ul className="w-full space-y-4">
                  <li>
                    <Link href={`/shop`} className="footer-text">
                      {t('Shop')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/new`} className="footer-text">
                      {t('NEW')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/lab`} className="footer-text">
                      {t('The_lab')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/about`} className="footer-text">
                      {t('About')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/blog`} className="footer-text">
                      {t('Blog')}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white-40 mb-2 text-[14px] capitalize">{t('Account')}</h3>
                <ul className="w-full space-y-4">
                  <li>
                    <Link href={`/login`} className="footer-text">
                      {t('Log_in')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/cart`} className="footer-text">
                      {t('Cart')}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white-40 mb-2 text-[14px] capitalize">{t('Support')}</h3>
                <ul className="w-full space-y-4">
                  <li>
                    <Link href={`/shipping-returns`} className="footer-text">
                      {t('Shipping_&_Returns')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/contact`} className="footer-text">
                      {t('Contact')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/faq`} className="footer-text">
                      {t('FAQ')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Link
                href="/wholesale-registration"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/wholesale-registration#wholesale-form';
                }}
                className="main-button-white inline-flex h-[44px] w-[244px] items-center justify-center rounded-full font-normal"
              >
                {t('Wholesale_Registration')}
              </Link>
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
                <Link href={`/quality-safety`} className="footer-text2">
                  {t('Quality_&_Safety')}
                </Link>
                <Link href={`/legal`} className="footer-text2">
                  {t('Legal')}
                </Link>
                <Link href={`/privacy-policy`} className="footer-text2">
                  {t('Privacy_Policy')}
                </Link>
                <Link href={`/terms-and-conditions`} className="footer-text2">
                  {t('Terms_&_Conditions')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/*for desktop*/}
        {/*============================================================================*/}
        {/*for mobile*/}
        <div className="visible mx-auto w-full md:hidden">
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
                    <Link href={`/shop`} className="footer-text">
                      {t('Shop')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/new`} className="footer-text">
                      {t('NEW')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/lab`} className="footer-text">
                      {t('The_lab')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/about`} className="footer-text">
                      {t('About')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/blog`} className="footer-text">
                      {t('Blog')}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="mb-4 border-b border-white/20 pb-4">
                <h3 className="text-white-40 mb-2 text-[14px] capitalize">{t('Account')}</h3>
                <ul className="w-full space-y-4">
                  <li>
                    <Link href={`/login`} className="footer-text">
                      {t('Log_in')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/cart`} className="footer-text">
                      {t('Cart')}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="border-b border-white/20 pb-4">
                <h3 className="text-white-40 mb-2 text-[14px] capitalize">{t('Support')}</h3>
                <ul className="w-full space-y-4">
                  <li>
                    <Link href={`/shipping-returns`} className="footer-text">
                      {t('Shipping_&_Returns')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/contact`} className="footer-text">
                      {t('Contact')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/faq`} className="footer-text">
                      {t('FAQ')}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-5 flex w-full items-center justify-center">
                <Link
                  href="/wholesale-registration"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/wholesale-registration#wholesale-form';
                  }}
                  className="main-button-white inline-flex h-[44px] w-full items-center justify-center rounded-full font-normal"
                >
                  {t('Wholesale_Registration')}
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[40px]">
              <div className="flex flex-wrap space-x-2 gap-y-5 text-gray-500">
                <Link href={`/quality-safety`} className="footer-text2">
                  {t('Quality_&_Safety')}
                </Link>
                <Link href={`/legal`} className="footer-text2">
                  {t('Legal')}
                </Link>
                <Link href={`/privacy-policy`} className="footer-text2">
                  {t('Privacy_Policy')}
                </Link>
                <Link href={`/terms-and-conditions`} className="footer-text2">
                  {t('Terms_&_Conditions')}
                </Link>
              </div>
              <p className="text-white-100/50 font-sans text-[17px] leading-10">
                Est. 2015 &nbsp; | &nbsp; Copyright © 2024 Medical Terpenes
              </p>
            </div>
          </div>
        </div>
        {/*for mobile*/}
      </div>
    </footer>
  );
};

export default Footer;
