import React from 'react';
import Image from "next/image";

const Hero = () => {
    return (
        <section className={'w-full h-[110vh] bg-[#010919] relative overflow-hidden pt-[18vh] md:pt-0 pb-[10vh]'}>
            <div className="flex flex-col justify-between h-full w-full items-center md:flex-row md:container md:mx-auto">
                <div className={'space-y-4 text-white text-center md:text-start z-10'}>
                    <h1 className={"font-bold text-4xl md:text-6xl max-w-[700px]"}>
                        Искусственный интеллект для роста вашего бизнеса
                    </h1>
                    <p className={"text-lg px-3 md:px-0 md:text-2xl max-w-[500px]"}>
                        Помогаем компаниям экономить время и деньги с помощью решений на базе ИИ
                    </p>
                    <button className={'gradientBtn py-3 w-[90%] mx-auto font-bold text-base max-w-[420px] md:text-lg'}>
                        Получить бесплатную консультацию
                    </button>
                </div>
                <Image
                    src="/images/norman_laptop.png"
                    alt="Норман и ноутбук"
                    width={1200} height={800}
                    className={'w-full max-w-[420px] h-auto mx-auto md:mx-0 md:absolute md:right-0 md:top-1/2 md:w-[63%] md:max-w-none md:-translate-y-1/2 md:transform'}
                />
            </div>
            <Image
                src={'/icons/neuro.svg'}
                alt={'Нейроны'}
                width={800} height={900}
                className={'absolute opacity-20 top-40 -left-140 rotate-90 z-0 hidden md:block'}
            />
            juuh
        </section>
    );
};

export default Hero;
