'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MobileLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // メールアドレス形式チェック
  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const showEmailError = email !== '' && !isValidEmail(email);

  const canSubmit = !submitting && !!email && !!password && !showEmailError;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    await fetch("http://localhost:8000/auth/login", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((reason) => {
      console.log(reason)
    }).then((res) => {
      if (res && res.ok) {
        router.push('/home');
      } else {
        setError('ログインに失敗しました。しばらくしてから再度お試しください。');
      }
      setSubmitting(false);
    });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("http://localhost:8000/me", {
          credentials: "include",
        })

        if (res.ok) {
          router.push("/home");
        }
      } catch (e) {
        console.log(e);
      }
    }

    checkLoginStatus();
  }, [router]);

  return (
    <div className="w-[400px] min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-rose-600 mx-auto relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-200 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-white mb-2">ログイン</h1>
          <p className="text-red-100">アカウントのアクセスにはログインが必要です</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 border border-white shadow-xl">
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                placeholder="example@email.com"
              />
              {showEmailError && (
                <p className="text-red-500 text-sm mt-1 font-medium">メールアドレスの型が正しくありません</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                placeholder="パスワードを入力してください"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50/90 backdrop-blur-sm p-4 text-sm text-red-700 font-medium shadow-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full py-4 rounded-2xl transition-all duration-300 font-semibold text-lg shadow-lg ${
                !canSubmit
                  ? 'bg-gray-300/80 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-xl hover:shadow-2xl transform hover:scale-105'
              }`}
            >
              {submitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>ログイン中…</span>
                </div>
              ) : (
                'ログイン'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}