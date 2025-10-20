'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToHash() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (pathname !== '/') return;

        const hash = window.location.hash.replace('#', '');
        if (!hash) return;

        const element = document.getElementById(hash);
        if (!element) return;

        const timeout = window.setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);

        return () => window.clearTimeout(timeout);
    }, [pathname]);

    return null;
}
