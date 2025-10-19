'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const possibilities = [
    { img: 'possibilities-3.svg', title: 'Клиентский сервис', text: 'Автоматизация общения…', points: [{ text: 'ggreeg' }, { text: 'gerger' }] },
    { img: 'possibilities-1.svg', title: 'Маркетинг и продажи', text: 'Оптимизация анализа…', points: [{ text: 'ggreeg' }, { text: 'gerger' }] },
    { img: 'possibilities-2.svg', title: 'Внутренние процессы', text: 'Оптимизация процессов…', points: [{ text: 'ggreeg' }, { text: 'gerger' }] },
    { img: 'possibilities-5.svg', title: 'Обучение и аттестация', text: 'Автоматизация обучения…', points: [{ text: 'ggreeg' }, { text: 'gerger' }] },
    { img: 'possibilities-4.svg', title: 'HR и рекрутинг', text: 'Повышение скорости…', points: [{ text: 'ggreeg' }, { text: 'gerger' }] },
    { img: 'possibilities-6.svg', title: 'Отраслевая кастомизация', text: 'Адаптация ИИ…', points: [{ text: 'ggreeg' }, { text: 'gerger' }] },
];

export default function Possibilities() {
    const [open, setOpen] = useState<number | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = open !== null ? 'hidden' : '';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            <section className="bg-[#EAFCFE] py-14 rounded-4x rounded-t-none lg:rounded-[80px] lg:rounded-t-none md:py-20 relative">
                <div className="container mx-auto text-center">
                    <p className="sectionSubtitle">Возможности</p>
                    <h2 className="sectionTitle mx-4 max-w-[900px] md:mx-auto">Какие бизнес-процессы можно автоматизировать на базе ИИ?</h2>

                    <div className="grid grid-cols-1 gap-4 px-4 mt-10 md:grid-cols-2 max-w-[1100px] mx-auto">
                        {possibilities.map((p, i) => (
                            <div key={i} className="bg-white rounded-[32px] p-6 flex items-start gap-3 relative z-10">
                                <div className="bg-[#EAFCFE] w-20 h-20 rounded-full flex items-center justify-center shrink-0">
                                    <Image src={`/icons/${p.img}`} alt="possibilitie icon" width={78} height={78} className="pointer-events-none w-14 h-14" />
                                </div>

                                <div className="flex-1 text-start">
                                    <h3 className="text-xl/6 font-bold">{p.title}</h3>
                                    <p className="mt-2 mb-3 text-sm/3 leading-7 text-[var(--color-gray)] lg:mr-3" style={{ lineHeight: 1.4 }}>
                                        {p.text}
                                    </p>
                                    <button
                                        type="button"
                                        className="text-sm text-[var(--blue-primary)] font-semibold cursor-pointer"
                                        onClick={() => setOpen(i)}
                                    >
                                        Подробнее
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Image
                    src="/icons/brain-bg.png"
                    alt="brain-bg"
                    width={433}
                    height={971}
                    className="hidden absolute top-1/2 -translate-y-1/2 left-0 lg:block z-0 h-[80%] w-auto pointer-events-none"
                />
            </section>

            <AnimatePresence>
                {open !== null && (
                    <>
                        {/* Оверлей */}
                        <motion.button
                            aria-label="Закрыть"
                            className="fixed inset-0 bg-black/50 z-40 cursor-pointer"
                            onClick={() => setOpen(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Центрированная модалка */}
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            role="dialog"
                            aria-modal="true"
                        >
                            {(() => {
                                const current = open !== null ? possibilities[open] : null;
                                const lines = (current?.points ?? []).map(x => x.text).filter(Boolean);

                                return (
                                    <div className="relative bg-white rounded-[28px] w-full max-w-[720px] p-6 md:p-8 shadow-[0_24px_60px_rgba(7,24,79,0.35)]">
                                        {/* Кнопка закрытия */}
                                        <button
                                            type="button"
                                            onClick={() => setOpen(null)}
                                            className="absolute top-3 right-3 text-[var(--blue-primary)] font-semibold cursor-pointer"
                                            aria-label="Закрыть модалку"
                                        >
                                            ✕
                                        </button>

                                        {/* Шапка */}
                                        <div className="flex items-start gap-3 pr-6">
                                            <div className="bg-[#EAFCFE] w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center">
                                                <Image
                                                    src={current ? `/icons/${current.img}` : '/icons/placeholder.svg'}
                                                    alt=""
                                                    width={78}
                                                    height={78}
                                                    className="pointer-events-none w-12 h-12 md:w-14 md:h-14"
                                                />
                                            </div>
                                            <div className="flex-1 text-start">
                                                <h3 className="text-xl/6 font-bold md:text-2xl">{current?.title}</h3>
                                            </div>
                                        </div>

                                        {/* Контент: список points или мягкий фоллбек */}
                                        <div className="mt-4 space-y-2 sm:space-y-3">
                                            {lines.length > 0 ? (
                                                lines.map((line, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <Image src="/icons/arrowCircle.svg" alt="" width={24} height={24} className="w-6 h-6 mt-0.5" />
                                                        <p className="text-sm md:text-base text-[var(--color-gray)]">{line}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                current?.text && (
                                                    <p className="text-sm md:text-base text-[var(--color-gray)]">{current.text}</p>
                                                )
                                            )}
                                        </div>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
