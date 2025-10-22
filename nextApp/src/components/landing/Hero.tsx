'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Title as TitleT } from '@/lib/cms';
import ContactModal from '@/components/landing/ContactModal';
import { fadeInRight, fadeInScale, fadeInUp, revealParent } from '@/lib/motion';

type HeroProps = {
    title: TitleT;
    form?: TitleT | null;
};

const Hero = ({ title, form }: HeroProps) => {
    const [open, setOpen] = useState(false);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const fallbackForm: TitleT = form ?? {
        id: 'fallback-form',
        name: 'form',
        title: 'Получите консультацию',
        description: 'Оставьте свои контакты — обсудим ваши задачи и подберём решение под ваш бизнес.',
        details: '',
        createdAt: new Date().toISOString(),
    };

    const primaryLabel = title.details?.trim() || 'Связаться с нами';

    return (
        <>
            <motion.section
                initial="hidden"
                animate="show"
                variants={revealParent}
                className="relative z-10 h-[110vh] xs380:h-screen md:h-[110vh] w-full overflow-hidden bg-[#010919] md:pb-[10vh] md:pt-[18vh] lg:pt-0"
            >
                <div className="flex h-full w-full flex-col mx-auto items-center justify-center lg:justify-between md:container lg:mx-auto lg:flex-row">
                    <motion.div variants={fadeInUp} className="z-10 max-w-[700px] space-y-3 md:space-y-6 text-left sm:text-center lg:text-left text-white">
                        <motion.h1 custom={0} variants={fadeInUp} className="text-2xl xs380:text-3xl px-4 sm:text-4xl md:px-0 font-bold lg:text-6xl">
                            {title.title}
                        </motion.h1>
                        {title.description ? (
                            <motion.p
                                custom={1}
                                variants={fadeInUp}
                                className="max-w-[540px] px-4 text-xs sm:mx-auto lg:mx-0 xs380:text-base sm:text-lg md:px-0 lg:text-2xl"
                            >
                                {title.description}
                            </motion.p>
                        ) : null}
                        <motion.div
                            variants={fadeInRight}
                            custom={1}
                            className="flex justify-center w-[90vw] min-[500px]:w-[70vw] sm:w-[50vw] mb-6 mx-auto items-center lg:hidden"
                        >
                            <Image
                                src="/images/norman_laptop.png"
                                alt="Норман и ноутбук"
                                width={800}
                                height={700}

                            />
                        </motion.div>
                        <motion.div
                            custom={2}
                            variants={fadeInUp}
                            className="mx-auto flex max-w-[460px] px-4 flex-col gap-3 md:px-0 lg:mx-0 lg:w-auto lg:flex-row"
                        >
                            <motion.button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="gradientBtn w-full py-3 font-bold text-sm xs380:text-lg lg:w-max lg:px-8 lg:py-3 lg:text-lg"
                                variants={fadeInScale}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                {isMobile ? 'Бесплатная консультация' :primaryLabel}
                            </motion.button>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        variants={fadeInRight}
                        custom={1}
                        className="mx-auto hidden h-auto w-full max-w-[420px] translate-x-12 lg:absolute lg:right-0 lg:top-1/2 lg:w-[60%] lg:block lg:max-w-none lg:-translate-y-1/2"
                    >
                        <Image
                            src="/images/norman_laptop.png"
                            alt="Норман и ноутбук"
                            width={1200}
                            height={800}

                        />
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: isMobile ? -100 : 300 }}
                    animate={{ opacity: 0.2, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-20 left-0 md:left-10 md:-top-50 lg:top-40 lg:-left-110 lg:rotate-90"
                >
                        <Image
                            src="/icons/neuro.svg"
                            alt="Нейроны"
                            width={800}
                            height={900}
                        />
                </motion.div>
            </motion.section>
            <ContactModal open={open} onClose={() => setOpen(false)} form={fallbackForm} />
        </>
    );
};

export default Hero;
