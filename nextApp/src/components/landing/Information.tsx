'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Title as TitleT } from '@/lib/cms';
import { Faq as FaqT } from '@/lib/cms';
import ContactForm from '@/components/forms/ContactForm';
import { fadeInLeft, fadeInScale, fadeInUp, revealParent, viewportOnce } from '@/lib/motion';

type InformationProps = {
    items: FaqT[];
    faqs: TitleT;
    form: TitleT;
};

const Information = ({ items, faqs, form }: InformationProps) => {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            variants={revealParent}
            viewport={viewportOnce}
            className="bg-white pt-10 pb-32 md:pt-16 md:pb-46"
        >
            <div className="container mx-auto grid grid-cols-1 px-4 lg:grid-cols-2 items-start lg:mt-12 lg:gap-28" id="faq">
                <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center md:justify-start md:items-start">
                    <motion.p custom={0} variants={fadeInUp} className="sectionSubtitle -mb-2 md:mb-2 md:text-start">
                        {faqs.details}
                    </motion.p>
                    <motion.h2 custom={1} variants={fadeInUp} className="sectionTitle text-center md:text-start">
                        {faqs.title}
                    </motion.h2>
                    <div className="w-full space-y-4 md:mt-4">
                        {items.map((faq, index) => {
                            const open = openIdx === index;
                            const id = `faq-${index}`;
                            return (
                                <motion.div
                                    key={faq.id ?? index}
                                    className="rounded-4xl bg-white px-6 py-2 shadow-[0_0_30px_2px_rgba(0,79,237,0.1)]"
                                    variants={fadeInScale}
                                    custom={index}
                                >
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between gap-2 text-left"
                                        onClick={() => setOpenIdx(open ? null : index)}
                                        onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && setOpenIdx(open ? null : index)}
                                        aria-expanded={open}
                                        aria-controls={`${id}-content`}
                                    >
                                        <p className="text-xs sm:text-sm font-bold md:text-lg">{faq.question}</p>

                                        <motion.span
                                            initial={false}
                                            animate={{ rotate: open ? 45 : 0 }}
                                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                                            className="gradientBlock inline-flex items-center justify-center text-white"
                                        >
                                            <Plus className="w-4 h-4 sm:h-5 sm:w-5" />
                                        </motion.span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {open && (
                                            <motion.div
                                                id={`${id}-content`}
                                                role="region"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.32, 0.08, 0.24, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <motion.div
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -4 }}
                                                    transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                                                    className="pt-2 pb-3 text-xs sm:text-sm text-[var(--color-gray)] md:text-base"
                                                >
                                                    {faq.answer}
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
                <motion.div
                    variants={fadeInLeft}
                    className="relative mx-auto lg:ml-auto mt-12 lg:mt-8 max-w-[540px]"
                >
                    <ContactForm form={form} />
                    <motion.span
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute -bottom-1 left-0 z-0 h-44 w-full rounded-4xl bg-[var(--blue-primary)]"
                    />
                    <motion.span
                        initial={{ opacity: 0, rotate: -12 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.7, ease: [0.32, 0.08, 0.24, 1], delay: 0.15 }}
                        id="contacts"
                        className="absolute -top-4 -right-4 md:-top-8 md:-right-8 z-0 hidden h-40 w-40 md:h-64 md:w-64 !rounded-4xl gradientBlock md:block"
                    />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Information;
