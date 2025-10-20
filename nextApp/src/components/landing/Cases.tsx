import React from 'react';
import {Case as CaseT} from '@/lib/cms';
import {Title as TitleT} from '@/lib/cms';

const Cases = ({items, title}: {items: CaseT[], title: TitleT}) => {
    console.log(items);
    return (
        <section className={"bg-white relative z-12 rounded-4xl rounded-b-none -mt-10 lg:-mt-16 lg:lg:rounded-[80px] lg:rounded-b-none"}>
            <div className={"container mx-auto px-4 py-18 md:px-0"}>
                <h2 className={"sectionTitle text-center"}>{title.title}</h2>
                <div className={"grid grid-cols-1 gap-4 mt-4 md:gap-7 md:grid-cols-2"}>
                    {items.map((caseBlock, i) => (
                        <div className={"flex flex-col justify-between overflow-hidden items-start py-6 px-4 text-white rounded-4xl md:py-8 md:px-8 bg-[url(/backgrounds/cases-1.svg)] bg-no-repeat bg-center"} key={i}>
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