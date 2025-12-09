'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import DuplicateTable from '@/components/DuplicateTable';
import Loader from '@/components/Loader';
import { Toast } from '@/components/Toast';

export default function VerifyPage() {
  console.log('[VerifyPage] Component mounted/rendered');
  
  const [loading, setLoading] = useState(false);
  type Query = { firstName: string; middleName: string; lastName: string };
  const [query, setQuery] = useState<Query>({ firstName: '', middleName: '', lastName: '' });
  const [records, setRecords] = useState<any[]>([]);
  const [verifiedSrNos, setVerifiedSrNos] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<number[]>([]);
  const [toast, setToast] = useState<{ message: string; type?: 'info' | 'success' | 'error' } | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    console.log('[VerifyPage] useEffect: Fetching unverified count on mount');
    api.unverifiedCount()
      .then((count) => {
        console.log('[VerifyPage] Unverified count fetched:', count);
      })
      .catch((err) => {
        console.error('[VerifyPage] Failed to fetch unverified count:', err);
      });
  }, []);

  async function search() {
    console.log('[VerifyPage] search() called with query:', query);
    setLoading(true);
    console.log('[VerifyPage] Loading state set to true');
    
    try {
      console.log('[VerifyPage] Calling API findDuplicates...');
      const res: any = await api.findDuplicates({
        firstName: query.firstName,
        middleName: query.middleName,
        lastName: query.lastName,
      });
      console.log('[VerifyPage] API response received:', res);
      
      const list = Array.isArray(res?.records)
        ? res.records
        : Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.result)
        ? res.result
        : [];
      console.log('[VerifyPage] Extracted records list:', list.length, 'items');
      
      setRecords(list);
      console.log('[VerifyPage] Records state updated');
      
      const verified = new Set<number>((res?.verifiedSrNos as number[]) || []);
      console.log('[VerifyPage] Verified SrNos:', Array.from(verified));
      setVerifiedSrNos(verified);
      
      setSelected([]);
      console.log('[VerifyPage] Selected state cleared');
      
      setSearched(true);
      console.log('[VerifyPage] Search completed successfully');
    } catch (e: any) {
      console.error('[VerifyPage] Search error:', e);
      setToast({ message: e.message || 'Search failed', type: 'error' });
      setSearched(true);
    } finally {
      setLoading(false);
      console.log('[VerifyPage] Loading state set to false');
    }
  }

  async function mark(isDuplicate: boolean) {
    console.log('[VerifyPage] mark() called with isDuplicate:', isDuplicate, 'selected:', selected);
    
    if (selected.length === 0) {
      console.log('[VerifyPage] No records selected, aborting mark operation');
      return;
    }
    
    setLoading(true);
    console.log('[VerifyPage] Loading state set to true');
    
    try {
      const payload = { 
        srNoArray: selected, 
        isDuplicate, 
        remarks: isDuplicate ? 'Same person' : 'Different persons' 
      };
      console.log('[VerifyPage] Calling API markDuplicates with payload:', payload);
      
      await api.markDuplicates(payload);
      console.log('[VerifyPage] Mark duplicates API call successful');
      
      setToast({ message: 'Saved successfully', type: 'success' });
      console.log('[VerifyPage] Success toast shown');
      
      console.log('[VerifyPage] Refreshing search results...');
      await search();
    } catch (e: any) {
      console.error('[VerifyPage] Mark error:', e);
      setToast({ message: e.message || 'Save failed', type: 'error' });
    } finally {
      setLoading(false);
      console.log('[VerifyPage] Loading state set to false');
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900">डुप्लिकेट शोधा</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">मतदार डेटा शोधा आणि प्रमाणित करा</p>
          </div>
        </div>
      </div>
        
      {/* Search Form */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              पहिले नाव
            </label>
            <input 
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 border text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:outline-none focus:bg-white transition-all text-base font-medium" 
              placeholder="पहिले नाव टाका" 
              value={query.firstName} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log('[VerifyPage] First name input changed:', e.target.value);
                setQuery({ ...query, firstName: e.target.value });
              }} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              मधले नाव
            </label>
            <input 
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 border text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none focus:bg-white transition-all text-base font-medium" 
              placeholder="मधले नाव टाका" 
              value={query.middleName} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log('[VerifyPage] Middle name input changed:', e.target.value);
                setQuery({ ...query, middleName: e.target.value });
              }} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              आडनाव
            </label>
            <input 
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 border text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:outline-none focus:bg-white transition-all text-base font-medium" 
              placeholder="आडनाव टाका" 
              value={query.lastName} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log('[VerifyPage] Last name input changed:', e.target.value);
                setQuery({ ...query, lastName: e.target.value });
              }} 
            />
          </div>
        </div>
        <button 
          className="w-full mt-6 px-6 py-4 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 text-white text-base font-bold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]" 
          onClick={() => {
            console.log('[VerifyPage] Search button clicked');
            search();
          }} 
          disabled={loading}
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {loading ? 'शोधत आहे...' : 'शोधा'}
        </button>
      </div>

      {loading && <Loader label="Searching for duplicates..." />}

      {!loading && searched && (
        <div className="glass rounded-lg p-3 border border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400">शोध परिणाम</p>
              <p className="text-lg font-bold text-white">{records.length} {records.length === 1 ? 'रेकॉर्ड' : 'रेकॉर्ड'} सापडले</p>
            </div>
          </div>
        </div>
      )}

      {!loading && records.length > 0 && (
        <div className="space-y-3">
          <DuplicateTable 
            records={records} 
            verifiedSrNos={verifiedSrNos} 
            onSelectChange={(selected) => {
              console.log('[VerifyPage] Selection changed:', selected);
              setSelected(selected);
            }} 
          />
          <div className="glass rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">निवडलेले रेकॉर्ड</p>
                <p className="text-base font-bold text-white">{selected.length} रेकॉर्ड निवडले</p>
              </div>
              <div className="flex gap-2">
                <button 
                  className="px-4 py-2 rounded-lg bg-linear-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed glow-hover shadow-lg transition-all flex items-center gap-2" 
                  onClick={() => {
                    console.log('[VerifyPage] Mark Duplicates button clicked');
                    mark(true);
                  }} 
                  disabled={loading || selected.length === 0}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  डुप्लिकेट म्हणून चिन्हांकित करा
                </button>
                <button 
                  className="px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white text-sm font-semibold hover:bg-slate-700 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2" 
                  onClick={() => {
                    console.log('[VerifyPage] Mark Not Duplicates button clicked');
                    mark(false);
                  }} 
                  disabled={loading || selected.length === 0}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  डुप्लिकेट नाही म्हणून चिन्हांकित करा
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && searched && records.length === 0 && (
        <div className="glass rounded-xl p-8 border border-white/10 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">परिणाम सापडले नाहीत</h3>
          <p className="text-sm text-slate-400">डुप्लिकेट रेकॉर्ड शोधण्यासाठी भिन्न शोध निकष वापरून पहा</p>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
