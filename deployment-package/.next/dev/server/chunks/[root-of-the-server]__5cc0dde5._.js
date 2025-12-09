module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/hmac.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAuthHeaders",
    ()=>buildAuthHeaders,
    "signRequest",
    ()=>signRequest,
    "unixTimestampSeconds",
    ()=>unixTimestampSeconds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$crypto$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/crypto-js/index.js [app-route] (ecmascript)");
;
function unixTimestampSeconds() {
    return Math.floor(Date.now() / 1000).toString();
}
function signRequest(method, pathWithQuery, body, timestamp, apiKey, secretKey) {
    const stringToSign = method.toUpperCase() + pathWithQuery + body + timestamp + apiKey;
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$crypto$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].HmacSHA256(stringToSign, secretKey).toString(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$crypto$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].enc.Base64);
    return signature;
}
function buildAuthHeaders(method, pathWithQuery, body) {
    const apiKey = process.env.API_KEY ?? '';
    const secretKey = process.env.SECRET_KEY ?? '';
    const timestamp = unixTimestampSeconds();
    const signature = signRequest(method, pathWithQuery, body, timestamp, apiKey, secretKey);
    return {
        'X-API-Key': apiKey,
        'X-Timestamp': timestamp,
        'X-Signature': signature
    };
}
}),
"[project]/src/lib/api/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiServer",
    ()=>apiServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hmac$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hmac.ts [app-route] (ecmascript)");
;
function getBaseUrl() {
    return process.env.BASE_URL || '';
}
async function request(method, path, body) {
    const url = new URL(path, getBaseUrl());
    const pathWithQuery = url.pathname + (url.search || '');
    const bodyStr = body ? JSON.stringify(body) : '';
    const headers = {
        'Content-Type': 'application/json',
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hmac$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildAuthHeaders"])(method, pathWithQuery, bodyStr)
    };
    console.log(`[API Server] ${method} ${url.toString()}`);
    const res = await fetch(url.toString(), {
        method,
        headers,
        body: bodyStr || undefined,
        cache: 'no-store',
        next: {
            revalidate: 0
        }
    });
    console.log(`[API Server] Response status: ${res.status}`);
    if (!res.ok) {
        const text = await res.text();
        console.error(`[API Server] Error response:`, text);
        throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
    }
    const json = await res.json();
    console.log('[API Server] Response JSON:', json);
    // Handle .NET ApiResponse wrapper structure
    if (json && typeof json === 'object') {
        // Check if it's wrapped in ApiResponse with Success/Data pattern
        if ('success' in json || 'Success' in json) {
            const success = json.success ?? json.Success;
            console.log('[API Server] .NET ApiResponse detected, Success:', success);
            if (!success) {
                const message = json.message ?? json.Message ?? 'API request failed';
                const errorCode = json.errorCode ?? json.ErrorCode ?? 'UNKNOWN_ERROR';
                console.error('[API Server] .NET API returned failure:', {
                    message,
                    errorCode
                });
                throw new Error(`${message} (${errorCode})`);
            }
            // Extract the actual data from Data property
            const data = json.data ?? json.Data;
            console.log('[API Server] Extracted data from .NET ApiResponse:', data);
            return data;
        }
    }
    return json;
}
const apiServer = {
    findDuplicates: (payload)=>request('POST', '/api/voters/find-duplicates', payload),
    verificationStatus: ()=>request('GET', '/api/voters/verification-status'),
    duplicateGroups: (duplicationId)=>request('GET', duplicationId ? `/api/voters/duplicate-groups?duplicationId=${duplicationId}` : '/api/voters/duplicate-groups'),
    voterBySrNo: (srNo)=>request('GET', `/api/voters/${srNo}`),
    unverifiedCount: ()=>request('GET', '/api/voters/unverified-count'),
    markDuplicates: (payload)=>request('POST', '/api/voters/mark-duplicates', payload),
    resetVerification: ()=>request('POST', '/api/voters/reset-verification'),
    voterReport: (payload)=>request('POST', '/api/voters/report', payload)
};
}),
"[project]/src/app/api/voters/unverified-count/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/server.ts [app-route] (ecmascript)");
;
;
async function GET() {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiServer"].unverifiedCount();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5cc0dde5._.js.map