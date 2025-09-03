'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postLogin } from '@/app/lib/client/postLogin';

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
    try {
      await postLogin(email, password);
      // 成功時はホームへ
      router.push('/home');
    } catch (err: any) {
      setError(err?.message ?? 'ログインに失敗しました。しばらくしてから再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-[400px] min-h-screen bg-gray-50 mx-auto">
      {/* Main Content */}
      <div className="px-8 pt-16">
        {/* Logo/Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">ログイン</h1>
          <p className="text-sm text-gray-600">アカウントにアクセスするためにログインが必要です</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
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
                className="w-full px-3 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
              />
              {showEmailError && (
                <p className="text-red-500 text-sm mt-1">メールアドレスの型が正しくありません</p>
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
                className="w-full px-3 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="パスワードを入力してください"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full py-3 rounded-lg transition font-medium ${
                !canSubmit
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {submitting ? 'ログイン中…' : 'ログイン'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-2">パスワードをお忘れですか？</p>
          </div>
        </div>
      </div>
    </div>
  );
}
