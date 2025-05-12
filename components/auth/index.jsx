import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';

const LoginRegister = () => {
  const t = useTranslations('LoginPage');
  return (
    <Tabs defaultValue="login" className="mx-auto mt-10 w-full max-w-full">
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

export default LoginRegister;
