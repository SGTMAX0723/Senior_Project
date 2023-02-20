'use client'

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import UserAuthentication, { pb } from 'components/UserAuthentication';
const isLoggedIn = pb.authStore.isValid;

export default function Login() {
  // Re-renders the component after the first render
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
      // This forces a rerender, so the page is rendered
      // the second time but not the first
      setHydrated(true);
  }, []);
  if (!hydrated) {
      // Returns null on first render, so the client and server match
      return null;
  }

  if (isLoggedIn) {
    const router = useRouter();
    router.push('/');
  } else {
    return (
        <UserAuthentication />
    );
  }
}