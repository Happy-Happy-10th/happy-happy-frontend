import { GetProductResponse, GetProductsResponse } from '@/@types';
import { yoteyoAPI } from '@/api';

const getProducts = async () => {
  return await yoteyoAPI<GetProductsResponse>(`products`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getProduct = async (id: string) => {
  return await yoteyoAPI<GetProductResponse>(`products/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { getProducts, getProduct };
