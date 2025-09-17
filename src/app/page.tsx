// app/login/page.tsx

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background p-4">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://www.freepik.com/free-ai-image/3d-rendering-cartoon-welcome-door_234128792.htm#fromView=keyword&page=2&position=6&uuid=b4b55231-19f6-4ca4-9a15-56ebba1de818&query=Pretty+warehouse')", // <--- REPLACE THIS PATH
          opacity: 0.5, // 50% transparency
          zIndex: -1, // Ensures it stays behind other content
        }}
      ></div>

      {/* Site name in top-left */}
      <div className="absolute top-4 left-4 z-10"> {/* Added z-10 to ensure it's above the image */}
        <h1 className="text-2xl font-bold font-headline text-pink-500">Commercer</h1>
      </div>

      <div className="w-full max-w-md p-8 space-y-8 z-10"> {/* Added z-10 to ensure content is above the image */}
        <div className="flex flex-col items-center text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
        </div>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
              Login
            </Button>
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}