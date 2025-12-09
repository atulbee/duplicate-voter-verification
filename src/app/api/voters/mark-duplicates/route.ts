import { NextRequest, NextResponse } from 'next/server';
import { apiServer } from '@/lib/api/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await apiServer.markDuplicates(body);
  return NextResponse.json(result);
}
