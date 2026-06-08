'use client';

import { useEffect } from 'react';

export default function FlowbiteInit() {
  useEffect(() => {
    // Flowbite の初期化
    if (typeof window !== 'undefined' && (window as any).initFlowbite) {
      (window as any).initFlowbite();
    }
  }, []);

  return null;
}
