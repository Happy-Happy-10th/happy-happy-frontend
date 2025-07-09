import { products } from '@/@mock';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const idx = parseInt(id, 10);

  return Response.json({ data: products[idx] });
}
