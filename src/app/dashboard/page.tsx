// app/dashboard/page.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function DashboardPage() {
  // Placeholder data for the user. In a real app, you would fetch this from a database or authentication service.
  const userName = "Jane Doe";
  const shopName = "Commercer";

  return (
    <div className="relative flex min-h-screen bg-background p-4">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/warehouse.jpg')",
          opacity: 0.5,
          zIndex: -1,
        }}
      ></div>

      {/* Top Bar with Shop Name and User Profile */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <h1 className="text-2xl font-bold font-headline text-pink-500">{shopName}</h1>
        
        <div className="flex items-center space-x-4">
          <p className="text-muted-foreground hidden md:block">Welcome, <span className="text-white font-semibold">{userName}</span></p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder-avatar.png" alt="User Avatar" />
                  <AvatarFallback>{userName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    owner@commercer.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="#">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content Area (empty for now) */}
      <div className="flex-1 mt-20 p-8 space-y-8 z-10">
        {/* Your dashboard content will go here */}
      </div>
    </div>
  )
}