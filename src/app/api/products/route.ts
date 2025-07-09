import { products } from '@/@mock';

export async function GET() {
  return Response.json({ data: products });
}
