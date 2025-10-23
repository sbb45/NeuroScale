'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollTop = ({ threshold = 200 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let rafId = 0;
        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                setVisible(window.scrollY > threshold);
            });
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', onScroll);
        };
    }, [threshold]);

    const scrollToTop = useCallback(() => {
        if (typeof window === 'undefined') return;
        const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="scrolltop"
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Вернуться наверх"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="fixed z-50 bottom-4 right-4 md:bottom-6 md:right-6 rounded-full p-3 md:p-4 shadow-lg shadow-black/20 bg-white/90 dark:bg-neutral-900/90 backdrop-blur ring-1 ring-black/10 hover:ring-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 select-none"
                >
                    <ArrowUp className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                    <span className="sr-only">Наверх</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollTop;
