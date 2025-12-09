import { NextResponse } from 'next/server';
import { apiServer } from '@/lib/api/server';

export async function GET() {
  const result = await apiServer.verificationStatus();
  return NextResponse.json(result);
}
