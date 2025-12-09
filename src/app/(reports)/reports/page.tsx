'use client';
import { useState } from 'react';

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    firstName: '', middleName: '', lastName: '', wardDivNo: '', epicNumber: '', voterSerialNo: '',
    sex: '', ageMin: '', ageMax: '', duplicateFlag: '', verified: '',
    sortBy: 'SR_NO', sortDir: 'ASC', pageNumber: 1, pageSize: 50
  });
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true); setError(null);
    try {
      const payload: any = { sortBy: filters.sortBy, sortDir: filters.sortDir, pageNumber: filters.pageNumber, pageSize: filters.pageSize };
      if (filters.firstName.trim()) payload.firstName = filters.firstName.trim();
      if (filters.middleName.trim()) payload.middleName = filters.middleName.trim();
      if (filters.lastName.trim()) payload.lastName = filters.lastName.trim();
      if (filters.wardDivNo.trim()) payload.wardDivNo = filters.wardDivNo.trim();
      if (filters.epicNumber.trim()) payload.epicNumber = filters.epicNumber.trim();
      if (filters.voterSerialNo.trim()) payload.voterSerialNo = filters.voterSerialNo.trim();
      if (filters.sex) payload.sex = filters.sex;
      if (filters.ageMin) payload.ageMin = parseInt(filters.ageMin);
      if (filters.ageMax) payload.ageMax = parseInt(filters.ageMax);
      if (filters.duplicateFlag) payload.duplicateFlag = filters.duplicateFlag;
      if (filters.verified) payload.verified = filters.verified;
      const res = await fetch('/api/voters/report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Failed');
      setReportData(await res.json());
    } catch (err: any) {
      setError(err.message || 'Error occurred');
      setReportData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFilters({ firstName: '', middleName: '', lastName: '', wardDivNo: '', epicNumber: '', voterSerialNo: '', sex: '', ageMin: '', ageMax: '', duplicateFlag: '', verified: '', sortBy: 'SR_NO', sortDir: 'ASC', pageNumber: 1, pageSize: 50 });
    setReportData(null); setError(null);
  };

  const handleSort = (column: string) => {
    setFilters(p => ({
      ...p,
      sortBy: column,
      sortDir: p.sortBy === column && p.sortDir === 'ASC' ? 'DESC' : 'ASC',
      pageNumber: 1
    }));
    setTimeout(() => handleGenerate(), 0);
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (filters.sortBy !== column) {
      return <span className="ml-1 text-gray-400">⇅</span>;
    }
    return filters.sortDir === 'ASC' ? <span className="ml-1">↑</span> : <span className="ml-1">↓</span>;
  };

  const handleExport = () => {
    if (!reportData?.voters?.length) return;
    const rows = reportData.voters.map((v: any) => [v.srNo, v.wardDivNo, v.firstName, v.middleName||'', v.lastName, v.age, v.sex, v.epicNumber, v.houseNo||'', v.duplicateFlag, v.verified, v.duplicationId||''].map((c: any) => `"${String(c).replace(/"/g, '""')}"`).join(','));
    const csv = ['Sr No,Ward/Div,First,Middle,Last,Age,Sex,EPIC,House,Duplicate,Verified,Dup ID', ...rows].join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    link.download = `report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-4">
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shrink-0">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">मतदार अहवाल</h1>
            <p className="text-gray-600 mt-1">Comprehensive Voter Report</p>
            <p className="text-amber-600 mt-1 text-sm font-medium">कृपया सर्व फील्ड इंग्रजीमध्ये भरा (Please fill all fields in English)</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <input type="text" placeholder="First Name" value={filters.firstName} onChange={e => setFilters(p => ({...p, firstName: e.target.value}))} className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900" />
          <input type="text" placeholder="Middle Name" value={filters.middleName} onChange={e => setFilters(p => ({...p, middleName: e.target.value}))} className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900" />
          <input type="text" placeholder="Last Name" value={filters.lastName} onChange={e => setFilters(p => ({...p, lastName: e.target.value}))} className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900" />
          <input type="text" placeholder="Ward/Div No" value={filters.wardDivNo} onChange={e => setFilters(p => ({...p, wardDivNo: e.target.value}))} className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900" />
          <input type="text" placeholder="EPIC Number" value={filters.epicNumber} onChange={e => setFilters(p => ({...p, epicNumber: e.target.value}))} className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900" />
          <input type="text" placeholder="Serial No" value={filters.voterSerialNo} onChange={e => setFilters(p => ({...p, voterSerialNo: e.target.value}))} className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900" />
          <select value={filters.sex} onChange={e => setFilters(p => ({...p, sex: e.target.value}))} className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900"><option value="">All Sex</option><option value="M">Male</option><option value="F">Female</option><option value="O">Other</option></select>
          <input type="number" placeholder="Min Age" value={filters.ageMin} onChange={e => setFilters(p => ({...p, ageMin: e.target.value}))} className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900" />
          <input type="number" placeholder="Max Age" value={filters.ageMax} onChange={e => setFilters(p => ({...p, ageMax: e.target.value}))} className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900" />
          <select value={filters.duplicateFlag} onChange={e => setFilters(p => ({...p, duplicateFlag: e.target.value}))} className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900"><option value="">All Duplicate</option><option value="TRUE">Duplicate</option><option value="FALSE">Not Duplicate</option><option value="UNKNOWN">Unknown</option></select>
          <select value={filters.verified} onChange={e => setFilters(p => ({...p, verified: e.target.value}))} className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900"><option value="">All Verified</option><option value="TRUE">Verified</option><option value="FALSE">Unverified</option></select>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleGenerate} disabled={loading} className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg disabled:opacity-50">
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
          <button onClick={handleClear} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold">Clear</button>
          {reportData?.voters?.length > 0 && <button onClick={handleExport} className="px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold shadow-lg">Export CSV</button>}
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-red-700">{error}</div>}

      {reportData && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Results</h2>
              <p className="text-gray-600">Total: {reportData?.totalRecords || 0} | Page {reportData?.pageNumber || 1}/{reportData?.totalPages || 1}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { if (filters.pageNumber > 1) { setFilters(p => ({...p, pageNumber: p.pageNumber - 1})); handleGenerate(); }}} disabled={filters.pageNumber === 1} className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50">Prev</button>
              <button onClick={() => { if (filters.pageNumber < (reportData?.totalPages || 1)) { setFilters(p => ({...p, pageNumber: p.pageNumber + 1})); handleGenerate(); }}} disabled={filters.pageNumber >= (reportData?.totalPages || 1)} className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50">Next</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b-2 border-gray-300">
                  <th onClick={() => handleSort('SR_NO')} className="px-4 py-4 text-left text-sm font-bold text-gray-800 border-r cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center">Sr No<SortIcon column="SR_NO" /></div>
                  </th>
                  <th onClick={() => handleSort('WARD_DIV_NO')} className="px-4 py-4 text-left text-sm font-bold text-gray-800 border-r cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center">Ward/Div<SortIcon column="WARD_DIV_NO" /></div>
                  </th>
                  <th onClick={() => handleSort('FIRST_NAME')} className="px-4 py-4 text-left text-sm font-bold text-gray-800 border-r cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center">First Name<SortIcon column="FIRST_NAME" /></div>
                  </th>
                  <th onClick={() => handleSort('MIDDLE_NAME')} className="px-4 py-4 text-left text-sm font-bold text-gray-800 border-r cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center">Middle<SortIcon column="MIDDLE_NAME" /></div>
                  </th>
                  <th onClick={() => handleSort('LAST_NAME')} className="px-4 py-4 text-left text-sm font-bold text-gray-800 border-r cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center">Last Name<SortIcon column="LAST_NAME" /></div>
                  </th>
                  <th onClick={() => handleSort('AGE')} className="px-4 py-4 text-left text-sm font-bold text-gray-800 border-r cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center">Age<SortIcon column="AGE" /></div>
                  </th>
                  <th onClick={() => handleSort('SEX')} className="px-4 py-4 text-left text-sm font-bold text-gray-800 border-r cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center">Sex<SortIcon column="SEX" /></div>
                  </th>
                  <th onClick={() => handleSort('EPIC_NUMBER')} className="px-4 py-4 text-left text-sm font-bold text-gray-800 border-r cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center">EPIC<SortIcon column="EPIC_NUMBER" /></div>
                  </th>
                  <th onClick={() => handleSort('DUPLICATE_FLAG')} className="px-4 py-4 text-left text-sm font-bold text-gray-800 border-r cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center">Duplicate<SortIcon column="DUPLICATE_FLAG" /></div>
                  </th>
                  <th onClick={() => handleSort('VERIFIED')} className="px-4 py-4 text-left text-sm font-bold text-gray-800 cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center">Verified<SortIcon column="VERIFIED" /></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportData?.voters?.map((v: any, i: number) => (
                  <tr key={v.srNo} className={`border-b ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r">{v.srNo}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r">{v.wardDivNo}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium border-r">{v.firstName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r">{v.middleName || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium border-r">{v.lastName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r">{v.age}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r">{v.sex}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono border-r">{v.epicNumber}</td>
                    <td className="px-4 py-3 text-sm border-r">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${v.duplicateFlag==='TRUE'?'bg-red-100 text-red-800 ':v.duplicateFlag==='FALSE'?'bg-green-100 text-green-800 ':'bg-gray-100 text-gray-800 '}`}>{v.duplicateFlag}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${v.verified==='TRUE'?'bg-green-100 text-green-800 ':'bg-amber-100 text-amber-800 '}`}>{v.verified}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
