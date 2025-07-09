'use client';

import { queryKeys } from '@/api';
import { productService } from '@/api/service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

function Page() {
  const params = useParams();

  const id = params?.id;

  const { data } = useQuery({
    queryKey: queryKeys.products.detail(id?.toString() ?? '').queryKey,
    queryFn: () => productService.detail(id?.toString() ?? ''),
  });

  return (
    <>
      <p>idx: {data?.data.idx}</p>
      <p>name: {data?.data.name}</p>
    </>
  );
}

export default Page;
