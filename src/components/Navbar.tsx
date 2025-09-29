'use client';

import { Menu, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Icon_Catalog from '@/assets/icon/icon_catalog.svg';
import Icon_Store from '@/assets/icon/icon_store.svg';
import Logo from '@/assets/icon/logo.svg';

import { Button } from './ui/button';
import { SheetTrigger, SheetContent, SheetClose, Sheet } from './ui/sheet';

/**
 * NOTE:
 * - Untuk sementara, data dummy di bawah (cartCount, user, isSeller).
 * - Nanti ganti jadi props/context (ambil dari /api/me dan /api/cart).
 */
export default function Navbar() {
  const cartCount = 6; // TODO: ganti dari state cart
  const isSeller = false; // TODO: ganti dari profil user
  const user = {
    name: 'John Doe',
    avatarUrl:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&h=80&fit=crop&crop=faces',
  }; // TODO: null kalau belum login
  type NavItem = { label: string; href: string };

  const navigationData: NavItem[] = [
    { label: 'Catalog', href: '/products' },
    { label: 'Cart', href: '/cart' },

    ...(isSeller
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
    <header
      className='sticky top-0 z-40 h-16 bg-[rgb(var(--bg))] shadow-[var(--shadow-navbar)] backdrop-blur md:h-[84px]'
      // tanpa border, karena desain pakai shadow
    >
      <div className='custom-container flex h-full w-full items-center sm:justify-center'>
        {/* === Left: Logo === */}
        <div>
          <Link href='/' className='flex items-center gap-2'>
            {/* placeholder logo, ganti dengan asset kamu */}
            <Image src={Logo} alt='logo' width={42} height={42} />
            <span className='md:display-xs-bold hidden pr-[54px] md:block'>
              Shirt
            </span>
          </Link>
        </div>

        {/* Catalog + search */}
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
          {/* search */}
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

        {/* === Right: Cart + Store + User === */}
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
              {cartCount > 0 && (
                <span
                  className='absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full text-[11px] font-semibold text-white'
                  style={{ background: '#EF476F' }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className='hidden items-center gap-3 sm:flex'>
            {/* Open Store / My Store */}
            <Link
              href={isSeller ? '/seller/products' : '/seller/activate'}
              className='hidden items-center gap-2 truncate rounded-full border border-neutral-300 px-3 py-2 text-sm sm:inline-flex'
            >
              <Image alt='icon_store' src={Icon_Store} width={20} height={20} />
              <span className='text-sm-bold truncate'>
                {isSeller ? 'My Store' : 'Open Store'}
              </span>
            </Link>

            {/* User chip (if logged in) */}
            {user ? (
              <Link
                href='/account'
                className='hidden items-center gap-2 rounded-full border border-neutral-300 px-3 py-2 sm:inline-flex'
                title={user.name}
              >
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={28}
                  height={28}
                  className='rounded-full object-cover'
                />
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

        {/* hamburger */}
        {/* Mobile-only hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Menu className='cursor-pointer lg:hidden' />
          </SheetTrigger>
          <SheetContent>
            <nav className='mt-16'>
              <ul className='flex flex-col gap-4'>
                {navigationData.map((data) => (
                  <li key={data.label}>
                    <SheetClose asChild>
                      <Link
                        href={data.href}
                        className='hover:text-primary-200 py-4'
                      >
                        {data.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>

            <Button asChild className='mt-3 w-full'>
              <SheetClose asChild>
                <Link href='#contact'>Get Started</Link>
              </SheetClose>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
