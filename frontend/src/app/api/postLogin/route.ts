// app/api/postLogin/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    console.log("email,password", email,password)
    const upstream = await fetch(`http://localhost:8000/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });

    return NextResponse.json({ ok: true }, { status: 200 });
}
