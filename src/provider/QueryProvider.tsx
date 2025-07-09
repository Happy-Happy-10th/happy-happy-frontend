'use client';

import { queryClient } from '@/api';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

function QueryProvider({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export { QueryProvider };
