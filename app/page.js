'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import I18nProvider from './components/providers/I18nProvider';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to learning page
    router.push('/learning');
  }, [router]);

  return (
    <I18nProvider>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#103358]">Redirecting...</div>
      </div>
    </I18nProvider>
  );
}
