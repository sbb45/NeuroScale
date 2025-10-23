'use client';
import React, {useCallback, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Contact as ContactT } from '@/lib/cms';
import { fadeInLeft, fadeInUp, revealParent, viewportOnce } from '@/lib/motion';
import {usePathname} from "next/navigation";

const SOCIAL_KEYS = ['telegram', 'max', 'whatsapp'] as const;
type SocialKey = (typeof SOCIAL_KEYS)[number];
type NavItem = {
    label: string;
    section: string;
};

const SOCIAL_ICONS: Record<SocialKey, string> = {
    whatsapp: '/icons/link-wh.svg',
    telegram: '/icons/link-tg.svg',
    max: '/icons/link-max.svg',
};

const SOCIAL_LABELS: Record<SocialKey, string> = {
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    max: 'Max',
};

const NAV_ITEMS: NavItem[] = [
    { label: 'О нас', section: 'about' },
    { label: 'Возможности', section: 'possibilities' },
    { label: 'Этапы', section: 'stages' },
    { label: 'Кейсы', section: 'projects' },
    { label: 'FAQ', section: 'faq' },
    { label: 'Заявка', section: 'contacts' },
];

function normalizeInput(value: string) {
    return value.trim().toLowerCase();
}

function normalizeSocialHref(value: string, socialKey: SocialKey, fallbackHref: string) {
    const trimmed = value.trim();
    if (!trimmed) return fallbackHref;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (socialKey === 'telegram') {
        if (trimmed.startsWith('@')) return `https://t.me/${trimmed.slice(1)}`;
        if (trimmed.startsWith('t.me/')) return `https://${trimmed}`;
    }
    if (socialKey === 'whatsapp') {
        const digits = trimmed.replace(/[^\d]/g, '');
        if (digits) return `https://wa.me/${digits}`;
        if (trimmed.startsWith('wa.me/')) return `https://${trimmed}`;
    }
    if (socialKey === 'max') {
        if (trimmed.startsWith('@')) return `https://max.me/${trimmed.slice(1)}`;
        if (trimmed.startsWith('max.me/')) return `https://${trimmed}`;
    }
    return `https://${trimmed.replace(/^https?:\/\//i, '')}`;
}

function prepareContacts(contacts: ContactT[]) {
    const defaultSocials: Record<SocialKey, { label: string; href: string }> = {
        whatsapp: { label: SOCIAL_LABELS.whatsapp, href: 'https://wa.me/79169080334' },
        telegram: { label: SOCIAL_LABELS.telegram, href: 'https://t.me/neuroscale' },
        max: { label: SOCIAL_LABELS.max, href: 'https://max.me/79169080334' },
    };

    let phone: string | null = null;
    let email: string | null = null;
    const socials: Record<SocialKey, { label: string; href: string }> = { ...defaultSocials };

    contacts.forEach((contact) => {
        const name = normalizeInput(contact.name ?? '');
        const value = (contact.value ?? '').trim();
        if (!value) return;

        if (!phone && /(phone|тел)/.test(name)) {
            phone = value.replace(/^tel:/i, '');
            return;
        }

        if (!email && /(mail|почт)/.test(name)) {
            email = value.replace(/^mailto:/i, '');
            return;
        }

        const socialKey: SocialKey | null = (() => {
            if (name.includes('whats')) return 'whatsapp';
            if (name.includes('телег') || name.includes('tg') || name.includes('tele')) return 'telegram';
            if (name.includes('max')) return 'max';
            return null;
        })();

        if (socialKey) {
            socials[socialKey] = {
                label: contact.name?.trim() || SOCIAL_LABELS[socialKey],
                href: normalizeSocialHref(value, socialKey, defaultSocials[socialKey].href),
            };
        }
    });

    return {
        phone: phone ?? '+7 916 908 03 34',
        email: email ?? 'info@neuroscale-company.ru',
        socials: SOCIAL_KEYS.map((key) => ({ key, ...socials[key] })),
    };
}

function buildPhoneHref(value: string) {
    const cleaned = value.replace(/[^\d+]/g, '');
    return cleaned.startsWith('+') ? `tel:${cleaned}` : `tel:+${cleaned}`;
}

