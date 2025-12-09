import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiServer } from '@/lib/api/server';

const BASE_URL = 'http://localhost:57031';

beforeEach(() => {
  vi.stubEnv('BASE_URL', BASE_URL);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('apiServer wrappers', () => {
  it('calls findDuplicates and returns json', async () => {
    const mock = vi.spyOn(global, 'fetch' as any).mockResolvedValue({
      ok: true,
      json: async () => ({ records: [{ srNo: 1, firstName: 'X', lastName: 'Y' }] }),
      text: async () => '',
    } as any);
    const res = await apiServer.findDuplicates({ firstName: 'X', lastName: 'Y' });
    expect(res.records[0].srNo).toBe(1);
    mock.mockRestore();
  });

  it('throws on non-ok response', async () => {
    const mock = vi.spyOn(global, 'fetch' as any).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
      text: async () => 'err',
    } as any);
    await expect(apiServer.unverifiedCount()).rejects.toThrow();
    mock.mockRestore();
  });
});
