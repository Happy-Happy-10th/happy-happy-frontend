'use client';

import { queryKeys } from '@/api';
import { productService } from '@/api/service';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

function Page() {
  const { data } = useQuery({
    queryKey: queryKeys.products.list().queryKey,
    queryFn: productService.list,
  });

  return (
    <div className="flex flex-col gap-4 **:data-link:border-1 **:data-link:p-4">
      {data?.data.map(v => {
        return (
          <Link key={v.idx} href={`/products/${v.idx}`} data-link>
            {v.name}
          </Link>
        );
      })}
    </div>
  );
}

export default Page;