type FooterProps = {
    contacts: ContactT[];
};

const Footer = ({ contacts }: FooterProps) => {
    const contactData = prepareContacts(contacts);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleNavClick = useCallback(
        (section: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
            setMenuOpen(false);
            if (pathname === '/') {
                event.preventDefault();
                const element = document.getElementById(section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.history.replaceState(null, '', `/#${section}`);
                }
            }
        },
        [pathname],
    );

    return (
        <motion.footer
            initial="hidden"
            whileInView="show"
            variants={revealParent}
            viewport={viewportOnce}
            className="pt-14 bg-[linear-gradient(110deg,#000000_3%,#002877_45%)] relative z-12 rounded-4xl rounded-b-none overflow-hidden -mt-10 lg:-mt-16 lg:lg:rounded-[80px] lg:rounded-b-none"
        >
            <div className="container mx-auto px-4 text-white relative z-14">
                <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
                    <motion.div variants={fadeInUp} className="mb-10 flex items-end justify-between gap-5 md:flex-col">
                        <motion.div variants={fadeInUp}>
                            <Image src="/icons/logo.png" alt="logo" width={198} height={64} className="w-30 sm:w-40" />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="mt-6 flex items-center justify-center gap-4">
                            {contactData.socials.map((social, index) => (
                                <motion.span
                                    key={social.key}
                                    variants={fadeInUp}
                                    custom={index}
                                    className="inline-flex"
                                >
                                    <Link
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/10 transition-colors duration-200 hover:bg-white/20"
                                        aria-label={social.label}
                                    >
                                        <Image src={SOCIAL_ICONS[social.key]} alt={social.label} width={40} height={40} className="w-[28px] h-[28px] sm:w-[40px] sm:h-[40px]" />
                                    </Link>
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-4 md:flex items-start justify-start gap-8">
                        <div className="hidden md:block">
                            <h3 className="mb-2 w-full text-xl font-bold">Навигация</h3>
                            <div className="grid grid-cols-[max-content_1fr_1fr] gap-y-2 gap-x-8">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.section}
                                        href={`/#${item.section}`}
                                        onClick={handleNavClick(item.section)}
                                        className="block"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-0.5 md:justify-start">
                            <h3 className="mb-2 w-full text-center text-lg sm:text-xl font-bold md:text-start">Связаться с нами</h3>
                            <Link
                                href={buildPhoneHref(contactData.phone)}
                                className="mb-1 flex items-center justify-center gap-2 text-sm sm:text-base md:justify-start"
                            >
                                <Image src="/icons/phone.svg" alt="phone" width={40} height={40} className="h-6 w-6 sm:h-8 sm:w-8" />
                                {contactData.phone}
                            </Link>
                            <Link
                                href={`mailto:${contactData.email}`}
                                className="flex items-center justify-center gap-2 text-sm sm:text-base md:justify-start"
                            >
                                <Image src="/icons/mail.svg" alt="email" width={40} height={40} className="h-6 w-6 sm:h-8 sm:w-8" />
                                {contactData.email}
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <motion.hr variants={fadeInUp} className="mt-12 h-[1px] w-full border-0 bg-white md:mt-18" />
                <motion.div variants={fadeInUp} className="mt-12 pb-8">
                    <div className="flex flex-col items-center justify-center text-sm sm:text-base gap-1 md:flex-row md:gap-8">
                        <Link href="/privacy">Политика конфиденциальности</Link>
                        <Link href="/consent">Согласие на обработку данных</Link>
                    </div>
                    <p className="mt-1 text-center text-sm sm:text-base text-[var(--color-gray)]">© 2025 NeuroScale. Все права защищены.</p>
                </motion.div>
            </div>
            <motion.div
                animate={{ scale: [1, 1.04, 1], rotate: [12, 18, 12] }}
                transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 "
            >
                <Image
                    src="/icons/neuro.svg"
                    alt="neuro"
                    width={1600}
                    height={900}
                    className="absolute z-10 h-full w-full bottom-0 -left-48 rotate-90 opacity-10 sm:-bottom-30 sm:-left-100 lg:-bottom-80 lg:-left-194 lg:rotate-28"
                />
            </motion.div>
        </motion.footer>
    );
};

export default Footer;
