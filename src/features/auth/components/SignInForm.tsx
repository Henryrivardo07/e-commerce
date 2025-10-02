// src/features/auth/components/SignInForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { getErrorMessage } from '@/lib/api';

import { useLogin } from '../hooks'; // <-- pakai hook TanStack Query
import { SignInSchema, type SignInInput } from '../schemas';

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams(); // ⬅️ ambil query params

  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const { mutateAsync: signIn, isPending } = useLogin();
  const getSafeNext = React.useCallback(() => {
    const n = searchParams?.get('next') || '';
    return n.startsWith('/') ? n : '/products';
  }, [searchParams]);

  async function onSubmit(values: SignInInput) {
    setError(null);
    try {
      await signIn(values); // token diset di useLogin.onSuccess
      router.push(getSafeNext()); // ⬅️ redirect hormati ?next=
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
      {/* Email */}
      <div className='mt-6'>
        <input
          type='email'
          {...form.register('email')}
          className='w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2'
          style={{ borderColor: 'rgb(var(--border))' }}
          placeholder='you@mail.com'
          autoComplete='email'
        />
        {form.formState.errors.email && (
          <p className='mt-1 text-xs text-red-600'>
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          type='password'
          {...form.register('password')}
          className='w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2'
          style={{ borderColor: 'rgb(var(--border))' }}
          placeholder='Password'
          autoComplete='current-password'
        />
        {form.formState.errors.password && (
          <p className='mt-1 text-xs text-red-600'>
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Error global */}
      {error && <p className='text-sm text-red-600'>{error}</p>}

      <Button
        type='submit'
        className='w-full rounded-[8px] py-2'
        disabled={isPending}
      >
        {isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
