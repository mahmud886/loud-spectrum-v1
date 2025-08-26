import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search, User } from 'lucide-react';
import Link from 'next/link';

export default function AccountNotFound() {
  return (
    <div className="mx-auto w-full max-w-full p-4 xl:p-0">
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-8 w-8 text-gray-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900">Page Not Found</CardTitle>
            <CardDescription className="text-gray-600">
              The page you're looking for doesn't exist in your account area.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-sm text-gray-600">
                Please check the URL or navigate to one of the available account pages.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Link href="/account">
                <Button className="w-full" variant="default">
                  <User className="mr-2 h-4 w-4" />
                  My Account
                </Button>
              </Link>
              <Link href="/">
                <Button className="w-full" variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
