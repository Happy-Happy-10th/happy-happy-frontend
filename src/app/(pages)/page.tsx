'use client';

import { Button } from '@/components/ui/button';
import { getAppEnv } from '@/utils';
import { signIn } from 'next-auth/react';

export default function Home() {
  const kakaoLogin = () => {
    signIn('kakao', { redirect: true, callbackUrl: '/user' });
  };

  const googleLogin = () => {
    signIn('google', { redirect: true, callbackUrl: '/user' });
  };

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus distinctio inventore perferendis hic iste,
        nemo pariatur incidunt corrupti nesciunt aut illum tenetur non fugiat. Corrupti officiis nemo eaque quidem
        corporis quos ipsa rem id. Ad minus animi mollitia saepe. Ad adipisci ipsum ipsam quae veritatis dignissimos
        libero ipsa necessitatibus ducimus quod, ea quidem in eaque cupiditate ut consequuntur impedit reprehenderit
        voluptates beatae, praesentium officiis? Officia qui corrupti impedit ducimus voluptatum praesentium quibusdam
        in? Facilis consequatur facere, optio, voluptas dignissimos quam voluptatibus nobis, inventore ut id similique
        eius. Neque, ut labore possimus, suscipit nostrum nobis eos autem minima blanditiis a maxime.
      </p>

      <p>{getAppEnv()}환경</p>

      <Button>button</Button>

      <button onClick={kakaoLogin} className="bg-yellow-400 text-black h-10 w-full rounded-sm">
        카카오 로그인
      </button>

      <button onClick={googleLogin} className="border-gray-500 border-1 text-black h-10 w-full rounded-sm">
        구글 로그인
      </button>
    </div>
  );
}
