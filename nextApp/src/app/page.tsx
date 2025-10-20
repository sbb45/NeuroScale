export const dynamic = 'force-static';
export const revalidate = 600;
export const runtime = 'nodejs';

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Possibilities from "@/components/landing/Possibilities";
import Stages from "@/components/landing/Stages";
import Cases from "@/components/landing/Cases";
import Information from "@/components/landing/Information";
import Footer from "@/components/landing/Footer";

import { getHome } from '@/lib/cms';
import { fallbacks, aboutsFallback } from '@/lib/fallback';

export default async function Home() {
    const data = await getHome();

    const titles = data.titles.length ? data.titles : fallbacks.titles;
    const contacts= data.contacts.length ? data.contacts : fallbacks.contacts;
    const abouts = data.abouts.length ? data.abouts : aboutsFallback as any;
    const statistics= data.statistics.length ? data.statistics : fallbacks.statistics;
    const possibilities = data.possibilities.length ? data.possibilities : fallbacks.possibilities;
    const stages = data.stages.length ? data.stages : fallbacks.stages;
    const cases = data.cases.length ? data.cases : fallbacks.cases;
    const faqs = data.faqs.length ? data.faqs : fallbacks.faqs;

    const heroTitle = titles.find(obj => obj.name === 'hero');
    const aboutTitle = titles.find(obj => obj.name === 'about');
    const possibilitieTitle = titles.find(obj => obj.name === 'possibilitie');
    const stageTitle = titles.find(obj => obj.name === 'stage');
    const caseTitle = titles.find(obj => obj.name === 'case');
    const faqTitle = titles.find(obj => obj.name === 'faq');
    const formTitle = titles.find(obj => obj.name === 'form');

    return (
        <>
            <Header />
            <main>
                <Hero title={heroTitle} />
                <About abouts={abouts} statistics={statistics} title={aboutTitle} />
                <Possibilities items={possibilities} title={possibilitieTitle} />
                <Stages items={stages} title={stageTitle} />
                <Cases items={cases} title={caseTitle} />
                <Information
                    faqs={faqTitle}
                    form={formTitle}
                    items={faqs}
                />
            </main>
            <Footer />
        </>
    );
}
