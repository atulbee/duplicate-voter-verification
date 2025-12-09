import { NextRequest, NextResponse } from 'next/server';
import { apiServer } from '@/lib/api/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    console.log('[voter-report route] POST request received');
    
    const body = await req.json();
    console.log('[voter-report route] Request body:', body);

    // Call the .NET API
    const response = await apiServer.voterReport(body);
    console.log('[voter-report route] Response:', response);

    // Transform the response to match frontend expectations
    const voters = (response.records || []).map((record: any) => ({
      srNo: record.SrNo,
      wardDivNo: record.WardDivNo,
      firstName: record.FirstName || '',
      middleName: record.MiddleName || '',
      lastName: record.LastName || '',
      age: record.Age,
      sex: record.Sex || '',
      epicNumber: record.EpicNumber || '',
      houseNo: record.HouseNo || '',
      duplicateFlag: record.DuplicateFlag || 'UNKNOWN',
      verified: record.Verified || 'FALSE',
      duplicationId: record.DuplicationId || null,
      markedBy: record.MarkedBy || '',
      markedDate: record.MarkedDate || null,
      remarks: record.Remarks || '',
      relationType: record.RelationType || '',
      relationFirstname: record.RelationFirstname || '',
      relationLastname: record.RelationLastname || ''
    }));

    const transformedResponse = {
      voters,
      totalRecords: response.totalCount || 0,
      pageNumber: body.pageNumber || 1,
      pageSize: body.pageSize || 50,
      totalPages: Math.ceil((response.totalCount || 0) / (body.pageSize || 50))
    };
    
    console.log('[voter-report route] Transformed response:', transformedResponse);

    return NextResponse.json(transformedResponse, { status: 200 });
  } catch (error: any) {
    console.error('[voter-report route] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate voter report' },
      { status: 500 }
    );
  }
}
