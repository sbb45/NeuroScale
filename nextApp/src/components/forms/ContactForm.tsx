'use client';
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Title as TitleT } from '@/lib/cms';
import { X } from 'lucide-react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

type ContactFormProps = {
    form: TitleT;
    className?: string;
    onSubmitted?: () => void;
};

const CHANNELS = [
    { value: 'call', label: 'Позвонить' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'max', label: 'Max' },
    { value: 'whatsapp', label: 'WhatsApp' },
];

export default function ContactForm({ form, className, onSubmitted }: ContactFormProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneInvalid, setPhoneInvalid] = useState(false);
    const [question, setQuestion] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const digits = (s: string) => s.replace(/\D/g, '');
    const isRuComplete = (s: string) => digits(s).length >= 11; // для РФ ждём 11 цифр с ведущей 7

    const resetForm = () => {
        setName('');
        setPhone('');
        setQuestion('');
        setPhoneInvalid(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (status === 'loading') return;

        // валидация телефона перед отправкой
        const d = digits(phone);
        const normalized = d.startsWith('8') ? '7' + d.slice(1) : d;
        if (normalized.length < 11) {
            setPhoneInvalid(true);
            return;
        }

        setStatus('loading');
        try {
            const response = await fetch('/api/client', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    phone: normalized, // отправляем нормализованную строку из цифр
                    question,
                }),
            });
            if (!response.ok) throw new Error('Не удалось отправить форму');

            resetForm();
            setStatus('success');
            onSubmitted?.();
            setTimeout(() => setStatus('idle'), 3500);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    const phoneBase =
        '!h-10 !text-sm sm:!text-base sm:!h-12 w-full !rounded-xl border px-4 focus:!outline-none';

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
                </button>
            ) : (
                ''
            )}

            <h2 className="mb-2 text-xl sm:text-2xl font-bold md:text-4xl">{form.title}</h2>
            {form.description ? (
                <p className="mb-4 text-xs sm:text-base text-[var(--gray-color)] md:mb-8 md:text-xl md:w-[90%]">
                    {form.description}
                </p>
            ) : null}

            <input
                type="text"
                placeholder="Ваше имя"
                required
                className="h-10 text-sm sm:text-base sm:h-12 w-full rounded-xl border border-[var(--blue-primary)] px-4 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <PhoneInput
                defaultCountry="ru"
                disableDialCodePrefill
                placeholder="Номер телефона"
                className="w-full"
                inputClassName={
                    phoneBase +
                    ' ' +
                    (phoneInvalid ? '!border-[#C23333] focus:!border-[#C23333]' : '!border-[var(--blue-primary)]')
                }
                countrySelectorStyleProps={{
                    flagStyle: { display: 'none' },
                    buttonStyle: { background: 'none', border: 'none', padding: 0 },
                    dropdownArrowStyle: { display: 'none' },
                }}
                value={phone}
                onChange={(val) => {
                    const fixed = val.replace(/^\+?8/, '+7'); // "+8…" -> "+7…", "8…" -> "+7…"
                    setPhone(fixed);
                    setPhoneInvalid(false);
                }}
                onBlur={() => {
                    setPhoneInvalid(!isRuComplete(phone));
                }}
            />

            <textarea
                placeholder="Сообщение"
                className="h-20 text-sm sm:text-base w-full resize-none rounded-xl border border-[var(--blue-primary)] px-4 py-3 focus:outline-none"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <button
                type="submit"
                className="gradientBtn py-2 text-sm sm:text-base mt-3 flex w-full items-center justify-center gap-2 sm:gap-3.5 pl-5.5 pr-3.5 md:w-max disabled:opacity-70"
                disabled={status === 'loading'}
            >
                {status === 'loading' ? 'Отправляем…' : 'Отправить сейчас'}
                <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white">
                    <Image
                        src="/icons/arrow.svg"
                        alt="arrow"
                        width={7}
                        height={13}
                        className="w-[5] h-[8] ml-[1px] sm:w-[7] sm:h-[13] sm:ml-0"
                    />
                </div>
            </button>

            <div className="flex flex-col items-start space-y-2 mt-3 text-left text-xs sm:text-sm text-[--gray-color]">
                <label className="flex items-start gap-2">
                    <input type="checkbox" required className="mt-0.5 min-h-4 min-w-4 accent-[var(--blue-primary)]" />
                    <span>
            Я ознакомлен с <Link href="/privacy" className="text-[var(--blue-primary)]">Политикой Конфиденциальности</Link>
          </span>
                </label>

                <label className="flex items-start gap-2">
                    <input type="checkbox" required className="mt-0.5 min-h-4 min-w-4 accent-[var(--blue-primary)]" />
                    <span>
            Я подтверждаю свое{' '}
                        <Link href="/consent" className="text-[var(--blue-primary)]">согласие на обработку моих персональных данных</Link>, указанных в данной форме
          </span>
                </label>

                <label className="flex items-start gap-2">
                    <input type="checkbox" required className="mt-0.5 min-h-4 min-w-4 accent-[var(--blue-primary)]" />
                    <span>
            Я уведомлён(а), что могу отозвать согласие путём направления запроса по адресу электронной почты:{' '}
                        <Link href="mailto:info@neuroscale-company.ru" className="text-[var(--blue-primary)]">info@neuroscale-company.ru</Link>
          </span>
                </label>
            </div>

            {status === 'success' ? (
                <p className="rounded-2xl bg-[#E9FFF2] px-4 py-2 text-xs sm:text-sm font-semibold text-[#0E8D4D]">
                    Спасибо! Мы свяжемся с вами в ближайшее время.
                </p>
            ) : null}
            {status === 'error' ? (
                <p className="rounded-2xl bg-[#FFEAEA] px-4 py-2 text-xs sm:text-sm font-semibold text-[#C23333]">
                    Что-то пошло не так. Попробуйте ещё раз позже.
                </p>
            ) : null}
        </form>
    );
}
