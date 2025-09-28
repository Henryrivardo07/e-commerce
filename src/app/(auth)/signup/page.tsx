import SignUpForm from '@/features/auth/components/SignUpForm';

export default function Page() {
  return (
    <main className='custom-container flex min-h-screen items-center justify-center'>
      <div
        className='mx-auto w-full max-w-md rounded-2xl border p-6'
        style={{
          borderColor: 'rgb(var(--border))',
          background: 'rgb(var(--bg))',
        }}
      >
        <h1 className='display-xs-bold'>Register</h1>
        <p className='text-sm-regular md:text-md-regular'>
          Just a few steps away from your next favorite purchase
        </p>
        <SignUpForm />
        <p className='text-sm-regular md:text-md-regular mt-4 text-center'>
          Already have an account?
          <a href='/signin' className='text-sm-bold md:text-md-bold underline'>
            Log In
          </a>
        </p>
      </div>
    </main>
  );
}
