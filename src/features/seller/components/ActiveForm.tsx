'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ActivateSellerPayload } from '@/entities/seller';
import { useMe } from '@/features/auth/hooks';

import { useActivateSeller } from '../hooks';

type FormValues = { name: string; slug?: string; address?: string };

export default function ActivateForm() {
  const router = useRouter();
  const { data: me } = useMe();
  const { mutate, isPending, isSuccess, isError, error } = useActivateSeller();

  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: { name: '', slug: '', address: '' },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (me?.role === 'SELLER') router.replace('/seller/products');
  }, [me?.role, router]);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setLogoFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  function onSubmit(values: FormValues) {
    const payload: ActivateSellerPayload = {
      name: values.name,
      slug: values.slug || undefined,
      address: values.address || undefined,
      logo: logoFile, // <-- file optional
    };
    mutate(payload, {
      onSuccess: () => setTimeout(() => router.push('/seller/products'), 400),
    });
  }

  if (isSuccess) {
    return (
      <div className='mx-auto max-w-md text-center'>
        <h2 className='mb-2 text-xl font-semibold'>Your Store is Ready!</h2>
        <p className='mb-6 text-sm text-[rgb(var(--muted))]'>
          Store created. Add products and start selling.
        </p>
        <button
          className='rounded-lg px-4 py-2 font-medium'
          style={{
            background: 'rgb(var(--primary))',
            color: 'rgb(var(--primary-foreground))',
          }}
          onClick={() => router.push('/seller/products')}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-md'>
      <h1 className='mb-4 text-2xl font-bold'>Open your store</h1>

      {isError && (
        <div className='mb-4 rounded-lg border px-3 py-2 text-sm text-red-600'>
          {error?.message ?? 'Request failed'}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <div>
          <label className='mb-1 block text-sm'>Store name</label>
          <input
            className='w-full rounded-lg border px-3 py-2'
            {...form.register('name', { required: true })}
          />
        </div>

        <div>
          <label className='mb-1 block text-sm'>Slug (optional)</label>
          <input
            className='w-full rounded-lg border px-3 py-2'
            placeholder='gadget-hub'
            {...form.register('slug')}
          />
        </div>

        <div>
          <label className='mb-1 block text-sm'>Address (optional)</label>
          <input
            className='w-full rounded-lg border px-3 py-2'
            {...form.register('address')}
          />
        </div>

        <div>
          <label className='mb-1 block text-sm'>
            Logo (PNG/JPG/WEBP, max 5MB)
          </label>
          <input
            type='file'
            accept='image/png,image/jpeg,image/webp'
            onChange={onFileChange}
          />
          {preview && (
            <Image
              src={preview}
              width={56}
              height={56}
              alt='preview'
              className='mt-2 h-14 w-14 rounded-full object-cover'
            />
          )}
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='w-full rounded-lg py-2 font-medium disabled:opacity-50'
          style={{
            background: 'rgb(var(--primary))',
            color: 'rgb(var(--primary-foreground))',
          }}
        >
          {isPending ? 'Creating…' : 'Create store'}
        </button>
      </form>
    </div>
  );
}
