'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Title as TitleT } from '@/lib/cms';
import ContactModal from '@/components/landing/ContactModal';

type HeroProps = {
    title: TitleT;
    form?: TitleT | null;
};

const Hero = ({ title, form }: HeroProps) => {
    const [open, setOpen] = useState(false);
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
            <section className="relative z-10 h-[110vh] w-full overflow-hidden bg-[#010919] pb-[10vh] pt-[18vh] md:pt-0">
                <div className="flex h-full w-full flex-col items-center justify-between md:container md:mx-auto md:flex-row">
                    <div className="z-10 space-y-6 text-center text-white md:text-start">
                        <h1 className="max-w-[700px] text-4xl font-bold md:text-6xl">{title.title}</h1>
                        {title.description ? (
                            <p className="max-w-[520px] px-3 text-lg md:px-0 md:text-2xl">{title.description}</p>
                        ) : null}
                        <div className="mx-auto flex w-[90%] max-w-[460px] flex-col gap-3 md:mx-0 md:w-auto md:flex-row">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="gradientBtn w-full py-3 text-base font-bold md:w-max md:px-8 md:py-3 md:text-lg"
                            >
                                {primaryLabel}
                            </button>
                        </div>
                    </div>
                    <Image
                        src="/images/norman_laptop.png"
                        alt="Норман и ноутбук"
                        width={1200}
                        height={800}
                        className="mx-auto h-auto w-full max-w-[420px] md:absolute md:right-0 md:top-1/2 md:w-[63%] md:max-w-none md:-translate-y-1/2"
                    />
                </div>
                <Image
                    src="/icons/neuro.svg"
                    alt="Нейроны"
                    width={800}
                    height={900}
                    className="absolute top-40 -left-110 hidden rotate-90 opacity-20 md:block"
                />
            </section>
            <ContactModal open={open} onClose={() => setOpen(false)} form={fallbackForm} />
        </>
    );
};

export default Hero;
