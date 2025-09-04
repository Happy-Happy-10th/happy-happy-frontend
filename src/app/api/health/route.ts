import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse(JSON.stringify({ response: 'ok' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
