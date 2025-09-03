import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const upstream = await fetch("http://localhost:8000/me", {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  const data = await upstream.json();
  return NextResponse.json(data);
}
