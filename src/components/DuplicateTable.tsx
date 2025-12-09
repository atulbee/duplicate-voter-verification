'use client';
import React, { useMemo, useState, useEffect } from 'react';

type Voter = {
  srNo?: number;
  SrNo?: number;
  [key: string]: any;
};

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

export default function DuplicateTable({
  records,
  verifiedSrNos,
  onSelectChange,
}: {
  records: Voter[];
  verifiedSrNos: Set<number>;
  onSelectChange: (selected: number[]) => void;
}) {
  console.log('[DuplicateTable] Component rendered with:', {
    recordCount: records.length,
    verifiedCount: verifiedSrNos.size,
    verifiedSrNos: Array.from(verifiedSrNos)
  });
  
  const [selected, setSelected] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  // Sync selected state to parent after render
  useEffect(() => {
    onSelectChange(selected);
  }, [selected]);

  const duplicateColumns = useMemo(() => {
    console.log('[DuplicateTable] Calculating duplicate columns...');
    if (!records || records.length < 2) {
      console.log('[DuplicateTable] Not enough records for duplicate detection');
      return new Set<string>();
    }
    const cols = new Set<string>();
    const keys = Object.keys(records[0] || {});
    for (const key of keys) {
      const values = new Set(records.map((r) => String(r[key] ?? '')));
      if (values.size === 1) cols.add(key);
    }
    console.log('[DuplicateTable] Duplicate columns identified:', Array.from(cols));
    return cols;
  }, [records]);

  function getSrNo(record: any): number {
    return record.srNo ?? record.SrNo ?? 0;
  }

  function toggle(srNo: number) {
    console.log('[DuplicateTable] toggle() called for srNo:', srNo);
    
    if (verifiedSrNos.has(srNo)) {
      console.log('[DuplicateTable] SrNo is verified, toggle blocked');
      return;
    }
    
    setSelected((prev: number[]) => {
      const next = prev.includes(srNo) ? prev.filter((n: number) => n !== srNo) : [...prev, srNo];
      console.log('[DuplicateTable] Selection updated from', prev, 'to', next);
      return next;
    });
  }

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        // Toggle direction or clear sort
        if (current.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        return null; // Clear sort
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedRecords = useMemo(() => {
    if (!sortConfig) return records;
    
    const sorted = [...records].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      // Handle null/undefined
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      
      // Compare values
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      
      if (sortConfig.direction === 'asc') {
        return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      } else {
        return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
      }
    });
    
    return sorted;
  }, [records, sortConfig]);

  const displayKeys = useMemo(() => {
    if (records.length === 0) return [];
    return Object.keys(records[0]).filter(key => key !== 'isVerified');
  }, [records]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 bg-linear-to-r from-gray-50 to-gray-100">
              <th className="px-4 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider sticky left-0 bg-gray-50 backdrop-blur-sm z-10 border-r border-gray-200">
                स्थिती
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-gray-200">
                निवडा
              </th>
              {displayKeys.map((key) => (
                <th 
                  key={key} 
                  className={`px-4 py-4 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all group border-r border-gray-200 ${
                    duplicateColumns.has(key) 
                      ? 'bg-amber-50 text-amber-900' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{key}</span>
                    {duplicateColumns.has(key) && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-amber-200 text-amber-900 border border-amber-400 shadow-sm">
                        DUPLICATE
                      </span>
                    )}
                    <span className="ml-auto opacity-50 group-hover:opacity-100 transition-opacity">
                      {sortConfig?.key === key ? (
                        sortConfig.direction === 'asc' ? (
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )
                      ) : (
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
            </thead>
            <tbody>
              {sortedRecords.map((r, idx) => {
                const srNo = getSrNo(r);
                const isVerified = verifiedSrNos.has(srNo);
                const isSelected = selected.includes(srNo);
                
                return (
                  <tr 
                    key={String(srNo ?? idx)}
                    className={`transition-all border-b border-gray-200 ${
                      isSelected 
                        ? 'bg-green-50' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-4 sticky left-0 bg-white backdrop-blur-sm z-10 border-r border-gray-200">
                      {isVerified ? (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-green-100 text-green-700 border border-green-300 shadow-sm">
                          ✓ सत्यापित
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-100 text-orange-700 border border-orange-300 shadow-sm">
                          ⚠ असत्यापित
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-200">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          disabled={isVerified}
                          checked={isSelected}
                          onChange={() => toggle(srNo)}
                          className="w-5 h-5 rounded border-2 border-gray-300 bg-white text-green-600 focus:ring-2 focus:ring-green-500/30 focus:ring-offset-0 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        />
                      </label>
                    </td>
                    {displayKeys.map((key) => (
                      <td
                        key={key}
                        className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-r border-gray-200 ${
                          duplicateColumns.has(key) 
                            ? 'bg-amber-100 text-amber-900 font-bold' 
                            : 'text-gray-900'
                        }`}
                      >
                        {String(r[key] ?? '-')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Showing <span className="font-bold text-gray-900">{records.length}</span> record{records.length !== 1 ? 's' : ''}
            </span>
            {selected.length > 0 && (
              <span className="text-gray-600">
                <span className="font-bold text-green-600">{selected.length}</span> selected
              </span>
            )}
          </div>
        </div>
    </div>
  );
}
