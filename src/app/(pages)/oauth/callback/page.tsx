'use client';
import React, { useEffect } from 'react';
import { useQueryState, parseAsString, parseAsBoolean, useQueryStates } from 'nuqs';
import { useRouter } from 'next/navigation';

interface Props {}

function Page() {
  const router = useRouter();

  const [payload] = useQueryStates({
    success: parseAsBoolean.withDefault(false),
    error: parseAsString.withDefault(''),
  });

  useEffect(() => {
    if (payload.success) {
      router.push('/home');
    }
    if (payload.error === 'already_registered') {
      router.push('/auth/login');
    }
  }, [payload]);

  return <></>;
}

export default Page;
