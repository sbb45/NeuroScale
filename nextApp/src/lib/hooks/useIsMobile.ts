'use client';

import { useEffect, useState } from 'react';

const DEFAULT_BREAKPOINT = 768;

/**
 * Tracks whether the viewport width is currently below the given breakpoint.
 */
export function useIsMobile(breakpoint: number = DEFAULT_BREAKPOINT) {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        return window.innerWidth < breakpoint;
    });

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(event.matches);
        };

        handleChange(mediaQuery);

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleChange);

            return () => {
                mediaQuery.removeEventListener('change', handleChange);
            };
        }

        // Safari < 14 fallback.
        const legacyHandler = (event: MediaQueryListEvent) => handleChange(event);
        mediaQuery.addListener(legacyHandler);
        return () => {
            mediaQuery.removeListener(legacyHandler);
        };
    }, [breakpoint]);

    return isMobile;
}

