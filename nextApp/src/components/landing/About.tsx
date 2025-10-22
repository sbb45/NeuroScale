'use client'
import React, {useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Image from 'next/image'
import {About as AboutT} from '@/lib/cms';
import { Statistic as StatisticT } from '@/lib/cms';
import {Title as TitleT} from '@/lib/cms';
import { defaultTransition, fadeInScale, fadeInUp, revealParent, viewportOnce } from '@/lib/motion';
import { useIsMobile } from '@/lib/hooks/useIsMobile';

const mobileStatisticVariants: Variants = {
    hidden: { opacity: 0, y: 48, clipPath: 'inset(0% 0% 100% 0%)', scale: 0.96 },
    show: (custom: number = 0) => ({
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        transition: {
            ...defaultTransition,
            delay: custom * 0.12,
        },
    }),
};

const About = ({ abouts, statistics, title }: { abouts: AboutT[], statistics: StatisticT[], title: TitleT}) => {
    const [open, setOpen] = useState<number | null>(null);
    const isMobile = useIsMobile();

    return (
        <motion.section
            id="about"
            initial="hidden"
            whileInView="show"
            variants={revealParent}
            viewport={viewportOnce}
            className={"bg-white rounded-4xl relative z-12 -mt-10 rounded-b-none py-16 lg:rounded-[80px] lg:rounded-b-none lg:pt-26 lg:pb-26 lg:-mt-16"}
        >
            <div className={'container mx-auto flex flex-col justify-between items-center gap-6 mb-18 md:mb-32 md:flex-row md:gap-10'}>
                <motion.div
                    variants={fadeInUp}
                    className={'relative w-[80%] lg:w-[50%] max-w-[566px] aspect-square hidden md:block'}
                >
                    <Image
                        src={'/images/about.png'}
                        alt={'about'} fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                </motion.div>
                <motion.div variants={fadeInUp} className={'text-center md:text-start max-w-[860px]'}>
                    <motion.p custom={0} variants={fadeInUp} className={'sectionSubtitle'}>{title.details}</motion.p>
                    <motion.h2 custom={1} variants={fadeInUp} className={'sectionTitle'}>{title.title}</motion.h2>
                    <motion.h3 custom={2} variants={fadeInUp} className={'sectionDescription max-w-[600px] px-1 xs380:px-1.5 md:px-0'}>{title.description}</motion.h3>
                    <motion.div custom={3} variants={fadeInUp} className={'mt-6 space-y-3 text-start mx-5 md:mx-0 lg:space-y-4'}>
                        {abouts.map((item, i) => (
                            <div key={item.id ?? i}>
                                <button
                                    type="button"
                                    className="flex justify-start items-center gap-3 w-full text-left"
                                    onClick={() => setOpen(open === i ? null : i)}
                                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen(open === i ? null : i)}
                                    aria-expanded={open === i}
                                >
                                    <motion.div
                                        animate={{ rotate: open === i ? 90 : 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                    >
                                        <Image
                                            src="/icons/arrowCircle.svg"
                                            alt="arrow"
                                            width={32}
                                            height={32}
                                            className="max-w-6 xs380:max-w-7 sm:min-w-8"
                                        />
                                    </motion.div>
                                    <p className="font-bold text-sm/4 xs380:text-base/5 lg:text-xl/6">{item.title}</p>
                                </button>

                                <AnimatePresence initial={false}>
                                    {open === i && item.text && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                                            className="pl-11 pr-1"
                                        >
                                            <div className="pt-2 pb-3 text-xs sm:text-sm md:max-w-[80%] md:text-base text-[var(--color-gray)]">
                                                {item.text}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
            <div className={'mx-auto grid grid-cols-1 px-4 gap-4 md:grid-cols-3 md:gap-5 2xl:container'}>
                {statistics.map((item, i) => (
                    <motion.div
                        className={'flex justify-center flex-col relative items-center gap-1 overflow-hidden rounded-3xl bg-[image:var(--gradient-blue)] text-white px-6 py-10 sm:px-7.5 sm:py-8 sm:gap-3'}
                        key={i}
                        variants={isMobile ? mobileStatisticVariants : fadeInScale}
                        custom={i}
                        style={isMobile ? { willChange: 'transform, opacity, clip-path' } : undefined}
                    >
                        <h4 className={'text-center font-bold text-3xl sm:text-4xl  md:text-3xl lg:text-5xl'}>{item.title}</h4>
                        <p className={"text-center text-xs sm:text-left sm:text-sm lg:text-xl"}>{item.text}</p>
                        <Image
                            src={'/icons/neuroBlock.svg'}
                            alt={'neuro'} width={1200} height={1200}
                            className=" absolute -bottom-10 right-0 w-full"
                        />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default About;
