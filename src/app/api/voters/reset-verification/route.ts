import { NextResponse } from 'next/server';
import { apiServer } from '@/lib/api/server';

export async function POST() {
  const result = await apiServer.resetVerification();
  return NextResponse.json(result);
}
