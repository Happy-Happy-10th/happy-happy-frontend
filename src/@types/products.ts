type GetProductsResponse = {
  data: Products[];
};

type Products = {
  idx: number;
  name: string;
};

type GetProductResponse = {
  data: Products;
};

export type { Products, GetProductsResponse, GetProductResponse };
