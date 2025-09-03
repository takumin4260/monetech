import React from 'react';
import Link from "next/link"; 
import { getMe } from '@/app/lib/client/getMe';

export default async function MobileAccountScreen() {
  const loginUser = await getMe();

  return (
    <div className="w-[400px] min-h-screen bg-gray-50 mx-auto">
 
    </div>
  );
}
