import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';

const usersKeys = createQueryKeys('users');

const productsKeys = createQueryKeys('products', {
  list: () => ({ queryKey: ['get-products'] }),
  detail: (id: string) => ({ queryKey: ['get-product', id] }),
});

/**
 *
 * @description React-Query 캐싱 키값을 관리하는 객체
 * @todo 개발하며 사용하는 layout 단계에서 리소스 판별후 도입할지 논의해야할거같습니다.
 */
export const queryKeys = mergeQueryKeys(usersKeys, productsKeys);
