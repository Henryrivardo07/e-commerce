'use client';

import { Menu, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';

import Icon_Catalog from '@/assets/icon/icon_catalog.svg';
import Icon_Store from '@/assets/icon/icon_store.svg';
import Logo from '@/assets/icon/logo.svg';
import { useMe } from '@/features/auth/hooks';
import { useCartCount } from '@/features/cart/hooks';
import { useMyShop } from '@/features/seller/hooks';
import { getToken } from '@/lib/auth';

/* ---------- utils ---------- */
function useHydrated() {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);
  return hydrated;
}

function Avatar({
  name,
  src,
  size = 28,
}: {
  name?: string | null;
  src?: string | null;
  size?: number;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name ?? 'avatar'}
        width={size}
        height={size}
        className='rounded-full object-cover'
      />
    );
  }
  const initials = (name ?? 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');
  return (
    <div
      className='grid place-items-center rounded-full'
      style={{
        width: size,
        height: size,
        background: 'rgb(var(--color-gray-200))',
        color: 'rgb(var(--color-gray-700))',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {initials || 'U'}
    </div>
  );
}

type NavItem = { label: string; href: string };

export default function Navbar() {
  const hydrated = useHydrated();
  const tokenReady = hydrated && !!getToken();

  const { data: me, isLoading: meLoading } = useMe();
  const { data: shop } = useMyShop(tokenReady); // <- enabled pakai token

  const hasToken =
    typeof window !== 'undefined' && !!localStorage.getItem('token');
  const { data: cartCount = 0 } = useCartCount(!!me || hasToken);

  const user = me ?? null;

  const storeHref = user
    ? shop
      ? '/seller/products'
      : '/seller/activate'
    : '/signin?next=/seller/activate';
  const storeLabel = shop ? 'My Store' : 'Open Store';
  const storeLogo = shop?.logo ?? null;

  // Mobile menu data
  const navigationData: NavItem[] = [
    { label: 'Catalog', href: '/products' },
    { label: 'Cart', href: '/cart' },
    ...(shop
      ? [{ label: 'My Store', href: '/seller/products' }]
      : [{ label: 'Open Store', href: '/seller/activate' }]),
    ...(user
      ? [
          { label: 'Orders', href: '/orders' },
          { label: 'Account', href: '/account' },
        ]
      : [{ label: 'Sign in', href: '/signin' }]),
  ];

  return (
    <header className='sticky top-0 z-40 h-16 bg-[rgb(var(--bg))] shadow-[var(--shadow-navbar)] backdrop-blur md:h-[84px]'>
      <div className='custom-container flex h-full w-full items-center sm:justify-center'>
        {/* Left: Logo */}
        <div>
          <Link href='/' className='flex items-center gap-2'>
            <Image src={Logo} alt='logo' width={42} height={42} priority />
            <span className='md:display-xs-bold hidden md:block'>Shirt</span>
          </Link>
        </div>

        {/* Catalog + Search */}
        <div className='ml-[16px] flex items-center gap-3 md:mr-[46px] md:ml-[46px]'>
          <Link
            href='/products'
            className='inline-flex h-11 items-center gap-2 rounded-[12px] border border-neutral-300 px-4 py-3'
          >
            <Image
              src={Icon_Catalog}
              width={20}
              height={20}
              alt='icon_catalog'
            />
            <p className='text-sm-regular hidden text-neutral-950 md:block'>
              Catalog
            </p>
          </Link>

          <label className='flex h-11 items-center gap-2 rounded-[12px] border border-neutral-300 px-4 md:w-[491px]'>
            <Search size={20} className='opacity-60' />
            <input
              type='search'
              placeholder='Search'
              aria-label='Search products'
              className='w-full bg-transparent text-sm outline-none md:text-base'
              style={{ color: 'rgb(var(--fg))' }}
            />
          </label>
        </div>

        {/* Right: Cart + Store + User */}
        <div className='flex items-center'>
          {/* Cart */}
          <div>
            <Link
              href='/cart'
              className='relative mr-5 inline-flex items-center justify-center rounded-full p-2 hover:opacity-90'
              aria-label='Cart'
              title='Cart'
            >
              <ShoppingCart width={24} />
              {hydrated && tokenReady && (cartCount ?? 0) > 0 && (
                <span
                  className='absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full text-[11px] font-semibold text-white'
                  style={{ background: '#EF476F' }}
                >
                  {(cartCount as number) > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Store + User (desktop) */}
          <div className='hidden items-center gap-3 sm:flex'>
            {/* Store chip */}
            <Link
              href={storeHref}
              className='hidden items-center gap-2 truncate rounded-full border border-neutral-300 px-3 py-2 text-sm sm:inline-flex'
              title={storeLabel}
            >
              {storeLogo ? (
                <Image
                  src={storeLogo}
                  alt='store-logo'
                  width={20}
                  height={20}
                  className='rounded-full object-cover'
                />
              ) : (
                <Image
                  alt='icon_store'
                  src={Icon_Store}
                  width={20}
                  height={20}
                />
              )}
              <span className='text-sm-bold truncate'>{storeLabel}</span>
            </Link>

            {/* User area */}
            {!hydrated || meLoading ? (
              <div className='hidden items-center gap-2 rounded-full border border-neutral-300 px-3 py-2 sm:flex'>
                <div className='h-7 w-7 animate-pulse rounded-full bg-[rgb(var(--color-gray-200))]' />
                <div className='h-3 w-16 animate-pulse rounded bg-[rgb(var(--color-gray-200))]' />
              </div>
            ) : user ? (
              <Link
                href='/account'
                className='hidden items-center gap-2 rounded-full border border-neutral-300 px-3 py-2 sm:inline-flex'
                title={user.name}
              >
                <Avatar name={user.name} src={user.avatarUrl} />
                <span
                  className='text-sm-bold truncate'
                  style={{ color: 'rgb(var(--fg))' }}
                >
                  {user.name}
                </span>
              </Link>
            ) : (
              <Link
                href='/signin'
                className='inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium'
                style={{
                  borderColor: 'rgb(var(--border))',
                  color: 'rgb(var(--fg))',
                }}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Menu className='cursor-pointer lg:hidden' />
          </SheetTrigger>
          <SheetContent>
            <nav className='mt-16'>
              <ul className='flex flex-col gap-4'>
                {navigationData.map((item) => (
                  <li key={item.label}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className='hover:text-primary-200 py-4'
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>

            <Button asChild className='mt-3 w-full'>
              <SheetClose asChild>
                <Link href='/products'>Get Started</Link>
              </SheetClose>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
