import { useSyncExternalStore } from "react";
/**
 * 뷰 포트를 감지 하는 훅
 * @param query min-width : oopx 형태로 전달
 * @param defaultValue : SSR일때 false는 Mobild, true는 PC
 * @returns boolean 
 */
export function useMediaQuery(query:string, defaultValue=false){
  const getServerSnapshot = ()=>defaultValue;
  const getClientSnapshot = ()=>{
    if(typeof window ==='undefined') return defaultValue;
    return window.matchMedia(query).matches;
  }

  const subscribe = (onStoreChange:()=>void)=>{
    const mediaQueryList = window.matchMedia(query);
    const handler = ()=>onStoreChange();
    mediaQueryList.addEventListener('change', handler);
    return () => mediaQueryList.removeEventListener('change', handler);
  }

  return useSyncExternalStore(subscribe,getClientSnapshot,getServerSnapshot)
}

/** useSyncExternalStore : (react18) React 외부의 데이터 저장소를 React 컴포넌트와 동기화 하는 훅
 *  외부 저장소란 => Zustand Redux와 같은 서드파티 스토어, 브라우저 Api 제공값, 직접만든 js 클레스나 모듈 데이터
 *  원형 useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
 *  첫 번째 파라미터(subscribe)로 변경 이벤트를 구독하고, 
 *  변경이 발생하면 두 번째 파라미터(`getSnapshot`)인 함수를 호출하여 얻은 새로운 값으로 컴포넌트를 리렌더링해라.
 * 
 *  즉 useSyncExternalStore 훅의 내부 구현에는 랜더링 환경(서버 또는 클라이언트)를 확인하고 어떤 값을 반환할지 정해져있다.
 * 
 *  useEffect, useState로 외부데이터 구독시 문제점
 *  => 화면 Tearing 현상 : 동일한 데이터를 사용하는 여러 컴포넌트가 서로 다른 값을 잠시 동안 보여주는 현상
 *    React 18의 동시성 렌더링(Concurrent Rendering) 환경에서  React가 렌더링을 더 효율적으로 하기 위해 
 *    렌더링 과정을 잠시 "멈췄다가" 나중에 다시 시작.
 *  예시:
 *  1. isDesktop이라는 외부 스토어 값이 true라고 가정해 봅시다.
 *  2. React가 <Header> 컴포넌트를 렌더링합니다. <Header>는 isDesktop 값을 읽어서 true로 렌더링됩니다.
 *  3. React가 잠시 렌더링을 멈추고 다른 높은 우선순위의 작업을 처리합니다.
 *  4. 바로 이 순간! 사용자가 브라우저 창 크기를 줄여서 isDesktop 값이 false로 변경됩니다.
 *  5. React가 멈췄던 렌더링을 다시 시작하고 <SideBar> 컴포넌트를 렌더링합니다. <SideBar>는 변경된 isDesktop 값을 읽어서 false로
 *    렌더링됩니다.
 *  6. 결과: 한 화면에 <Header>는 데스크탑용으로, <SideBar>는 모바일용으로 보이는 UI 불일치, 즉 "Tearing"이 발생합니다.
 * 
 *  => 서버 사이드 렌더링의 불일치 문제
 *    Hydration(서버에서 랜더링한 HTML과 클라이언트에서 처음 렌더링한 결과물이 다른 경우) 오류 발생.
 *    외부 스토어의 초기값이 서버와 클라이언트에서 다를 수 있어 발생.
 * 
 *  사용 케이스
 *  1. 브라우저 API를 구독할 때: 
 *  window.matchMedia, navigator.onLine 등 React와 상관없이 변경되는 브라우저의 상태를 안전하게 추적하고 싶을 때
 * 
 *  2. 동시성 기능(Concurrent Features)을 사용하면서 외부 데이터와의 동기화가 필요할 때.
 * 
 *  해당 코드에 대한 구조
 *  useSyncExternalStore(subscribe,getServerSnapshot,getClientSnapshot)
 *  =>subscribe가 변경이 될때 반응하기 위한 역할
 *  =>getClientSnapshot: 클라이언트의 현재 값 가져오기
 *  =>getServerSnapshot: 서버의 초기 값 설정하기(서버에는 window객체가 없음)
 *  
 *  subscribe 를 통해 구독 대상을 정함. 여기서는 window.matchMedia('min-widht :800px')를 통해 나온 mediaQueryList를 구독
 *  mediaQueryList 객체는 .match를 통해 800px을 충족하는 boolean 값을 전달함.
 *  mediaQueryList 객체는 change라는 이벤트를 발생시키는데 이 이밴트는 미디어 쿼리의 상태가 변경되는 순간에만 발생.
 *  => 지속적인 뷰포트 감시 연산 X ,이벤트 기반 동작으로 change 이밴트가 발생할때만 실행됨
 *  addEventListener('change', handler)를 통해 이 미디어 쿼리의 상태가 바뀌면 handler를 실행하라고 이밴트 추가.
 * 
 *  window.matchMedia(query)를 통해 `MediaQueryList` 객체를 만듭니다
 *  이 객체는 쿼리 결과가 true -> false 또는 false -> true로 바뀌는 경계의 순간에만 change 이벤트를 발생시킵니다.
 *  useSyncExternalStore는 이 change 이벤트를 구독(subscribe)합니다.
 *  평소에는 아무 일도 하지 않다가, change 이벤트가 발생하면 React는 리렌더링을 시작하고, 
 *  이때 getSnapshot 함수를 통해 새로운 값을 확인하여 화면을 갱신합니다.
 *  
 *  그렇다면 마지막으로 이훅을 정리하자면 내가 필요한건 변하는 뷰포트를 감지하고 그에 따른 boolean 값을 상태로 가지고 싶은거니        │
│    useSyncExternalStore로 브라우저 Api를 통해 mediaQueryList를 구독하고 mediaQueryList가 onchange 이밴트를 발생시키면                │
│    useSyncExternalStore가 새로운 값을 반환하고 그 값은 두번째 파라미터의 getClientSnapshot의 window.matchMedia(query).matches 매칭   │
│    결과값을 반환받는 거고 이 훅이 최초에 랜더링 될때가 만약 서버환경일 경우 window 객채가 없으니 기본적으로 defaultValue를 반환한다.  
 */