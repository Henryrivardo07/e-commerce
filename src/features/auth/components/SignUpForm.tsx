'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, type SignUpFormValues } from '../schemas';
import { registerUser } from '../api';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/lib/api';
import Image from 'next/image';
import type { RegisterPayload } from '@/entities/auth';
import { Button } from '@/components/ui/button';

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(null);

  // ⬅️ gunakan tipe dari schema (SignUpFormValues), bukan infer output transform
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      avatarUrl: '', // empty string diperbolehkan oleh schema
      avatar: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('avatar', file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ handler bertipe tepat
  const onSubmit: SubmitHandler<SignUpFormValues> = async (values) => {
    setError(null);
    setLoading(true);
    try {
      // map dari form values -> payload API
      const payload: RegisterPayload = {
        name: values.name,
        email: values.email,
        password: values.password,
        avatar: values.avatar,
        avatarUrl:
          values.avatarUrl && values.avatarUrl.length > 0
            ? values.avatarUrl
            : undefined,
      };

      await registerUser(payload);
      router.push('/signin');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
      {/* Name */}
      <div className='mt-4'>
        <input
          type='text'
          {...form.register('name')}
          className='h-14 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2'
          style={{ borderColor: 'rgb(var(--border))' }}
          placeholder='Your name'
        />
        {form.formState.errors.name && (
          <p className='mt-1 text-xs text-red-600'>
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          type='email'
          {...form.register('email')}
          className='h-14 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2'
          style={{ borderColor: 'rgb(var(--border))' }}
          placeholder='you@mail.com'
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
          className='h-14 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2'
          style={{ borderColor: 'rgb(var(--border))' }}
          placeholder='••••••••'
        />
        {form.formState.errors.password && (
          <p className='mt-1 text-xs text-red-600'>
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Avatar URL (opsional) */}
      <div>
        <input
          type='url'
          {...form.register('avatarUrl')}
          className='h-14 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2'
          style={{ borderColor: 'rgb(var(--border))' }}
          placeholder='https://example.com/avatar.png'
        />
        {form.formState.errors.avatarUrl && (
          <p className='mt-1 text-xs text-red-600'>
            {form.formState.errors.avatarUrl.message}
          </p>
        )}
      </div>

      {/* Avatar upload (file) */}
      <div>
        <input type='file' accept='image/*' onChange={handleFileChange} />
        {preview && (
          <Image
            src={preview}
            alt='preview'
            width={80}
            height={80}
            className='mt-2 h-20 w-20 rounded-full object-cover'
          />
        )}
      </div>

      {error && <p className='text-sm text-red-600'>{error}</p>}

      <Button type='submit' className='w-full rounded-[8px] py-2'>
        {loading ? 'Creating...' : 'Create account'}
      </Button>
    </form>
  );
}
