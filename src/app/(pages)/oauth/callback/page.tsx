'use client';
import React from 'react';
import { useQueryState, parseAsString, parseAsBoolean } from 'nuqs';

interface Props {}

function Page() {
  const [success] = useQueryState('success', parseAsBoolean.withDefault(false));

  return <></>;
}

export default Page;
