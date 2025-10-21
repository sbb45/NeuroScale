'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Case as CaseT } from '@/lib/cms';
import { Title as TitleT } from '@/lib/cms';
import { fadeInScale, fadeInUp, revealParent, viewportOnce } from '@/lib/motion';

const Cases = ({ items, title }: { items: CaseT[]; title: TitleT }) => {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <motion.section
            id="projects"
            initial="hidden"
            whileInView="show"
            variants={revealParent}
            viewport={viewportOnce}
            className="bg-white relative z-12 rounded-4xl rounded-b-none -mt-10 lg:-mt-16 lg:lg:rounded-[80px] lg:rounded-b-none"
        >
            <div className="container mx-auto px-4 py-18 md:px-0">
                <motion.h2 variants={fadeInUp} className="sectionTitle text-center">
                    {title.title}
                </motion.h2>
                <div className="grid grid-cols-1 gap-5 mt-6 sm:mt-10 md:gap-7 md:grid-cols-2">
                    {items.map((caseBlock) => {
                        const hasDetails = Boolean(caseBlock.solution || caseBlock.effect);
                        const id = String(caseBlock.id ?? `${caseBlock.title}-${caseBlock.direction}`);

                        return (
                            <motion.article
                                key={id}
                                tabIndex={0}
                                className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-4xl bg-[url(/backgrounds/cases-1.svg)] bg-cover bg-center px-5 py-7 text-white outline-none transition-transform duration-300 md:h>[420px] md:px-8 md:py-8 focus-visible:-translate-y-1 md:focus-visible:-translate-y-2"
                                variants={fadeInScale}
                                whileHover={{ scale: 1.01 }}
                                whileFocus={{ scale: 1.01 }}
                            >
                                <span className="pointer-events-none absolute inset-0 bg-black/45 transition-colors duration-500 md:bg-black/0 md:group-hover:bg-black/55 md:group-focus-visible:bg-black/55" />
                                <div className="relative z-10 flex h-full flex-col">
                                    <div className="flex h-full flex-col justify-between gap-3 transition-all duration-500 md:group-hover:opacity-0 md:group-hover:-translate-y-4 md:group-focus-visible:opacity-0 md:group-focus-visible:-translate-y-4">
                                        <span className="inline-flex w-max items-center rounded-xl bg-[#3372F1] px-3 py-1 text-[.6rem] sm:text-xs font-semibold uppercase tracking-wide md:text-sm">
                                            {caseBlock.direction}
                                        </span>
                                        <div className="mt-auto flex flex-col gap-3 md:gap-4">
                                            <h3 className="text-xl font-bold line-clamp-2 md:text-3xl">{caseBlock.title}</h3>
                                            <p className="text-sm leading-5 text-white/85 line-clamp-3 md:text-base md:leading-6">{caseBlock.text}</p>
                                        </div>
                                    </div>

                                    {hasDetails ? (
                                        <>
                                            <div className="mt-6 md:hidden">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenId(openId === id ? null : id)}
                                                    aria-expanded={openId === id}
                                                    className="w-full cursor-pointer select-none rounded-2xl bg-black/40 px-4 py-3 text-left text-sm font-medium"
                                                >
                                                    Подробнее
                                                </button>
                                                <motion.div
                                                    initial={false}
                                                    animate={
                                                        openId === id
                                                            ? { height: 'auto', opacity: 1 }
                                                            : { height: 0, opacity: 0 }
                                                    }
                                                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-3 space-y-3 rounded-2xl bg-black/35 px-4 py-3">
                                                        {caseBlock.solution && (
                                                            <div>
                                                                <span className="block text-xs uppercase tracking-wide text-white/70">Решение</span>
                                                                <p className="mt-1 text-sm">{caseBlock.solution}</p>
                                                            </div>
                                                        )}
                                                        {caseBlock.effect && (
                                                            <div>
                                                                <span className="block text-xs uppercase tracking-wide text-white/70">Эффект</span>
                                                                <p className="mt-1 text-sm">{caseBlock.effect}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            </div>

                                            <div className="pointer-events-none absolute inset-0 hidden flex-col gap-6 p-0 opacity-0 transition-all duration-500 md:flex md:translate-y-6 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                                                <h3 className="text-2xl font-bold md:text-3xl">{caseBlock.title}</h3>
                                                <div className="space-y-3 rounded-2xl bg-white/12 px-4 py-4 shadow-[0_18px_48px_rgba(12,24,64,0.35)] backdrop-blur">
                                                    {caseBlock.solution && (
                                                        <div>
                                                            <span className="block text-xs uppercase tracking-wide text-white/80">Решение</span>
                                                            <p className="mt-1 text-sm md:text-base text-white/95">{caseBlock.solution}</p>
                                                        </div>
                                                    )}
                                                    {caseBlock.effect && (
                                                        <div>
                                                            <span className="block text-xs uppercase tracking-wide text-white/80">Эффект</span>
                                                            <p className="mt-1 text-sm md:text-base text-white/95">{caseBlock.effect}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
            <motion.span
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 0.08, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute -left-32 bottom-10 hidden h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(51,114,241,0.45),rgba(51,114,241,0))] blur-3xl md:block"
            />
        </motion.section>
    );
};

export default Cases;
