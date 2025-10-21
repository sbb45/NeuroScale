'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'ns-cookie-consent';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const savePreference = (value: string) => {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
        // ignore write errors (private mode, etc.)
    }

    try {
        document.cookie = `cookie-consent=${value}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
    } catch {
        // ignore cookie write issues
    }
};

const CookieNotice = () => {
    const [shouldRender, setShouldRender] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let timer: number | null = null;
        const hasConsent = (() => {
            try {
                return Boolean(window.localStorage.getItem(STORAGE_KEY));
            } catch {
                return false;
            }
        })();

        if (!hasConsent) {
            setShouldRender(true);
            timer = window.setTimeout(() => setVisible(true), 450);
        }

        return () => {
            if (timer) window.clearTimeout(timer);
        };
    }, []);

    const handleChoice = (value: 'accepted' | 'necessary') => {
        savePreference(value);
        setVisible(false);
    };

    const handleDismiss = () => handleChoice('necessary');

    if (!shouldRender && !visible) return null;

    return (
        <AnimatePresence>
            {visible ? (
                <motion.aside
                    key="cookie-notice"
                    initial={{ opacity: 0, y: 60, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-x-4 bottom-6 z-[999] md:left-auto md:right-6 md:w-full md:max-w-sm"
                    role="dialog"
                    aria-live="polite"
                    aria-label="Уведомление об использовании файлов cookie"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                        className="relative overflow-hidden rounded-3xl bg-white/95 px-5 pb-5 pt-6 shadow-[0_32px_80px_rgba(8,22,63,0.28)] backdrop-blur"
                    >
                        <span className="pointer-events-none absolute -right-24 -top-24 h-44 w-44 rounded-full bg-[var(--blue-primary)]/15 blur-3xl" />
                        <div className="relative z-10 space-y-3 text-[var(--blue-dark)]">
                            <h2 className="text-base font-semibold text-[var(--blue-primary)]">Мы заботимся о приватности</h2>
                            <p className="text-sm leading-5 text-[var(--color-gray)]">
                                Используем файлы cookie, чтобы сайт работал стабильно и помогал нам анализировать трафик.
                                Подробности в{' '}
                                <Link href="/privacy" className="font-semibold text-[var(--blue-primary)] underline underline-offset-2">
                                    политике конфиденциальности
                                </Link>
                                .
                            </p>
                            <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                                <motion.button
                                    type="button"
                                    onClick={() => handleChoice('accepted')}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="gradientBtn inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_48px_rgba(9,32,96,0.38)]"
                                >
                                    Принять все
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={handleDismiss}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center justify-center rounded-2xl border border-[var(--blue-primary)]/30 px-5 py-3 text-sm font-semibold text-[var(--blue-primary)] transition-colors hover:border-[var(--blue-primary)] hover:bg-[var(--blue-primary)]/5"
                                >
                                    Только необходимые
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.aside>
            ) : null}
        </AnimatePresence>
    );
};

export default CookieNotice;
