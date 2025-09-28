'use client';

import { Grid2X2, Search, ShoppingCart, Store } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <header
      className='sticky top-0 z-40 h-16 bg-[rgb(var(--bg))] shadow-[var(--shadow-navbar)] backdrop-blur md:h-[84px]'
      // tanpa border, karena desain pakai shadow
    >
      <div className='custom-container flex h-full items-center gap-3 md:gap-4'>
        {/* === Left: Logo === */}
        <Link href='/' className='flex shrink-0 items-center gap-2'>
          {/* placeholder logo, ganti dengan asset kamu */}
          <span className='inline-grid h-8 w-8 place-items-center rounded-full bg-black text-white dark:bg-white dark:text-black'>
            ✶
          </span>
          <span
            className='text-lg font-semibold md:text-xl'
            style={{ color: 'rgb(var(--fg))' }}
          >
            Shirt
          </span>
        </Link>

        {/* Catalog (hidden on xs) */}
        <Link
          href='/products'
          className='hidden items-center gap-2 rounded-full border px-3 py-2 text-sm sm:inline-flex'
          style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--fg))' }}
        >
          <Grid2X2 size={16} />
          Catalog
        </Link>

        {/* === Middle: Search === */}
        <div className='min-w-0 flex-1'>
          <label
            className='flex items-center gap-2 rounded-2xl border px-3 py-2 md:px-4 md:py-3'
            style={{
              borderColor: 'rgb(var(--border))',
              background: 'rgb(var(--bg))',
            }}
          >
            <Search size={18} className='opacity-60' />
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
        {/* Cart */}
        <Link
          href='/cart'
          className='relative inline-flex items-center justify-center rounded-full p-2 hover:opacity-90'
          aria-label='Cart'
          title='Cart'
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span
              className='absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full text-[11px] font-semibold text-white'
              style={{ background: '#EF476F' }}
            >
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>

        {/* Open Store / My Store */}
        <Link
          href={isSeller ? '/seller/products' : '/seller/activate'}
          className='hidden max-w-[180px] items-center gap-2 truncate rounded-full border px-3 py-2 text-sm sm:inline-flex'
          style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--fg))' }}
        >
          <Store size={16} />
          <span className='truncate'>
            {isSeller ? 'My Store' : 'Open Store'}
          </span>
        </Link>

        {/* User chip (if logged in) */}
        {user ? (
          <Link
            href='/account'
            className='hidden items-center gap-3 rounded-full border py-1 pr-3 pl-1 sm:inline-flex'
            style={{ borderColor: 'rgb(var(--border))' }}
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
              className='max-w-[120px] truncate text-sm font-medium'
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
    </header>
  );
}
