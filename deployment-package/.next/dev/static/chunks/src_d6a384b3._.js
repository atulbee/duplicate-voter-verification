(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
'use client';
async function request(method, path, body) {
    console.log(`[API Client] ${method} ${path}`, body ? {
        body
    } : '');
    const bodyStr = body ? JSON.stringify(body) : '';
    const headers = {
        'Content-Type': 'application/json'
    };
    console.log('[API Client] Fetch options:', {
        method,
        path,
        headers,
        hasBody: !!bodyStr
    });
    const res = await fetch(path, {
        method,
        headers,
        body: bodyStr || undefined,
        cache: 'no-store'
    });
    console.log(`[API Client] Response status: ${res.status} ${res.statusText}`);
    console.log('[API Client] Full response object:', res);
    console.log('[API Client] Response headers:', Object.fromEntries(res.headers.entries()));
    if (!res.ok) {
        const text = await res.text();
        console.error(`[API Client] Error response:`, text);
        throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
    }
    const json = await res.json();
    console.log(`[API Client] Response data:`, json);
    console.log('[API Client] Response data (stringified):', JSON.stringify(json, null, 2));
    // Handle .NET ApiResponse wrapper structure
    if (json && typeof json === 'object') {
        console.log('[API Client] Checking for .NET ApiResponse structure...');
        // Check if it's wrapped in ApiResponse with Success/Data pattern
        if ('success' in json || 'Success' in json) {
            const success = json.success ?? json.Success;
            console.log('[API Client] .NET ApiResponse detected, Success:', success);
            if (!success) {
                const message = json.message ?? json.Message ?? 'API request failed';
                const errorCode = json.errorCode ?? json.ErrorCode ?? 'UNKNOWN_ERROR';
                console.error('[API Client] .NET API returned failure:', {
                    message,
                    errorCode
                });
                throw new Error(`${message} (${errorCode})`);
            }
            // Extract the actual data from Data property
            const data = json.data ?? json.Data;
            console.log('[API Client] Extracted data from .NET ApiResponse:', data);
            return data;
        }
    }
    return json;
}
const api = {
    findDuplicates: (payload)=>request('POST', '/api/voters/find-duplicates', payload),
    verificationStatus: ()=>request('GET', '/api/voters/verification-status'),
    duplicateGroups: (duplicationId)=>request('GET', duplicationId ? `/api/voters/duplicate-groups?duplicationId=${duplicationId}` : '/api/voters/duplicate-groups'),
    voterBySrNo: (srNo)=>request('GET', `/api/voters/${srNo}`),
    unverifiedCount: ()=>request('GET', '/api/voters/unverified-count'),
    markDuplicates: (payload)=>request('POST', '/api/voters/mark-duplicates', payload),
    resetVerification: ()=>request('POST', '/api/voters/reset-verification')
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/DuplicateTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DuplicateTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DuplicateTable(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(61);
    if ($[0] !== "690c9de13a40e9ca729e3bc0c983c1c7c855f16af16d9d946fda322afd27a822") {
        for(let $i = 0; $i < 61; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "690c9de13a40e9ca729e3bc0c983c1c7c855f16af16d9d946fda322afd27a822";
    }
    const { records, verifiedSrNos, onSelectChange } = t0;
    console.log("[DuplicateTable] Component rendered with:", {
        recordCount: records.length,
        verifiedCount: verifiedSrNos.size,
        verifiedSrNos: Array.from(verifiedSrNos)
    });
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [sortConfig, setSortConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t2;
    if ($[2] !== onSelectChange || $[3] !== selected) {
        t2 = ({
            "DuplicateTable[useEffect()]": ()=>{
                onSelectChange(selected);
            }
        })["DuplicateTable[useEffect()]"];
        $[2] = onSelectChange;
        $[3] = selected;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== selected) {
        t3 = [
            selected
        ];
        $[5] = selected;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    bb0: {
        console.log("[DuplicateTable] Calculating duplicate columns...");
        if (!records || records.length < 2) {
            console.log("[DuplicateTable] Not enough records for duplicate detection");
            let t5;
            if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
                t5 = new Set();
                $[7] = t5;
            } else {
                t5 = $[7];
            }
            t4 = t5;
            break bb0;
        }
        let cols;
        if ($[8] !== records) {
            cols = new Set();
            let t5;
            if ($[10] !== records[0]) {
                t5 = Object.keys(records[0] || {});
                $[10] = records[0];
                $[11] = t5;
            } else {
                t5 = $[11];
            }
            const keys = t5;
            for (const key of keys){
                const values = new Set(records.map({
                    "DuplicateTable[records.map()]": (r)=>String(r[key] ?? "")
                }["DuplicateTable[records.map()]"]));
                if (values.size === 1) {
                    cols.add(key);
                }
            }
            $[8] = records;
            $[9] = cols;
        } else {
            cols = $[9];
        }
        console.log("[DuplicateTable] Duplicate columns identified:", Array.from(cols));
        t4 = cols;
    }
    const duplicateColumns = t4;
    let t5;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = function getSrNo(record) {
            return record.srNo ?? record.SrNo ?? 0;
        };
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    const getSrNo = t5;
    let t6;
    if ($[13] !== verifiedSrNos) {
        t6 = function toggle(srNo) {
            console.log("[DuplicateTable] toggle() called for srNo:", srNo);
            if (verifiedSrNos.has(srNo)) {
                console.log("[DuplicateTable] SrNo is verified, toggle blocked");
                return;
            }
            setSelected({
                "DuplicateTable[toggle > setSelected()]": (prev)=>{
                    const next = prev.includes(srNo) ? prev.filter({
                        "DuplicateTable[toggle > setSelected() > prev.filter()]": (n)=>n !== srNo
                    }["DuplicateTable[toggle > setSelected() > prev.filter()]"]) : [
                        ...prev,
                        srNo
                    ];
                    console.log("[DuplicateTable] Selection updated from", prev, "to", next);
                    return next;
                }
            }["DuplicateTable[toggle > setSelected()]"]);
        };
        $[13] = verifiedSrNos;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    const toggle = t6;
    let t7;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "DuplicateTable[handleSort]": (key_0)=>{
                setSortConfig({
                    "DuplicateTable[handleSort > setSortConfig()]": (current)=>{
                        if (current?.key === key_0) {
                            if (current.direction === "asc") {
                                return {
                                    key: key_0,
                                    direction: "desc"
                                };
                            }
                            return null;
                        }
                        return {
                            key: key_0,
                            direction: "asc"
                        };
                    }
                }["DuplicateTable[handleSort > setSortConfig()]"]);
            }
        })["DuplicateTable[handleSort]"];
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    const handleSort = t7;
    let t8;
    bb1: {
        if (!sortConfig) {
            t8 = records;
            break bb1;
        }
        let t9;
        if ($[16] !== records || $[17] !== sortConfig) {
            let t10;
            if ($[19] !== sortConfig) {
                t10 = ({
                    "DuplicateTable[(anonymous)()]": (a, b)=>{
                        const aVal = a[sortConfig.key];
                        const bVal = b[sortConfig.key];
                        if (aVal == null && bVal == null) {
                            return 0;
                        }
                        if (aVal == null) {
                            return 1;
                        }
                        if (bVal == null) {
                            return -1;
                        }
                        if (typeof aVal === "number" && typeof bVal === "number") {
                            return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
                        }
                        const aStr = String(aVal).toLowerCase();
                        const bStr = String(bVal).toLowerCase();
                        if (sortConfig.direction === "asc") {
                            return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
                        } else {
                            return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
                        }
                    }
                })["DuplicateTable[(anonymous)()]"];
                $[19] = sortConfig;
                $[20] = t10;
            } else {
                t10 = $[20];
            }
            t9 = [
                ...records
            ].sort(t10);
            $[16] = records;
            $[17] = sortConfig;
            $[18] = t9;
        } else {
            t9 = $[18];
        }
        const sorted = t9;
        t8 = sorted;
    }
    const sortedRecords = t8;
    let t9;
    bb2: {
        if (records.length === 0) {
            let t10;
            if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
                t10 = [];
                $[21] = t10;
            } else {
                t10 = $[21];
            }
            t9 = t10;
            break bb2;
        }
        let t10;
        if ($[22] !== records[0]) {
            t10 = Object.keys(records[0]).filter(_DuplicateTableAnonymous);
            $[22] = records[0];
            $[23] = t10;
        } else {
            t10 = $[23];
        }
        t9 = t10;
    }
    const displayKeys = t9;
    let t10;
    let t11;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            className: "px-4 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider sticky left-0 bg-gray-50 backdrop-blur-sm z-10 border-r border-gray-200",
            children: "स्थिती"
        }, void 0, false, {
            fileName: "[project]/src/components/DuplicateTable.tsx",
            lineNumber: 247,
            columnNumber: 11
        }, this);
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            className: "px-4 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-gray-200",
            children: "निवडा"
        }, void 0, false, {
            fileName: "[project]/src/components/DuplicateTable.tsx",
            lineNumber: 248,
            columnNumber: 11
        }, this);
        $[24] = t10;
        $[25] = t11;
    } else {
        t10 = $[24];
        t11 = $[25];
    }
    let t12;
    if ($[26] !== displayKeys || $[27] !== duplicateColumns || $[28] !== sortConfig) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                className: "border-b-2 border-gray-300 bg-linear-to-r from-gray-50 to-gray-100",
                children: [
                    t10,
                    t11,
                    displayKeys.map({
                        "DuplicateTable[displayKeys.map()]": (key_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: `px-4 py-4 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all group border-r border-gray-200 ${duplicateColumns.has(key_2) ? "bg-amber-50 text-amber-900" : "text-gray-800 hover:bg-gray-100"}`,
                                onClick: {
                                    "DuplicateTable[displayKeys.map() > <th>.onClick]": ()=>handleSort(key_2)
                                }["DuplicateTable[displayKeys.map() > <th>.onClick]"],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold",
                                            children: key_2
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DuplicateTable.tsx",
                                            lineNumber: 260,
                                            columnNumber: 107
                                        }, this),
                                        duplicateColumns.has(key_2) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-amber-200 text-amber-900 border border-amber-400 shadow-sm",
                                            children: "DUPLICATE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DuplicateTable.tsx",
                                            lineNumber: 260,
                                            columnNumber: 185
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-auto opacity-50 group-hover:opacity-100 transition-opacity",
                                            children: sortConfig?.key === key_2 ? sortConfig.direction === "asc" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 text-green-500",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M5 15l7-7 7 7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DuplicateTable.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 584
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DuplicateTable.tsx",
                                                lineNumber: 260,
                                                columnNumber: 490
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 text-green-400",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M19 9l-7 7-7-7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DuplicateTable.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 774
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DuplicateTable.tsx",
                                                lineNumber: 260,
                                                columnNumber: 680
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4 text-slate-500",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DuplicateTable.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 965
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DuplicateTable.tsx",
                                                lineNumber: 260,
                                                columnNumber: 871
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DuplicateTable.tsx",
                                            lineNumber: 260,
                                            columnNumber: 348
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DuplicateTable.tsx",
                                    lineNumber: 260,
                                    columnNumber: 66
                                }, this)
                            }, key_2, false, {
                                fileName: "[project]/src/components/DuplicateTable.tsx",
                                lineNumber: 258,
                                columnNumber: 57
                            }, this)
                    }["DuplicateTable[displayKeys.map()]"])
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DuplicateTable.tsx",
                lineNumber: 257,
                columnNumber: 18
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/DuplicateTable.tsx",
            lineNumber: 257,
            columnNumber: 11
        }, this);
        $[26] = displayKeys;
        $[27] = duplicateColumns;
        $[28] = sortConfig;
        $[29] = t12;
    } else {
        t12 = $[29];
    }
    let t13;
    if ($[30] !== displayKeys || $[31] !== duplicateColumns || $[32] !== selected || $[33] !== sortedRecords || $[34] !== toggle || $[35] !== verifiedSrNos) {
        let t14;
        if ($[37] !== displayKeys || $[38] !== duplicateColumns || $[39] !== selected || $[40] !== toggle || $[41] !== verifiedSrNos) {
            t14 = ({
                "DuplicateTable[sortedRecords.map()]": (r_0, idx)=>{
                    const srNo_0 = getSrNo(r_0);
                    const isVerified = verifiedSrNos.has(srNo_0);
                    const isSelected = selected.includes(srNo_0);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: `transition-all border-b border-gray-200 ${isSelected ? "bg-green-50" : "hover:bg-gray-50"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-4 py-4 sticky left-0 bg-white backdrop-blur-sm z-10 border-r border-gray-200",
                                children: isVerified ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-green-100 text-green-700 border border-green-300 shadow-sm",
                                    children: "✓ सत्यापित"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DuplicateTable.tsx",
                                    lineNumber: 278,
                                    columnNumber: 265
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-100 text-orange-700 border border-orange-300 shadow-sm",
                                    children: "⚠ असत्यापित"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DuplicateTable.tsx",
                                    lineNumber: 278,
                                    columnNumber: 431
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/DuplicateTable.tsx",
                                lineNumber: 278,
                                columnNumber: 155
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-4 py-4 border-r border-gray-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        disabled: isVerified,
                                        checked: isSelected,
                                        onChange: {
                                            "DuplicateTable[sortedRecords.map() > <input>.onChange]": ()=>toggle(srNo_0)
                                        }["DuplicateTable[sortedRecords.map() > <input>.onChange]"],
                                        className: "w-5 h-5 rounded border-2 border-gray-300 bg-white text-green-600 focus:ring-2 focus:ring-green-500/30 focus:ring-offset-0 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DuplicateTable.tsx",
                                        lineNumber: 278,
                                        columnNumber: 707
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DuplicateTable.tsx",
                                    lineNumber: 278,
                                    columnNumber: 655
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/DuplicateTable.tsx",
                                lineNumber: 278,
                                columnNumber: 604
                            }, this),
                            displayKeys.map({
                                "DuplicateTable[sortedRecords.map() > displayKeys.map()]": (key_3)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: `px-4 py-4 text-sm font-medium whitespace-nowrap border-r border-gray-200 ${duplicateColumns.has(key_3) ? "bg-amber-100 text-amber-900 font-bold" : "text-gray-900"}`,
                                        children: String(r_0[key_3] ?? "-")
                                    }, key_3, false, {
                                        fileName: "[project]/src/components/DuplicateTable.tsx",
                                        lineNumber: 281,
                                        columnNumber: 83
                                    }, this)
                            }["DuplicateTable[sortedRecords.map() > displayKeys.map()]"])
                        ]
                    }, String(srNo_0 ?? idx), true, {
                        fileName: "[project]/src/components/DuplicateTable.tsx",
                        lineNumber: 278,
                        columnNumber: 18
                    }, this);
                }
            })["DuplicateTable[sortedRecords.map()]"];
            $[37] = displayKeys;
            $[38] = duplicateColumns;
            $[39] = selected;
            $[40] = toggle;
            $[41] = verifiedSrNos;
            $[42] = t14;
        } else {
            t14 = $[42];
        }
        t13 = sortedRecords.map(t14);
        $[30] = displayKeys;
        $[31] = duplicateColumns;
        $[32] = selected;
        $[33] = sortedRecords;
        $[34] = toggle;
        $[35] = verifiedSrNos;
        $[36] = t13;
    } else {
        t13 = $[36];
    }
    let t14;
    if ($[43] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            children: t13
        }, void 0, false, {
            fileName: "[project]/src/components/DuplicateTable.tsx",
            lineNumber: 307,
            columnNumber: 11
        }, this);
        $[43] = t13;
        $[44] = t14;
    } else {
        t14 = $[44];
    }
    let t15;
    if ($[45] !== t12 || $[46] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-x-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full border-collapse",
                children: [
                    t12,
                    t14
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DuplicateTable.tsx",
                lineNumber: 315,
                columnNumber: 44
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/DuplicateTable.tsx",
            lineNumber: 315,
            columnNumber: 11
        }, this);
        $[45] = t12;
        $[46] = t14;
        $[47] = t15;
    } else {
        t15 = $[47];
    }
    let t16;
    if ($[48] !== records.length) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-bold text-gray-900",
            children: records.length
        }, void 0, false, {
            fileName: "[project]/src/components/DuplicateTable.tsx",
            lineNumber: 324,
            columnNumber: 11
        }, this);
        $[48] = records.length;
        $[49] = t16;
    } else {
        t16 = $[49];
    }
    const t17 = records.length !== 1 ? "s" : "";
    let t18;
    if ($[50] !== t16 || $[51] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-gray-600",
            children: [
                "Showing ",
                t16,
                " record",
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/DuplicateTable.tsx",
            lineNumber: 333,
            columnNumber: 11
        }, this);
        $[50] = t16;
        $[51] = t17;
        $[52] = t18;
    } else {
        t18 = $[52];
    }
    let t19;
    if ($[53] !== selected.length) {
        t19 = selected.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-gray-600",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-bold text-green-600",
                    children: selected.length
                }, void 0, false, {
                    fileName: "[project]/src/components/DuplicateTable.tsx",
                    lineNumber: 342,
                    columnNumber: 66
                }, this),
                " selected"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/DuplicateTable.tsx",
            lineNumber: 342,
            columnNumber: 34
        }, this);
        $[53] = selected.length;
        $[54] = t19;
    } else {
        t19 = $[54];
    }
    let t20;
    if ($[55] !== t18 || $[56] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-6 py-4 bg-gray-50 border-t border-gray-200",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between text-sm",
                children: [
                    t18,
                    t19
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DuplicateTable.tsx",
                lineNumber: 350,
                columnNumber: 74
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/DuplicateTable.tsx",
            lineNumber: 350,
            columnNumber: 11
        }, this);
        $[55] = t18;
        $[56] = t19;
        $[57] = t20;
    } else {
        t20 = $[57];
    }
    let t21;
    if ($[58] !== t15 || $[59] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm",
            children: [
                t15,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/DuplicateTable.tsx",
            lineNumber: 359,
            columnNumber: 11
        }, this);
        $[58] = t15;
        $[59] = t20;
        $[60] = t21;
    } else {
        t21 = $[60];
    }
    return t21;
}
_s(DuplicateTable, "LzV/4phttl0ekg606L3IBHx2YKQ=");
_c = DuplicateTable;
function _DuplicateTableAnonymous(key_1) {
    return key_1 !== "isVerified";
}
var _c;
__turbopack_context__.k.register(_c, "DuplicateTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Loader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Loader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
'use client';
;
;
function Loader(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "702fa9d870f0a2bb5ea853cf49e94113239be53273257ef337090cf239a9c389") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "702fa9d870f0a2bb5ea853cf49e94113239be53273257ef337090cf239a9c389";
    }
    const { label: t1 } = t0;
    const label = t1 === undefined ? "Loading..." : t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-block animate-spin rounded-full border-2 border-current border-r-transparent h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/Loader.tsx",
            lineNumber: 18,
            columnNumber: 10
        }, this);
        $[1] = t2;
    } else {
        t2 = $[1];
    }
    let t3;
    if ($[2] !== label) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 text-sm text-zinc-500",
            role: "status",
            "aria-live": "polite",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: label
                }, void 0, false, {
                    fileName: "[project]/src/components/Loader.tsx",
                    lineNumber: 25,
                    columnNumber: 110
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Loader.tsx",
            lineNumber: 25,
            columnNumber: 10
        }, this);
        $[2] = label;
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    return t3;
}
_c = Loader;
var _c;
__turbopack_context__.k.register(_c, "Loader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toast",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Toast(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "8562858de2debf8364a1db3862890df8449887516833c159c80a27a6ab009fa0") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8562858de2debf8364a1db3862890df8449887516833c159c80a27a6ab009fa0";
    }
    const { message, type: t1 } = t0;
    const type = t1 === undefined ? "info" : t1;
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    let t2;
    let t3;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "Toast[useEffect()]": ()=>{
                const t = setTimeout({
                    "Toast[useEffect() > setTimeout()]": ()=>setShow(false)
                }["Toast[useEffect() > setTimeout()]"], 3000);
                return ()=>clearTimeout(t);
            }
        })["Toast[useEffect()]"];
        t3 = [];
        $[1] = t2;
        $[2] = t3;
    } else {
        t2 = $[1];
        t3 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    if (!show) {
        return null;
    }
    const color = type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-zinc-800";
    const t4 = `fixed bottom-4 right-4 text-white px-3 py-2 rounded ${color} shadow`;
    let t5;
    if ($[3] !== message || $[4] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            children: message
        }, void 0, false, {
            fileName: "[project]/src/components/Toast.tsx",
            lineNumber: 45,
            columnNumber: 10
        }, this);
        $[3] = message;
        $[4] = t4;
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    return t5;
}
_s(Toast, "7rrxj0wE5iz58YydTDN/pg4Izes=");
_c = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(verify)/verify/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VerifyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DuplicateTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DuplicateTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Loader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function VerifyPage() {
    _s();
    console.log('[VerifyPage] Component mounted/rendered');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        firstName: '',
        middleName: '',
        lastName: ''
    });
    const [records, setRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [verifiedSrNos, setVerifiedSrNos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searched, setSearched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VerifyPage.useEffect": ()=>{
            console.log('[VerifyPage] useEffect: Fetching unverified count on mount');
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].unverifiedCount().then({
                "VerifyPage.useEffect": (count)=>{
                    console.log('[VerifyPage] Unverified count fetched:', count);
                }
            }["VerifyPage.useEffect"]).catch({
                "VerifyPage.useEffect": (err)=>{
                    console.error('[VerifyPage] Failed to fetch unverified count:', err);
                }
            }["VerifyPage.useEffect"]);
        }
    }["VerifyPage.useEffect"], []);
    async function search() {
        console.log('[VerifyPage] search() called with query:', query);
        setLoading(true);
        console.log('[VerifyPage] Loading state set to true');
        try {
            console.log('[VerifyPage] Calling API findDuplicates...');
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].findDuplicates({
                firstName: query.firstName,
                middleName: query.middleName,
                lastName: query.lastName
            });
            console.log('[VerifyPage] API response received:', res);
            const list = Array.isArray(res?.records) ? res.records : Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : Array.isArray(res?.result) ? res.result : [];
            console.log('[VerifyPage] Extracted records list:', list.length, 'items');
            setRecords(list);
            console.log('[VerifyPage] Records state updated');
            const verified = new Set(res?.verifiedSrNos || []);
            console.log('[VerifyPage] Verified SrNos:', Array.from(verified));
            setVerifiedSrNos(verified);
            setSelected([]);
            console.log('[VerifyPage] Selected state cleared');
            setSearched(true);
            console.log('[VerifyPage] Search completed successfully');
        } catch (e) {
            console.error('[VerifyPage] Search error:', e);
            setToast({
                message: e.message || 'Search failed',
                type: 'error'
            });
            setSearched(true);
        } finally{
            setLoading(false);
            console.log('[VerifyPage] Loading state set to false');
        }
    }
    async function mark(isDuplicate) {
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
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].markDuplicates(payload);
            console.log('[VerifyPage] Mark duplicates API call successful');
            setToast({
                message: 'Saved successfully',
                type: 'success'
            });
            console.log('[VerifyPage] Success toast shown');
            console.log('[VerifyPage] Refreshing search results...');
            await search();
        } catch (e_0) {
            console.error('[VerifyPage] Mark error:', e_0);
            setToast({
                message: e_0.message || 'Save failed',
                type: 'error'
            });
        } finally{
            setLoading(false);
            console.log('[VerifyPage] Loading state set to false');
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 sm:space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 sm:gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6 sm:w-7 sm:h-7 text-white",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(verify)/verify/page.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-xl sm:text-3xl font-bold text-gray-900",
                                    children: "डुप्लिकेट शोधा"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm sm:text-base text-gray-600 mt-1",
                                    children: "मतदार डेटा शोधा आणि सत्यापित करा"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(verify)/verify/page.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-bold text-gray-900 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 rounded-full bg-green-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 15
                                            }, this),
                                            "पहिले नाव"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 border text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:outline-none focus:bg-white transition-all text-base font-medium",
                                        placeholder: "पहिले नाव टाका",
                                        value: query.firstName,
                                        onChange: (e_1)=>{
                                            console.log('[VerifyPage] First name input changed:', e_1.target.value);
                                            setQuery({
                                                ...query,
                                                firstName: e_1.target.value
                                            });
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-bold text-gray-900 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 rounded-full bg-blue-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                                lineNumber: 142,
                                                columnNumber: 15
                                            }, this),
                                            "मधले नाव"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 border text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none focus:bg-white transition-all text-base font-medium",
                                        placeholder: "मधले नाव टाका",
                                        value: query.middleName,
                                        onChange: (e_2)=>{
                                            console.log('[VerifyPage] Middle name input changed:', e_2.target.value);
                                            setQuery({
                                                ...query,
                                                middleName: e_2.target.value
                                            });
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-bold text-gray-900 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 rounded-full bg-purple-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                                lineNumber: 155,
                                                columnNumber: 15
                                            }, this),
                                            "आडनाव"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-300 border text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:outline-none focus:bg-white transition-all text-base font-medium",
                                        placeholder: "आडनाव टाका",
                                        value: query.lastName,
                                        onChange: (e_3)=>{
                                            console.log('[VerifyPage] Last name input changed:', e_3.target.value);
                                            setQuery({
                                                ...query,
                                                lastName: e_3.target.value
                                            });
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full mt-6 px-6 py-4 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 text-white text-base font-bold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]",
                        onClick: ()=>{
                            console.log('[VerifyPage] Search button clicked');
                            search();
                        },
                        disabled: loading,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                    lineNumber: 172,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                lineNumber: 171,
                                columnNumber: 13
                            }, this),
                            loading ? 'शोधत आहे...' : 'शोधा'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                label: "Searching for duplicates..."
            }, void 0, false, {
                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                lineNumber: 178,
                columnNumber: 19
            }, this),
            !loading && searched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-lg p-3 border border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4 text-blue-400",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                lineNumber: 183,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(verify)/verify/page.tsx",
                            lineNumber: 182,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-400",
                                    children: "शोध परिणाम"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-bold text-white",
                                    children: [
                                        records.length,
                                        " ",
                                        records.length === 1 ? 'रेकॉर्ड' : 'रेकॉर्ड',
                                        " सापडले"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(verify)/verify/page.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                lineNumber: 180,
                columnNumber: 32
            }, this),
            !loading && records.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DuplicateTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        records: records,
                        verifiedSrNos: verifiedSrNos,
                        onSelectChange: (selected_0)=>{
                            console.log('[VerifyPage] Selection changed:', selected_0);
                            setSelected(selected_0);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-lg p-4 border border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-400",
                                            children: "निवडलेले रेकॉर्ड"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base font-bold text-white",
                                            children: [
                                                selected.length,
                                                " रेकॉर्ड निवडले"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                    lineNumber: 201,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "px-4 py-2 rounded-lg bg-linear-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed glow-hover shadow-lg transition-all flex items-center gap-2",
                                            onClick: ()=>{
                                                console.log('[VerifyPage] Mark Duplicates button clicked');
                                                mark(true);
                                            },
                                            disabled: loading || selected.length === 0,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M5 13l4 4L19 7"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 19
                                                }, this),
                                                "डुप्लिकेट म्हणून चिन्हांकित करा"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white text-sm font-semibold hover:bg-slate-700 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2",
                                            onClick: ()=>{
                                                console.log('[VerifyPage] Mark Not Duplicates button clicked');
                                                mark(false);
                                            },
                                            disabled: loading || selected.length === 0,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M6 18L18 6M6 6l12 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 19
                                                }, this),
                                                "डुप्लिकेट नाही म्हणून चिन्हांकित करा"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(verify)/verify/page.tsx",
                            lineNumber: 200,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                lineNumber: 194,
                columnNumber: 42
            }, this),
            !loading && searched && records.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-xl p-8 border border-white/10 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-8 h-8 text-slate-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                                lineNumber: 232,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(verify)/verify/page.tsx",
                            lineNumber: 231,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-white mb-1",
                        children: "परिणाम सापडले नाहीत"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-400",
                        children: "डुप्लिकेट रेकॉर्ड शोधण्यासाठी भिन्न शोध निकष वापरून पहा"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(verify)/verify/page.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                lineNumber: 229,
                columnNumber: 56
            }, this),
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toast"], {
                message: toast.message,
                type: toast.type
            }, void 0, false, {
                fileName: "[project]/src/app/(verify)/verify/page.tsx",
                lineNumber: 239,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(verify)/verify/page.tsx",
        lineNumber: 108,
        columnNumber: 10
    }, this);
}
_s(VerifyPage, "tCNzp2DtFG2YJ+iRFjiBmU7HzRo=");
_c = VerifyPage;
var _c;
__turbopack_context__.k.register(_c, "VerifyPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_d6a384b3._.js.map