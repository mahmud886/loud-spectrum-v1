'use client';

import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const LoginRegisterContent = () => {
  const t = useTranslations('LoginPage');
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab') || 'login';
  const defaultTab = tab === 'register' ? 'register' : 'login';

  return (
    <Tabs defaultValue={defaultTab} className="mx-auto mt-10 w-full max-w-full">
      <TabsList className="bg-umbra-5 border-umbra-10 flex min-h-[60px] w-full rounded-full border px-1">
        <TabsTrigger
          value="login"
          className="data-[state=active]:border-umbra-40 data-[state=active]:text-white-100 data-[state=active]:bg-umbra-100 text-umbra-100 cursor-pointer rounded-full"
        >
          {t('login')}
        </TabsTrigger>
        <TabsTrigger
          value="register"
          className="data-[state=active]:border-umbra-40 data-[state=active]:text-white-100 data-[state=active]:bg-umbra-100 text-umbra-100 cursor-pointer rounded-full"
        >
          {t('register')}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <div className="mt-4">
          <Login />
        </div>
      </TabsContent>
      <TabsContent value="register">
        <div className="mt-4">
          <Register />
        </div>
      </TabsContent>
    </Tabs>
  );
};

const LoginRegister = () => {
  return (
    <Suspense fallback={<div className="mx-auto mt-10 w-full max-w-full">Loading...</div>}>
      <LoginRegisterContent />
    </Suspense>
  );
};

export default LoginRegister;
