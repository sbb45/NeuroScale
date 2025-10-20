'use client';
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Title as TitleT } from '@/lib/cms';
import {X} from "lucide-react";

type ContactFormProps = {
    form: TitleT;
    className?: string;
    onSubmitted?: () => void;
};

const CHANNELS = [
    { value: 'call', label: 'Позвонить' },
    { value: 'telegram', label: 'Telegram'},
    { value: 'max', label: 'Max' },
    { value: 'whatsapp', label: 'WhatsApp' },
];

export default function ContactForm({ form, className, onSubmitted }: ContactFormProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [question, setQuestion] = useState('');
    const [channel, setChannel] = useState<typeof CHANNELS[number]['value']>('call');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const resetForm = () => {
        setName('');
        setPhone('');
        setQuestion('');
        setChannel('call');
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (status === 'loading') return;

        setStatus('loading');
        try {
            const response = await fetch('/api/client', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    phone,
                    question,
                    contactMethod: channel,
                }),
            });
            if (!response.ok) {
                throw new Error('Не удалось отправить форму');
            }

            resetForm();
            setStatus('success');
            onSubmitted?.();
            setTimeout(() => setStatus('idle'), 3500);
        } catch (e) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`relative z-10 flex w-full max-w-[540px] flex-col items-center justify-center space-y-3 rounded-4xl bg-white px-4 py-8 text-center shadow-[0_0_40px_10px_rgba(0,79,237,0.2)] md:px-12 md:py-10 ${className ?? ''}`}
        >
            {onSubmitted ? (
                <button
                    type="button"
                    onClick={onSubmitted}
                    className="absolute top-3 right-4 text-[var(--blue-primary)] font-semibold cursor-pointer"
                    aria-label="Закрыть модалку"
                >
                    <X size={32} />
                </button>) : ''
            }
            <h2 className="mb-2 text-2xl font-bold md:text-4xl">{form.title}</h2>
            {form.description ? (
                <p className="mb-4 text-base text-[var(--gray-color)] md:mb-8 md:text-xl md:w-[90%]">{form.description}</p>
            ) : null}

            <div className="grid w-full grid-cols-2 gap-2 rounded-2xl bg-[#F4F7FF] p-2 md:gap-3">
                {CHANNELS.map((item) => {
                    const active = channel === item.value;
                    return (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => setChannel(item.value)}
                            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all md:text-base ${
                                active ? 'bg-white shadow-[0_12px_30px_rgba(10,46,111,0.15)] text-[var(--blue-primary)]' : 'text-[var(--color-gray)] hover:bg-white'
                            }`}
                            aria-pressed={active}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>

            <input
                type="text"
                placeholder="Ваше имя"
                required
                className="h-12 w-full rounded-xl border border-[var(--blue-primary)] px-4"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <input
                type="text"
                placeholder="Номер телефона"
                required
                className="h-12 w-full rounded-xl border border-[var(--blue-primary)] px-4"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
            />
            <textarea
                placeholder="Сообщение"
                className="h-28 w-full resize-none rounded-xl border border-[var(--blue-primary)] px-4 py-3"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
            />

            <button
                type="submit"
                className="gradientBtn mt-3 flex w-full items-center justify-center gap-3.5 py-2 pl-5.5 pr-3.5 md:w-max disabled:opacity-70"
                disabled={status === 'loading'}
            >
                {status === 'loading' ? 'Отправляем…' : 'Отправить сейчас'}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                    <Image src="/icons/arrow.svg" alt="arrow" width={7} height={13} />
                </div>
            </button>

            <p className="text-xs text-[--gray-color] md:mt-4">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <Link href="/consent" className="text-[var(--blue-primary)]">
                    согласием на обработку данных
                </Link>
                .
            </p>

            {status === 'success' ? (
                <p className="rounded-2xl bg-[#E9FFF2] px-4 py-2 text-sm font-semibold text-[#0E8D4D]">
                    Спасибо! Мы свяжемся с вами в ближайшее время.
                </p>
            ) : null}
            {status === 'error' ? (
                <p className="rounded-2xl bg-[#FFEAEA] px-4 py-2 text-sm font-semibold text-[#C23333]">
                    Что-то пошло не так. Попробуйте ещё раз позже.
                </p>
            ) : null}
        </form>
    );
}
