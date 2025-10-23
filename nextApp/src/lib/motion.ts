import type { Transition, Variants } from 'framer-motion';

export const defaultTransition: Transition = {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1],
};

export const slowTransition: Transition = {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
};

export const revealParent: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: (custom: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            ...defaultTransition,
            delay: custom * 0.1,
        },
    }),
};

export const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    show: (custom: number = 0) => ({
        opacity: 1,
        scale: 1,
        transition: {
            ...defaultTransition,
            delay: custom * 0.12,
        },
    }),
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    show: (custom: number = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            ...slowTransition,
            delay: custom * 0.15,
        },
    }),
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    show: (custom: number = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            ...slowTransition,
            delay: custom * 0.15,
        },
    }),
};

export const viewportOnce = (() => {
    if (typeof window === 'undefined') {
        return { once: true, amount: 0.2 };
    }

    const isMobile = window.innerWidth < 768;
    return { once: true, amount: isMobile ? 0.1 : 0.2 };
})();
