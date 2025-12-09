import { NextRequest, NextResponse } from 'next/server';
import { apiServer } from '@/lib/api/server';

type AnyRecord = Record<string, any>;

function toNumber(n: any): number | undefined {
  const num = Number(n);
  return Number.isFinite(num) ? num : undefined;
}

function extractSrNo(r: AnyRecord): number | undefined {
  return (
    toNumber(r.srNo) ??
    toNumber(r.SrNo) ??
    toNumber(r.SRNO) ??
    toNumber(r.sr_no) ??
    toNumber(r.SR_NO) ??
    undefined
  );
}

function isVerified(r: AnyRecord): boolean {
  const v = r.verified ?? r.Verified ?? r.isVerified ?? r.IsVerified ?? r.verificationStatus ?? r.VerificationStatus ?? r.status ?? r.Status;
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') {
    const lower = v.toLowerCase();
    return ['verified', 'true', 'yes', '1'].includes(lower);
  }
  if (typeof v === 'number') return v === 1;
  return false;
}

function normalizeRecords(payload: any): AnyRecord[] {
  console.log('[find-duplicates route] Normalizing records from payload:', payload);
  
  // Handle array directly
  if (Array.isArray(payload)) {
    console.log('[find-duplicates route] Payload is array, length:', payload.length);
    return payload as AnyRecord[];
  }
  
  // Handle nested data structures (both camelCase and PascalCase)
  if (Array.isArray(payload?.records)) {
    console.log('[find-duplicates route] Found records (camelCase), length:', payload.records.length);
    return payload.records as AnyRecord[];
  }
  if (Array.isArray(payload?.Records)) {
    console.log('[find-duplicates route] Found Records (PascalCase), length:', payload.Records.length);
    return payload.Records as AnyRecord[];
  }
  if (Array.isArray(payload?.data)) {
    console.log('[find-duplicates route] Found data (camelCase), length:', payload.data.length);
    return payload.data as AnyRecord[];
  }
  if (Array.isArray(payload?.Data)) {
    console.log('[find-duplicates route] Found Data (PascalCase), length:', payload.Data.length);
    return payload.Data as AnyRecord[];
  }
  if (Array.isArray(payload?.result)) {
    console.log('[find-duplicates route] Found result (camelCase), length:', payload.result.length);
    return payload.result as AnyRecord[];
  }
  if (Array.isArray(payload?.Result)) {
    console.log('[find-duplicates route] Found Result (PascalCase), length:', payload.Result.length);
    return payload.Result as AnyRecord[];
  }
  
  console.warn('[find-duplicates route] No array found in payload, returning empty array');
  return [];
}

export async function POST(req: NextRequest) {
  console.log('[find-duplicates route] POST request received');
  
  const body = await req.json();
  console.log('[find-duplicates route] Request body:', body);
  
  const raw = await apiServer.findDuplicates(body);
  console.log('[find-duplicates route] Raw API response:', raw);
  
  const recordsRaw = normalizeRecords(raw);
  console.log('[find-duplicates route] Normalized records count:', recordsRaw.length);

  const records = recordsRaw.map((item: any) => {
    // Ensure object shape
    const obj: any = item && typeof item === 'object' ? { ...item } : { value: item };
    const id = extractSrNo(obj);
    if (id !== undefined) obj.srNo = obj.srNo ?? id;
    obj.isVerified = isVerified(obj);
    return obj;
  });
  
  console.log('[find-duplicates route] Processed records count:', records.length);

  const verifiedSrNos: number[] = [];
  for (const r of records) {
    const id = extractSrNo(r);
    if (id !== undefined && (r.isVerified === true || isVerified(r))) verifiedSrNos.push(id);
  }
  
  console.log('[find-duplicates route] Verified SrNos:', verifiedSrNos);
  
  const response = { records, verifiedSrNos };
  console.log('[find-duplicates route] Returning response with', records.length, 'records and', verifiedSrNos.length, 'verified');
  
  return NextResponse.json(response);
}
