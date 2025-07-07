'use client';

import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

interface Props {}

function Page(props: Props) {
  const {} = props;
  const { data, status } = useSession();

  const showUser = (
    <div>
      <p>이름 : {data?.user?.name ?? '없음'}</p>
      <p>이메일 : {data?.user?.email ?? '없음'}</p>
      <p>프로필 이미지 : {data?.user?.image ? <img src={data.user.image} /> : '없음'} </p>
    </div>
  );

  return (
    <div>
      {status === 'loading' ? '로딩중...' : showUser ?? '유저정보없음'}

      {status === 'authenticated' && (
        <Button onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>로그아웃</Button>
      )}
    </div>
  );
}

export default Page;
