import { apiServer } from '@/lib/api/server';

export default async function DashboardPage() {
  const [status, count] = await Promise.all([
    apiServer.verificationStatus().catch((err) => {
      console.error('[Dashboard] verificationStatus error:', err);
      return null;
    }),
    apiServer.unverifiedCount().catch((err) => {
      console.error('[Dashboard] unverifiedCount error:', err);
      return null;
    }),
  ]);

  console.log('[Dashboard] Status response:', status);
  console.log('[Dashboard] Count response:', count);

  // Handle both camelCase and PascalCase from .NET API
  const totalRecords = status?.TotalRecords ?? status?.totalRecords ?? 0;
  const verifiedRecords = status?.VerifiedRecords ?? status?.verifiedRecords ?? 0;
  const unverifiedRecords = status?.UnverifiedRecords ?? status?.unverifiedRecords ?? count?.count ?? count?.Count ?? 0;
  const duplicateRecords = status?.DuplicateRecords ?? status?.duplicateRecords ?? 0;
  const notDuplicateRecords = status?.NotDuplicateRecords ?? status?.notDuplicateRecords ?? 0;
  const verificationPercentage = status?.VerificationPercentage ?? status?.verificationPercentage ?? 0;

  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 md:p-8 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl bg-linear-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-xl shadow-purple-500/25 shrink-0">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">प्रमाणितता</h1>
            <p className="text-gray-600 mt-1 sm:mt-1.5 text-sm sm:text-base">मतदार प्रमाणित आकडेवारीचे विहंगावलोकन</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {/* Total Records */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-gray-200 hover:border-blue-400 transition-all glow-hover group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2 font-semibold">एकूण नोंदी</div>
          <div className="text-3xl sm:text-4xl font-bold text-gray-900">{totalRecords.toLocaleString()}</div>
        </div>

        {/* Verified Records */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-gray-200 hover:border-green-400 transition-all glow-hover group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-700 border-2 border-green-300 shadow-sm">
              {verificationPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-2 font-semibold">प्रमाणित नोंदी</div>
          <div className="text-3xl sm:text-4xl font-bold text-green-600">{verifiedRecords.toLocaleString()}</div>
        </div>

        {/* Unverified Records */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-gray-200 hover:border-amber-400 transition-all glow-hover group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2 font-semibold">अप्रमाणित नोंदी</div>
          <div className="text-3xl sm:text-4xl font-bold text-amber-600">{unverifiedRecords.toLocaleString()}</div>
        </div>

        {/* Duplicate Records */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-gray-200 hover:border-red-400 transition-all glow-hover group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2 font-semibold">डुप्लिकेट नोंदी</div>
          <div className="text-3xl sm:text-4xl font-bold text-red-600">{duplicateRecords.toLocaleString()}</div>
        </div>

        {/* Not Duplicate Records */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-gray-200 hover:border-cyan-400 transition-all glow-hover group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2 font-semibold">डुप्लिकेट नाही नोंदी</div>
          <div className="text-3xl sm:text-4xl font-bold text-cyan-600">{notDuplicateRecords.toLocaleString()}</div>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-gray-200 hover:border-purple-400 transition-all glow-hover group shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-3 font-semibold">प्रमाणित प्रगती</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">पूर्ण</span>
              <span className="text-gray-900 font-bold text-lg">{verificationPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-linear-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${Math.min(verificationPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
