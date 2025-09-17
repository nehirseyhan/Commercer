// app/signup/page.tsx

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background p-4">
      {/* Site name in top-left */}
      <div className="absolute top-4 left-4">
        <h1 className="text-2xl font-bold font-headline text-pink-500">Commercer</h1>
      </div>

      <div className="w-full max-w-md p-8 space-y-8">
        <div className="flex flex-col items-center text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline">Create an Account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
        </div>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
              Create Account
            </Button>
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}