import { NextRequest, NextResponse } from 'next/server';
import { apiServer } from '@/lib/api/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const duplicationId = searchParams.get('duplicationId');
  const result = await apiServer.duplicateGroups(duplicationId ? Number(duplicationId) : undefined);
  return NextResponse.json(result);
}
