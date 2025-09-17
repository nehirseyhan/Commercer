import Link from 'next/link';
import { AppLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import type { ComponentProps } from 'react';

type HeaderProps = ComponentProps<'header'> & {
    children?: React.ReactNode;
}

export function Header({ children, ...props }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" {...props}>
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <AppLogo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline font-bold">Templatify</h1>
        </Link>
        {children}
      </div>
    </header>
  );
}
