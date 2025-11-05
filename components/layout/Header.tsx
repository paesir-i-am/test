'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">쑤카</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/vehicles"
            className={cn(
              'transition-colors hover:text-foreground/80',
              isActive('/vehicles') ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            차량 둘러보기
          </Link>
          {user ? (
            <>
              <Link
                href="/vehicles/my"
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  isActive('/vehicles/my') ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                내 차량
              </Link>
              <Link
                href="/favorites"
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  isActive('/favorites') ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                찜한 차량
              </Link>
              <Link
                href="/profile"
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  isActive('/profile') ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                프로필
              </Link>
              <Button variant="ghost" onClick={logout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">로그인</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">회원가입</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-2">
            <Link
              href="/vehicles"
              className="block py-2 text-sm font-medium transition-colors hover:text-foreground/80"
              onClick={() => setIsMenuOpen(false)}
            >
              차량 둘러보기
            </Link>
            {user ? (
              <>
                <Link
                  href="/vehicles/my"
                  className="block py-2 text-sm font-medium transition-colors hover:text-foreground/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  내 차량
                </Link>
                <Link
                  href="/favorites"
                  className="block py-2 text-sm font-medium transition-colors hover:text-foreground/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  찜한 차량
                </Link>
                <Link
                  href="/profile"
                  className="block py-2 text-sm font-medium transition-colors hover:text-foreground/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  프로필
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    로그인
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    회원가입
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
