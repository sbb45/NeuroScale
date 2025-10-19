'use client'
import React, {FormEvent, useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {Plus} from "lucide-react"
import Image from "next/image";
import Link from "next/link";


const faqs= [
    {question: "Для чего нам это вообще нужно?", answer: "fr"},
    {question: "Это безопасно? Что с персональными данными?", answer: "fr"},
    {question: "Внедрение ИИ - это сложно?", answer: "fr"},
    {question: "Нужно ли менять CRM или внутренние системы?", answer: "fr"},
    {question: "Что, если сотрудники будут сопротивляться?", answer: "fr"},
    {question: "Сколько это стоит?", answer: "fr"},
]

const Information = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [question, setQuestion] = useState("");
    const [openIdx, setOpenIdx] = useState<number | null>(null);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await fetch('/api/client', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                question: question,
            })
        })
        setName("");
        setEmail("");
        setPhone("");
        setQuestion("");
    }

    return (
        <section className={"bg-white pt-10 pb-24 md:pt-16 md:py-28"}>
            <div className={"container mx-auto grid grid-cols-1 px-4 md:grid-cols-2 md:gap-6"}>
                <div className={"flex justify-center items-center flex-col md:justify-start md:items-start"}>
                    <p className={"sectionSubtitle -mb-2 md:mb-2"}>FAQ</p>
                    <h2 className={"sectionTitle text-center md:text-start"}>Часто задаваемые вопросы</h2>
                    <div className={"space-y-4 md:mt-4 w-full"}>
                        {faqs.map((faq, i) => {
                            const open = openIdx === i;
                            const id = `faq-${i}`;
                            return (
                                <div key={i} className="rounded-4xl bg-white shadow-[0_0_30px_2px_rgba(0,79,237,0.1)] px-6 py-2">
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between gap-2 text-left"
                                        onClick={() => setOpenIdx(open ? null : i)}
                                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenIdx(open ? null : i)}
                                        aria-expanded={open}
                                        aria-controls={`${id}-content`}
                                    >
                                        <p className="font-bold text-sm md:text-lg">{faq.question}</p>

                                        <motion.span
                                            initial={false}
                                            animate={{ rotate: open ? 45 : 0 }}
                                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                                            className="gradientBlock text-white inline-flex items-center justify-center"
                                        >
                                            <Plus className="w-5 h-5" />
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
                                                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-2 pb-3 text-[var(--color-gray)] text-sm md:text-base">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={"mt-12 max-w-[540px] ml-auto relative"}>
                    <form onSubmit={handleSubmit} className={"px-4 py-8 flex flex-col justify-center items-center space-y-3 text-center rounded-4xl relative z-10 md:px-12 md:py-10 bg-white shadow-[0_0_40px_10px_rgba(0,79,237,0.2)]"}>
                        <h2 className={"text-2xl font-bold mb-2 md:text-4xl"}>Нужна помощь?</h2>
                        <p className={"mb-4 text-base text-[var(--gray-color)] md:mb-8 md:text-xl md:w-[90%]"}>Оставьте сообщение, и мы ответим вам в ближайшее время.</p>
                        <input type="text" placeholder="Ваше имя" required
                               className={"w-full h-12 rounded-xl px-4 border-1 border-[var(--blue-primary)]"}
                               value={name} onChange={e => setName(e.target.value)}
                        />
                        <input type="email" placeholder="Ваш email" required
                               className={"w-full h-12 rounded-xl px-4 border-1 border-[var(--blue-primary)]"}
                               value={email} onChange={e => setEmail(e.target.value)}
                        />
                        <input type="text" placeholder="Номер телефона" required
                               className={"w-full h-12 rounded-xl px-4 border-1 border-[var(--blue-primary)]"}
                               value={phone} onChange={e => setPhone(e.target.value)}
                        />
                        <textarea placeholder="Сообщение"
                               className={"w-full h-28 py-3 rounded-xl px-4 border-1 resize-none border-[var(--blue-primary)]"}
                                  value={question} onChange={e => setQuestion(e.target.value)}
                        />
                        <button
                            type="submit"
                            className={"flex justify-center items-center gap-3.5 py-2 pr-3.5 pl-5.5 gradientBtn w-full mt-3 md:w-max"}
                        >
                            Отправить сейчас
                            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                <Image src="/icons/arrow.svg" alt="arrow" width={7} height={13} />
                            </div>
                        </button>
                        <p className="text-xs text-[--gray-color] md:mt-4">
                            Нажимая кнопку, вы соглашаетесь с
                            <Link href="#" className={"text-[var(--blue-primary)]"}> политикой конфиденциальности</Link>
                        </p>
                    </form>
                    <span className={"w-full h-44 bg-[var(--blue-primary)] !rounded-4xl absolute -bottom-1 left-0 z-0"}></span>
                    <span className={"w-44 h-44 gradientBlock !rounded-4xl absolute -top-8 -right-8 z-0 !hidden md:!block"}></span>
                </div>
            </div>
        </section>
    );
};

export default Information;