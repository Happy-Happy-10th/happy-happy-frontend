import { getProduct, getProducts } from '@/api/fragments/products';

const productService = {
  list: async () => (await getProducts()).json(),
  detail: async (id: string) => (await getProduct(id)).json(),
  // create: async (payload) => (await createProduct(id)).json(),
  // update: async (id: string) => (await updateProduct(id)).json(),
  // delete: async (id: string) => (await deleteProduct(id)).json(),
};

export { productService };
