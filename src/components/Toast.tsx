'use client';
import { useEffect, useState } from 'react';

export function Toast({ message, type = 'info' }: { message: string; type?: 'info' | 'success' | 'error' }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  const color = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-zinc-800';
  return (
    <div className={`fixed bottom-4 right-4 text-white px-3 py-2 rounded ${color} shadow`}>{message}</div>
  );
}
