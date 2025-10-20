import React from 'react';
import { Case as CaseT } from '@/lib/cms';
import { Title as TitleT } from '@/lib/cms';

const Cases = ({ items, title }: { items: CaseT[]; title: TitleT }) => {
    return (
        <section id="projects" className="bg-white relative z-12 rounded-4xl rounded-b-none -mt-10 lg:-mt-16 lg:lg:rounded-[80px] lg:rounded-b-none">
            <div className="container mx-auto px-4 py-18 md:px-0">
                <h2 className="sectionTitle text-center">{title.title}</h2>
                <div className="grid grid-cols-1 gap-4 mt-4 md:gap-7 md:grid-cols-2">
                    {items.map((caseBlock) => {
                        const hasDetails = Boolean(caseBlock.solution || caseBlock.effect);
                        return (
                            <div
                                key={caseBlock.id ?? `${caseBlock.title}-${caseBlock.direction}`}
                                tabIndex={0}
                                className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-4xl bg-[url(/backgrounds/cases-1.svg)] bg-cover bg-center px-4 py-6 text-white outline-none transition-transform duration-300 md:h-[420px] md:px-8 md:py-8 focus-visible:-translate-y-1 md:focus-visible:-translate-y-2"
                            >
                                <span className="pointer-events-none absolute inset-0 bg-black/25 transition-colors duration-500 md:bg-black/0 md:group-hover:bg-black/55 md:group-focus-visible:bg-black/55" />
                                <div className="relative z-10 flex h-full flex-col">
                                    <div className="flex h-full flex-col justify-between gap-3 transition-all duration-500 md:group-hover:opacity-0 md:group-hover:-translate-y-4 md:group-focus-visible:opacity-0 md:group-focus-visible:-translate-y-4">
                                        <span className="inline-flex w-max items-center rounded-xl bg-[#3372F1] px-3 py-1 text-xs font-semibold uppercase tracking-wide md:text-sm">
                                            {caseBlock.direction}
                                        </span>
                                        <div className="mt-auto flex flex-col gap-3 md:gap-4">
                                            <h3 className="text-xl font-bold md:text-3xl">{caseBlock.title}</h3>
                                            <p className="text-xs text-white/80 md:text-base">{caseBlock.text}</p>
                                        </div>
                                    </div>
                                    {hasDetails ? (
                                        <>
                                            <div className="mt-6 flex flex-col gap-3 text-sm md:hidden md:text-base">
                                                {caseBlock.solution && (
                                                    <div className="rounded-2xl bg-black/35 px-4 py-3">
                                                        <span className="block text-xs uppercase tracking-wide text-white/70">Решение</span>
                                                        <p className="mt-1 text-sm">{caseBlock.solution}</p>
                                                    </div>
                                                )}
                                                {caseBlock.effect && (
                                                    <div className="rounded-2xl bg-black/35 px-4 py-3">
                                                        <span className="block text-xs uppercase tracking-wide text-white/70">Эффект</span>
                                                        <p className="mt-1 text-sm">{caseBlock.effect}</p>
                                                    </div>
                                                )}
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Cases;
