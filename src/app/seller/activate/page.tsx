// src/app/seller/activate/page.tsx
import RequireAuth from '@/components/auth/RequireAuth';

import ActivateForm from '../../../features/seller/components/ActiveForm';

export default function Page() {
  return (
    <RequireAuth>
      <section className='custom-container py-8'>
        <ActivateForm />
      </section>
    </RequireAuth>
  );
}
