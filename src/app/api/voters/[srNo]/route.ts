import { NextRequest, NextResponse } from 'next/server';
import { apiServer } from '@/lib/api/server';

export async function GET(_: NextRequest, context: { params: Promise<{ srNo: string }> }) {
  const params = await context.params;
  const result = await apiServer.voterBySrNo(Number(params.srNo));
  return NextResponse.json(result);
}
