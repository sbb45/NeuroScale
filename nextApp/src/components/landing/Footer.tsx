import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="pt-14 bg-[linear-gradient(110deg,#000000_3%,#002877_45%)] relative overflow-hidden">
            <div className={"container mx-auto px-4 text-white"}>
                <div className={"flex justify-center items-center flex-col md:flex-row md:justify-between"}>
                    <div className={"mb-10 flex justify-between items-end gap-5 md:flex-col"}>
                        <Image src={"/icons/logo.png"} alt={'logo'}
                               width={198} height={64}
                               className={"w-40"}
                        />
                        <div className={"mt-6 flex justify-center items-center gap-4"}>
                            <Link href="/">
                                <Image src={"/icons/link-wh.svg"} alt={'whatsapp'} width={40} height={40} />
                            </Link>
                            <Link href="/">
                                <Image src={"/icons/link-tg.svg"} alt={'telegram'} width={40} height={40} />
                            </Link>
                            <Link href="/">
                                <Image src={"/icons/link-max.svg"} alt={'max'} width={40} height={40} />
                            </Link>
                        </div>
                    </div>
                    <div className={"mb-4 md:flex justify-start items-start gap-20"}>
                        <div className={"hidden justify-start items-start gap-0.5 flex-col md:flex"}>
                            <h3 className={"font-bold text-xl mb-2 w-full"}>Навигация</h3>
                            <Link href="/">О нас</Link>
                            <Link href="/">Возможности</Link>
                            <Link href="/">Этапы</Link>
                            <Link href="/">Кейсы</Link>
                            <Link href="/">FAQ</Link>
                        </div>
                        <div className={"flex justify-center items-start gap-0.5 flex-col md:justify-start"}>
                            <h3 className={"font-bold text-xl mb-2 text-center w-full md:text-start"}>Связаться с нами</h3>
                            <Link href="/" className={"flex justify-center items-center gap-2 text-base mb-1"}>
                                <Image src={"/icons/phone.svg"} alt={'phone'} width={40} height={40} className={"w-8 h-8"} />
                                +7 916 908 03 34
                            </Link>
                            <Link href="/" className={"flex justify-center items-center gap-2 text-base"}>
                                <Image src={"/icons/mail.svg"} alt={'email'} width={40} height={40} className={"w-8 h-8"} />
                                info@neuroscale-company.ru
                            </Link>
                        </div>
                    </div>
                </div>
                <hr className="w-full h-[1px] bg-white border-0 mt-12 md:mt-18"/>
                <div className={"mt-12 pb-8"}>
                    <div className={"flex justify-center items-center flex-col gap-1 md:flex-row md:gap-8"}>
                        <Link href="/">Политика Конфиденциальности</Link>
                        <Link href="/">Согласие на обработку данных</Link>
                    </div>
                    <p className={"mt-1 text-center text-[var(--color-gray)]"}>© 2025 NeuroScale. Все права защищены.</p>
                </div>
            </div>
            <Image src={"/icons/neuro.svg"} alt={'neuro'}
                width={1600} height={900}
                className={"w-full h-full opacity-10 absolute rotate-90 bottom-0 -left-48 md:rotate-28 md:-bottom-46 md:-left-144"}
            />
        </footer>
    );
};

export default Footer;