'use client';

import { Button } from '@/components/ui/button';
import { getAppEnv } from '@/utils';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      kakao.cleanup();
      kakao.init('kakaoJavaScriptKey');
    }
  }, []);

  const handleShare = () => {
    const kakao = window.Kakao;

    window.Kakao?.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '오늘의 디저트',
        description: '아메리카노, 빵, 케익',
        imageUrl: 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
      itemContent: {
        profileText: 'Kakao',
        profileImageUrl:
          'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        titleImageUrl:
          'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        titleImageText: 'Cheese cake',
        titleImageCategory: 'Cake',
        items: [
          {
            item: 'Cake1',
            itemOp: '1000원',
          },
          {
            item: 'Cake2',
            itemOp: '2000원',
          },
          {
            item: 'Cake3',
            itemOp: '3000원',
          },
          {
            item: 'Cake4',
            itemOp: '4000원',
          },
          {
            item: 'Cake5',
            itemOp: '5000원',
          },
        ],
        sum: '총 결제금액',
        sumOp: '15000원',
      },
      social: {
        likeCount: 10,
        commentCount: 20,
        sharedCount: 30,
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
      ],
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <p>{getAppEnv()}환경</p>

      <Button onClick={handleShare}>카카오톡 공유하기</Button>

      <Link href="/products">Products 페이지 이동 &#40;API 통신 플로우&#41; </Link>
    </div>
  );
}
