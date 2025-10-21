'use client';
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

type NavItem = {
    label: string;
    section: string;
};

const NAV_ITEMS: NavItem[] = [
    { label: 'О нас', section: 'about' },
    { label: 'Возможности', section: 'possibilities' },
    { label: 'Этапы', section: 'stages' },
    { label: 'Кейсы', section: 'projects' },
    { label: 'FAQ', section: 'faq' },
];

const Header = () => {
    // Меню
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Анимации
    const menuVariants: Variants = {
        hidden:  { opacity: 0, scaleY: 0 },
        visible: { opacity: 1, scaleY: 1 },
        exit:    { opacity: 0, scaleY: 0 },
    };

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
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 left-0 z-20 py-3 bg-[#010919] md:py-5"
        >
            <nav className="flex items-center justify-between container mx-auto px-3 text-white md:px-0">
                <Link href="/" aria-label="NeuroScale — главная">
                    <Image src="/icons/logo.png" alt="logo" width={151} height={48} className={"w-[120px] sm:w-[151px]"} />
                </Link>
                <ul className="hidden gap-4 text-lg md:flex">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.section}>
                            <Link href={`/#${item.section}`} onClick={handleNavClick(item.section)}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link
                    href="/#contacts"
                    onClick={handleNavClick('contacts')}
                    className="gradientBtn hidden items-center justify-center gap-3.5 py-2 pl-5.5 pr-3.5 font-bold md:flex"
                >
                    Связаться
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                        <Image src="/icons/arrow.svg" alt="arrow" width={7} height={13} />
                    </div>
                </Link>
                <button
                    onClick={toggleMenu}
                    className="relative h-7 w-7 text-white focus:outline-none md:hidden"
                    aria-label="Toggle Menu"
                >
                    <motion.span
                        key={menuOpen ? 'close' : 'open'}
                        initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </motion.span>
                </button>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="md:hidden origin-top overflow-hidden absolute left-0 right-0 top-full bg-[#010919]"
                    >
                        <div className="w-full px-5 py-6 text-white">
                            <ul className="space-y-3 text-base sm:text-lg">
                                {NAV_ITEMS.map((item) => (
                                    <li key={`mobile-${item.section}`}>
                                        <Link href={`/#${item.section}`} onClick={handleNavClick(item.section)}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/#contacts"
                                onClick={handleNavClick('contacts')}
                                className="mt-4 flex items-center justify-center gap-3.5 rounded-3xl rounded-bl-none py-2 pl-5.5 pr-3.5 font-bold gradientBtn"
                            >
                                Связаться
                                <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white">
                                    <Image src="/icons/arrow.svg" alt="arrow" width={7} height={13} className={"w-[5] h-[8] ml-[1px] sm:w-[7] sm:h-[13] sm:ml-0"} />
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
