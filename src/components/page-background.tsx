// components/page-background.tsx
'use client';

import { usePathname } from 'next/navigation';
import { MeteorsBackground } from './meteors-background';
import GridPattern from './ui/grid-pattern';

export function PageBackground() {
  const pathname = usePathname();
  const isBlogPage = pathname?.includes('/blog');
  const isGadgetsPage = pathname?.includes('/gadgets');

  if (isBlogPage) {
    return <GridPattern className="w-full h-full" />;
  }
  // Show meteors on all other pages
  return <MeteorsBackground />;
}