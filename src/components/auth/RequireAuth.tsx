// src/components/auth/RequireAuth.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useMe } from '@/features/auth/hooks';

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: me, isLoading } = useMe();

  useEffect(() => {
    if (!isLoading && !me) {
      const next = encodeURIComponent(window.location.pathname);
      router.replace(`/signin?next=${next}`);
    }
  }, [isLoading, me, router]);

  if (isLoading) return null; // bisa taruh skeleton kalau mau
  if (!me) return null; // sebentar kosong, langsung di-redirect

  return <>{children}</>;
}
