import SignInForm from '@/features/auth/components/SignInForm';

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
        <h1 className='display-xs-bold'>Login</h1>
        <p className='text-sm-regular md:text-md-regular'>
          Access your account and start shopping in seconds
        </p>
        <SignInForm />
        <p className='text-sm-regular md:text-md-regular mt-4 text-center'>
          Dont have an account?
          <a href='/signup' className='text-sm-bold md:text-md-bold underline'>
            Daftar
          </a>
        </p>
      </div>
    </main>
  );
}
