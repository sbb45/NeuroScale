'use client'
import React, {useState} from 'react';
import Image from 'next/image';
import Link from "next/link";
import {AnimatePresence, motion, Variants} from "framer-motion";
import { Menu, X } from "lucide-react";

const Header = () => {
    // Меню
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    // Анимации
    const menuVariants: Variants = {
        hidden:  { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
        exit:    { opacity: 0, height: 0 },
    };

    return (
        <header className={"container mx-auto absolute top-0 right-0 left-0 z-50 backdrop-blur-lg md:backdrop-blur-none py-5"}>
            <nav className={"flex items-center justify-between text-white px-3 md:px-0"}>
                <Image src="/icons/logo.png" alt="logo" width={151} height={48} />
                <ul className={'hidden md:flex gap-4 text-lg'}>
                    <li><Link href="/#about">О нас</Link></li>
                    <li><Link href="/#possibilities">Возможности</Link></li>
                    <li><Link href="/#stages">Этапы</Link></li>
                    <li><Link href="/#projects">Проекты</Link></li>
                    <li><Link href="/#faq">FAQ</Link></li>
                </ul>
                <Link
                    href={'/#contacts'}
                    className={"hidden md:flex justify-center items-center gap-3.5 py-2 pr-3.5 pl-5.5 font-bold gradientBtn"}
                >
                    Связаться
                    <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                        <Image src="/icons/arrow.svg" alt="arrow" width={7} height={13} />
                    </div>
                </Link>
                <button
                    onClick={toggleMenu}
                    className={"md:hidden text-white focus:outline-none relative w-7 h-7"}
                    aria-label="Toggle Menu"
                >
                    <motion.span
                        key={menuOpen ? "close" : "open"}
                        initial={{ opacity: 0, rotate: -90, scale: .8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: .8 }}
                        transition={{ duration: .3 }}
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
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className={'md:hidden mt-3 text-white px-5 w-full py-6'}
                    >
                        <ul className={'gap-4 text-lg space-y-3 '}>
                            <li><Link href="/#about">О нас</Link></li>
                            <li><Link href="/#possibilities">Возможности</Link></li>
                            <li><Link href="/#stages">Этапы</Link></li>
                            <li><Link href="/#projects">Проекты</Link></li>
                            <li><Link href="/#faq">FAQ</Link></li>
                        </ul>
                        <Link
                            href={'/#contacts'}
                            className={"flex justify-center mt-4 items-center gap-3.5 py-2 pr-3.5 pl-5.5 rounded-3xl rounded-bl-none gradientBtn font-bold"}
                        >
                            Связаться
                            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                <Image src="/icons/arrow.svg" alt="arrow" width={7} height={13} />
                            </div>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;