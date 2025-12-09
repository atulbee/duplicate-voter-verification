import { describe, it, expect } from 'vitest';
import { signRequest } from '@/lib/hmac';

describe('HMAC signing', () => {
  it('produces a Base64 signature string', () => {
    const method = 'POST';
    const path = '/api/voters/find-duplicates?x=1';
    const body = JSON.stringify({ firstName: 'A', lastName: 'B' });
    const ts = '1733460000';
    const apiKey = 'APIKEY123';
    const secretKey = 'SECRETKEY456';
    const sig = signRequest(method, path, body, ts, apiKey, secretKey);
    expect(typeof sig).toBe('string');
    expect(() => Buffer.from(sig, 'base64')).not.toThrow();
  });
});
