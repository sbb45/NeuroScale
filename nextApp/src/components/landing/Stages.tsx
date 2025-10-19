'use client'
import React, { useState }from "react";
import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';

const stages = [
  {
    img: "stages-2.svg",
    title: "Диагностика и выявление потребностей",
    text: "Задача: понять специфику бизнеса клиента, определить, где ИИ может принести наибольшую пользу",
      more: 'fee',
  },
  {
    img: "possibilities-6.svg",
    title: "AI-аудит и проектирование решений",
    text: "Задача: сформировать требования и аргументировать целесообразность внедрения ИИ-решений",
      more: 'fee',
  },
  {
    img: "stages-4.svg",
    title: "Разработка и внедрение ИИ-системы",
    text: "Задача: реализовать индивидуальные решения под цели клиента и встроить их в бизнес-процессы",
      more: 'fee',
  },
  {
    img: "stages-1.svg",
    title: "Тестирование и адаптация",
    text: "Задача: убедиться, что система работает корректно и приносит пользу",
      more: 'fee',
  },
  {
    img: "stages-3.svg",
    title: "Обучение и сопровождение",
    text: "Задача: обеспечить самостоятельную работу с системой и стабильную техническую поддержку",
      more: 'fee',
  },
];

const Stages = () => {
    const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[linear-gradient(-12deg,#000000_3%,#002877_48%,#000000_100%)] relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24 z-10 relative">
        <h2 className="sectionTitle !text-white text-center">
          Основные этапы работы
        </h2>

        <div className="relative mt-14 md:mt-16 lg:mt-20">
          <span className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 bg-white w-[4px] rounded-full" />

            <div className="flex flex-col gap-16 md:gap-12 lg:gap-16 py-14">
                {stages.map((stage, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                        <div key={stage.id ?? stage.title} className="relative lg:grid lg:grid-cols-2 lg:items-center">
                            <div
                                className={`relative ${
                                    isLeft
                                        ? 'lg:col-start-1 lg:justify-self-end lg:pr-14'
                                        : 'lg:col-start-2 lg:justify-self-start lg:pl-14'
                                }`}
                            >
                                <article
                                    role="button"
                                    tabIndex={0}
                                    aria-expanded={open === index}
                                    onClick={() => setOpen(open === index ? null : index)}
                                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen(open === index ? null : index)}
                                    className="relative flex max-w-[600px] items-start gap-2 rounded-[28px] bg-white px-2 py-6 text-left shadow-[0_24px_60px_rgba(7,24,79,0.35)] md:gap-2 md:px-8 md:py-8 lg:items-center cursor-pointer"
                                >
                                    <span className="lg:hidden absolute -top-6 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-bold text-[var(--blue-primary)] shadow-[0_12px_30px_rgba(10,46,111,0.35)]">
                                      {index + 1}
                                    </span>
                                    <Image
                                        src={`/icons/${stage.img}`}
                                        alt=""
                                        width={133}
                                        height={133}
                                        className="pointer-events-none h-20 w-20 md:h-26 md:w-26"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-xl/5 font-bold md:text-2xl">{stage.title}</h3>
                                        <p className="mt-2 text-sm leading-5 md:text-base md:leading-6">{stage.text}</p>
                                    </div>
                                </article>

                                <AnimatePresence initial={false}>
                                    {open === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, y: -4 }}
                                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                                            exit={{ height: 0, opacity: 0, y: -4 }}
                                            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="mt-4 max-w-[600px] rounded-[28px] bg-[image:var(--gradient-blue)] text-white px-6 py-6 shadow-[0_24px_60px_rgba(7,24,79,0.35)]">
                                                <p className="text-sm leading-6 md:text-base md:leading-7">
                                                    {stage.more ?? stage.text}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <span className="pointer-events-none absolute left-1/2 top-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl font-bold text-[var(--blue-primary)] shadow-[0_18px_40px_rgba(10,46,111,0.35)] lg:flex lg:z-10 z-10">
                                {index + 1}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
        <Image
            src={'/icons/neuro.svg'}
            alt={'neuro'}
            width={1400} height={1400}
            className={"hidden opacity-5 absolute top-0 left-0 rotate-90 h-full w-full md:block z-0"}
        />
    </section>
  );
};

export default Stages;
