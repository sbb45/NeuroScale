import React from 'react';

const cases = [
    {direction: "Retail", title: "Магазин одежды", text: "Клиенты засыпали операторов вопросами про наличие и доставку, из-за этого терялась выручка.", solution: "fe", effect:""},
    {direction: "E-commetce", title: "Онлайн-магазин косметики", text: "Клиенты часто бросали корзины и получали нерелевантные предложения, из-за чего конверсия была низкой", solution: "fe", effect:""},
    {direction: "Ed Tech", title: "Online школа", text: "Преподаватели вручную проверяли тесты и отвечали на повторяющиеся вопросы, теряя время", solution: "fe", effect:""},
    {direction: "HR", title: "Кадровое агентство", text: "Рекрутеры тратили недели на разбор резюме и собеседования неподходящих кандидатов", solution: "fe", effect:""},
]

const Cases = () => {
    return (
        <section className={"bg-white"}>
            <div className={"container mx-auto px-4 py-18 md:px-0"}>
                <h2 className={"sectionTitle text-center"}>Наши кейсы</h2>
                <div className={"grid grid-cols-1 gap-4 mt-4 md:gap-7 md:grid-cols-2"}>
                    {cases.map((caseBlock, i) => (
                        <div className={"flex flex-col justify-between items-start py-6 px-4 text-white rounded-4xl md:py-8 md:px-8 bg-[url(/backgrounds/cases-1.svg)] bg-no-repeat bg-center"} key={i}>
                            <span className={"bg-[#3372F1] text-xs rounded-xl py-1 px-3 md:text-base"}>{caseBlock.direction}</span>
                            <div className={"mt-12 font-bold space-y-3 md:space-y-1 lg:mt-24"}>
                                <h3 className={"text-xl md:text-3xl"}>{caseBlock.title}</h3>
                                <p className={"text-xs md:text-base"}>{caseBlock.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cases;