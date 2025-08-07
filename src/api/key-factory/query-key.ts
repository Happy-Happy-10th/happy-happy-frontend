import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';

/** 
 * 캘린더 관련 Api
 * events : 사용자 일정 호출 Api
 * settings : 사용자 캘린더 설정 값 Api (로컬스토리지?)
 */
const calendarKeys = createQueryKeys('calendar',{
  events : (year:number)=>({queryKey : [year]}),
  settings : ()=>({queryKey : ['settings']}),
})

const productsKeys = createQueryKeys('products', {
  list: () => ({ queryKey: ['get-products'] }),
  detail: (id: string) => ({ queryKey: ['get-product', id] }),
});

/**
 *
 * @description React-Query 캐싱 키값을 관리하는 객체
 * @todo 개발하며 사용하는 layout 단계에서 리소스 판별후 도입할지 논의해야할거같습니다.
 */
export const queryKeys = mergeQueryKeys(calendarKeys, productsKeys);
