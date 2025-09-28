// src/features/auth/components/SignInForm.tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema, type SignInInput } from '../schemas';
import { login } from '../api';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: SignInInput) {
    setError(null);
    setLoading(true);
    try {
      const res = await login(values); // res: LoginResponse
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', res.token);
      }
      router.push('/products');
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
      <div className='mt-6'>
        <input
          type='email'
          {...form.register('email')}
          className='w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2'
          style={{ borderColor: 'rgb(var(--border))' }}
          placeholder='you@mail.com'
        />
        {form.formState.errors.email && (
          <p className='mt-1 text-xs text-red-600'>
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          type='password'
          {...form.register('password')}
          className='w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2'
          style={{ borderColor: 'rgb(var(--border))' }}
          placeholder='Password'
        />
        {form.formState.errors.password && (
          <p className='mt-1 text-xs text-red-600'>
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {error && <p className='text-sm text-red-600'>{error}</p>}

      <Button type='submit' className='w-full rounded-[8px] py-2'>
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
