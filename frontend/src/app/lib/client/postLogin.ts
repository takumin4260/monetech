// lib/client/postLogin.ts
export async function postLogin(email: string, password: string): Promise<void> {
  const res = await fetch('/api/postLogin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error("ログインに失敗");
  }

  return;
}
