'use client'
import React, {useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image'
import {About as AboutT} from '@/lib/cms';
import { Statistic as StatisticT } from '@/lib/cms';
import {Title as TitleT} from '@/lib/cms';

const About = ({ abouts, statistics, title }: { abouts: AboutT[], statistics: StatisticT[], title: TitleT}) => {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="about" className={"bg-white rounded-4xl relative z-12 -mt-10 rounded-b-none py-16 lg:rounded-[80px] lg:rounded-b-none lg:pt-26 lg:pb-26 lg:-mt-16"}>
            <div className={'container mx-auto flex flex-col justify-between items-center gap-6 mb-18 md:mb-32 md:flex-row md:gap-10'}>
                <div className={'relative w-[80%] lg:w-[50%] max-w-[566px] aspect-square'}>
                    <Image
                        src={'/images/about.png'}
                        alt={'about'} fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                </div>
                <div className={'text-center md:text-start max-w-[860px]'}>
                    <p className={'sectionSubtitle'}>{title.details}</p>
                    <h2 className={'sectionTitle'}>{title.title}</h2>
                    <h3 className={'sectionDescription max-w-[600px]'}>{title.description}</h3>
                    <div className={'mt-6 space-y-2 text-start mx-5 md:mx-0 lg:space-y-4'}>
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
                                            className="min-w-8"
                                        />
                                    </motion.div>
                                    <p className="font-bold text-base/5 md:text-base lg:text-xl/6">{item.title}</p>
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
                                            <div className="pt-2 pb-3 text-sm md:max-w-[80%] md:text-base text-[var(--color-gray)]">
                                                {item.text}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={'mx-auto grid grid-cols-1 px-4 gap-4 md:grid-cols-3 md:gap-5 2xl:container'}>
                {statistics.map((item, i) => (
                    <div className={'flex justify-center flex-col relative items-center gap-3 overflow-hidden rounded-3xl bg-[image:var(--gradient-blue)] text-white px-7.5 py-8'} key={i}>
                        <h4 className={'text-center font-bold text-4xl  md:text-3xl lg:text-5xl'}>{item.title}</h4>
                        <p className={"text-sm lg:text-xl"}>{item.text}</p>
                        <Image
                            src={'/icons/neuroBlock.svg'}
                            alt={'neuro'} width={1200} height={1200}
                            className=" absolute -bottom-10 right-0 w-full"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default About;
