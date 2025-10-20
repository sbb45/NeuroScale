'use client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Stage as StageT } from '@/lib/cms';
import { Title as TitleT } from '@/lib/cms';

const imgs = [
    'stages-2.svg',
    'possibilities-6.svg',
    'stages-4.svg',
    'stages-1.svg',
    'stages-3.svg',
];

type StagesProps = {
    items: StageT[];
    title: TitleT;
};

const Stages = ({ items, title }: StagesProps) => {
    const [open, setOpen] = useState<number | null>(null);
    const merged = useMemo(
        () =>
            items.map((item, index) => ({
                ...item,
                img: imgs[index % imgs.length],
            })),
        [items],
    );

    const toggleStage = (index: number) => setOpen((prev) => (prev === index ? null : index));

    return (
        <section id="stages" className="bg-[linear-gradient(-12deg,#000000_3%,#002877_48%,#000000_100%)] relative z-10 -mt-10 overflow-hidden lg:-mt-16">
            <div className="container relative z-10 mx-auto px-4 py-24 md:py-40">
                <h2 className="sectionTitle text-center !text-white">{title.title}</h2>

                <div className="relative mt-8 md:mt-16 lg:mt-20">
                    <span className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[4px] -translate-x-1/2 rounded-full bg-white/25 lg:block" />

                    <div className="flex flex-col gap-16 py-14 md:gap-12 lg:gap-16">
                        {merged.map((stage, index) => {
                            const isLeft = index % 2 === 0;
                            const isOpen = open === index;
                            const points =
                                (stage.happening && stage.happening.length
                                    ? stage.happening
                                    : [{ id: 'fallback', name: stage.text }]) ?? [];

                            return (
                                <motion.div
                                    key={stage.id ?? stage.title}
                                    layout
                                    transition={{ layout: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } }}
                                    className="relative lg:grid lg:grid-cols-2 lg:items-center"
                                >
                                    <div
                                        className={`relative ${
                                            isLeft
                                                ? 'lg:col-start-1 lg:justify-self-end lg:pr-14'
                                                : 'lg:col-start-2 lg:justify-self-start lg:pl-14'
                                        }`}
                                    >
                                        <motion.article
                                            role="button"
                                            tabIndex={0}
                                            aria-expanded={isOpen}
                                            onClick={() => toggleStage(index)}
                                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleStage(index)}
                                            layout
                                            transition={{ layout: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } }}
                                            className="relative flex max-w-[600px] cursor-pointer items-start gap-3 rounded-[28px] bg-white/95 px-4 py-7 text-left shadow-[0_24px_60px_rgba(7,24,79,0.28)] backdrop-blur-sm transition-[box-shadow,transform] duration-300 hover:shadow-[0_30px_70px_rgba(10,46,111,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:gap-3 md:px-8 md:py-9 lg:items-center"
                                        >
                                            <span className="lg:hidden absolute -top-6 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-bold text-[var(--blue-primary)] shadow-[0_12px_30px_rgba(10,46,111,0.35)]">
                                                {index + 1}
                                            </span>
                                            <Image
                                                src={`/icons/${stage.img}`}
                                                alt=""
                                                width={133}
                                                height={133}
                                                className="h-20 w-20 p-3 md:h-24 md:w-24"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-xl/5 font-bold md:text-2xl">{stage.title}</h3>
                                                <p className="mt-3 text-sm leading-5 text-[var(--color-gray)] md:text-base md:leading-6">
                                                    {stage.text}
                                                </p>
                                            </div>
                                        </motion.article>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0, y: -8 }}
                                                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                                                    exit={{ height: 0, opacity: 0, y: -8 }}
                                                    transition={{ duration: 0.36, ease: [0.32, 0.08, 0.24, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -6 }}
                                                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                                                        className="mt-2 max-w-[600px] space-y-1 rounded-[28px] bg-[image:var(--gradient-blue)]/95 px-6 py-6 text-white shadow-[0_24px_60px_rgba(7,24,79,0.35)] bg-[var(--blue-primary)]"
                                                    >
                                                        {points.map((point) => (
                                                            <div key={point.id ?? point.name} className="flex items-start gap-3 text-sm md:text-base">
                                                                <Image
                                                                    src="/icons/check.svg"
                                                                    alt=""
                                                                    width={16}
                                                                    height={16}
                                                                    className="mt-1 h-4 w-4 shrink-0"
                                                                />
                                                                <p className="leading-6 md:leading-7">{point.name}</p>
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <motion.span
                                        layout
                                        transition={{ duration: 0.32, ease: [0.32, 0.08, 0.24, 1] }}
                                        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl font-bold text-[var(--blue-primary)] shadow-[0_18px_40px_rgba(10,46,111,0.35)] lg:flex lg:z-10"
                                    >
                                        {index + 1}
                                    </motion.span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Image
                src="/icons/neuro.svg"
                alt="neuro"
                width={1400}
                height={1400}
                className="absolute top-0 left-0 hidden h-full w-full rotate-90 opacity-5 md:block"
            />
        </section>
    );
};

export default Stages;
