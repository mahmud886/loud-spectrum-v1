import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';

const LoginRegister = () => {
  return (
    <Tabs defaultValue="login" className="mx-auto mt-10 w-full max-w-full">
      <TabsList className="bg-umbra-5 flex min-h-[60px] w-full rounded-full border-b border-gray-200 px-1">
        <TabsTrigger
          value="login"
          className="data-[state=active]:border-umbra-40 data-[state=active]:text-white-100 data-[state=active]:bg-umbra-100 text-umbra-100 cursor-pointer rounded-full"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="register"
          className="data-[state=active]:border-umbra-40 data-[state=active]:text-white-100 data-[state=active]:bg-umbra-100 text-umbra-100 cursor-pointer rounded-full"
        >
          Register
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
