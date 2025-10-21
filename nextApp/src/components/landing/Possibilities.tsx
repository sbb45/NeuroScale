'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {Possibilitie as PossibilitieT} from '@/lib/cms';
import {Title as TitleT} from '@/lib/cms';
import { X } from 'lucide-react';
import { fadeInScale, fadeInUp, revealParent, viewportOnce } from '@/lib/motion';

const imgs = [
    'possibilities-3.svg',
    'possibilities-1.svg',
    'possibilities-2.svg',
    'possibilities-5.svg',
    'possibilities-4.svg',
    'possibilities-6.svg',
];

export default function Possibilities({items, title}: {items: PossibilitieT[], title: TitleT}) {
    const [open, setOpen] = useState<number | null>(null);
    const merged = items.map((item, index) => ({
        ...item,
        img: imgs[index],
    }));;

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
            <motion.section
                id="possibilities"
                initial="hidden"
                whileInView="show"
                variants={revealParent}
                viewport={viewportOnce}
                className="bg-[#EAFCFE] py-14 rounded-4xl rounded-t-none lg:rounded-[80px] lg:rounded-t-none md:py-20 relative z-12"
            >
                <div className="container mx-auto text-center">
                    <motion.p custom={0} variants={fadeInUp} className="sectionSubtitle">
                        {title.details}
                    </motion.p>
                    <motion.h2 custom={1} variants={fadeInUp} className="sectionTitle mx-4 max-w-[900px] md:mx-auto">
                        {title.title}
                    </motion.h2>

                    <div className="grid grid-cols-1 gap-4 px-4 mt-10 md:grid-cols-2 max-w-[1100px] mx-auto">
                        {merged.map((p, i) => (
                            <motion.div
                                key={i}
                                className="bg-white rounded-[32px] p-6 flex items-start gap-3 relative z-10"
                                variants={fadeInScale}
                                custom={i}
                            >
                                <div className="bg-[#EAFCFE] w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shrink-0">
                                    <Image src={`/icons/${p.img}`} alt="possibilitie icon" width={78} height={78} className="pointer-events-none w-10 h-10 sm:w-14 sm:h-14" />
                                </div>

                                <div className="flex-1 text-start">
                                    <h3 className="text-md sm:text-xl/6 font-bold">{p.title}</h3>
                                    <p className="mt-1 mb-2 sm:mt-2 sm:mb-3 text-xs sm:text-sm/3 leading-7 text-[var(--color-gray)] lg:mr-3" style={{ lineHeight: 1.4 }}>
                                        {p.text}
                                    </p>
                                    <button
                                        type="button"
                                        className="text-xs sm:text-sm text-[var(--blue-primary)] font-semibold cursor-pointer"
                                        onClick={() => setOpen(i)}
                                    >
                                        Подробнее
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <Image
                    src="/icons/brain-bg.png"
                    alt="brain-bg"
                    width={433}
                    height={971}
                    className="absolute top-1/2 -translate-y-1/2 left-0 z-0 lg:h-[80%] w-auto pointer-events-none"
                />
            </motion.section>

            <AnimatePresence>
                {open !== null && (
                    <>
                        <motion.button
                            aria-label="Закрыть"
                            className="fixed inset-0 bg-black/50 z-40 cursor-pointer"
                            onClick={() => setOpen(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

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
                                const current = open !== null ? merged[open] : null;
                                const lines = (current?.points ?? []).map(x => x.name).filter(Boolean);

                                return (
                                    <div className="relative bg-white rounded-[28px] w-full max-w-[720px] p-6 md:p-8 shadow-[0_24px_60px_rgba(7,24,79,0.35)]">
                                        <button
                                            type="button"
                                            onClick={() => setOpen(null)}
                                            className="absolute top-3 right-4 text-[var(--blue-primary)] font-semibold cursor-pointer"
                                            aria-label="Закрыть модалку"
                                        >
                                            <X size={32} />
                                        </button>

                                        <div className="flex items-center gap-3 pr-6">
                                            <div className="bg-[#EAFCFE] w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center">
                                                <Image
                                                    src={current ? `/icons/${current.img}` : '/icons/placeholder.svg'}
                                                    alt=""
                                                    width={78}
                                                    height={78}
                                                    className="pointer-events-none w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                                                />
                                            </div>
                                            <div className="flex-1 text-start">
                                                <h3 className="text-md sm:text-xl/6 font-bold md:text-2xl">{current?.title}</h3>
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-2 sm:space-y-3">
                                            {lines.length > 0 ? (
                                                lines.map((line, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <Image src="/icons/arrowCircle.svg" alt="" width={24} height={24} className="w-6 h-6 mt-0.5" />
                                                        <p className="text-xs sm:text-sm md:text-base text-[var(--color-gray)]">{line}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                current?.text && (
                                                    <p className="text-xs sm:text-sm md:text-base text-[var(--color-gray)]">{current.text}</p>
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
