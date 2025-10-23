import ScrollTop from "@/components/common/ScrollTop";

export const dynamic = 'force-static';
export const revalidate = 600;
export const runtime = 'nodejs';

import ScrollToHash from '@/components/common/ScrollToHash';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import Possibilities from '@/components/landing/Possibilities';
import Stages from '@/components/landing/Stages';
import Cases from '@/components/landing/Cases';
import Information from '@/components/landing/Information';
import Footer from '@/components/landing/Footer';

import { getHome, type Title } from '@/lib/cms';
import { fallbacks, aboutsFallback } from '@/lib/fallback';

const NOW_ISO = new Date().toISOString();

type TitleFallback = {
    name: string;
    title: string;
    details?: string;
    description?: string;
};

function ensureTitle(value: Title | undefined, fallback: TitleFallback): Title {
    return {
        id: value?.id ?? `fallback-${fallback.name}`,
        name: value?.name ?? fallback.name,
        title: value?.title ?? fallback.title,
        details: value?.details ?? fallback.details,
        description: value?.description ?? fallback.description,
        createdAt: value?.createdAt ?? NOW_ISO,
    };
}

export default async function Home() {
    const data = await getHome();

    const titles = data.titles.length ? data.titles : fallbacks.titles;
    const contacts = data.contacts.length ? data.contacts : fallbacks.contacts;
    const abouts = data.abouts.length ? data.abouts : aboutsFallback as any;
    const statistics = data.statistics.length ? data.statistics : fallbacks.statistics;
    const possibilities = data.possibilities.length ? data.possibilities : fallbacks.possibilities;
    const stages = data.stages.length ? data.stages : fallbacks.stages;
    const cases = data.cases.length ? data.cases : fallbacks.cases;
    const faqs = data.faqs.length ? data.faqs : fallbacks.faqs;

    const heroTitle = ensureTitle(titles.find((obj) => obj.name === 'hero'), {
        name: 'hero',
        title: 'NeuroScale — решений на базе AI',
        details: 'Связаться с нами',
        description: 'Комплексно внедряем искусственный интеллект в процессы продаж, маркетинга и поддержки клиентов.',
    });
    const aboutTitle = ensureTitle(titles.find((obj) => obj.name === 'about'), {
        name: 'about',
        title: 'Почему NeuroScale',
        details: 'О компании',
        description: 'Профессиональная команда внедрения AI решений под задачи бизнеса.',
    });
    const possibilitieTitle = ensureTitle(titles.find((obj) => obj.name === 'possibilitie'), {
        name: 'possibilitie',
        title: 'Что умеет наша платформа',
        details: 'Возможности',
        description: 'Опции и сценарии применения NeuroScale.',
    });
    const stageTitle = ensureTitle(titles.find((obj) => obj.name === 'stage'), {
        name: 'stage',
        title: 'Этапы сотрудничества',
        details: 'Как мы работаем',
        description: 'Прозрачный процесс от аудита до запуска.',
    });
    const caseTitle = ensureTitle(titles.find((obj) => obj.name === 'case'), {
        name: 'case',
        title: 'Наши кейсы',
        details: 'Опыт',
        description: 'Реальные результаты клиентов NeuroScale.',
    });
    const faqTitle = ensureTitle(titles.find((obj) => obj.name === 'faq'), {
        name: 'faq',
        title: 'Ответы на частые вопросы',
        details: 'FAQ',
        description: 'Собрали ключевые ответы о сервисе и процессе сотрудничества.',
    });
    const formTitle = ensureTitle(titles.find((obj) => obj.name === 'form'), {
        name: 'form',
        title: 'Получите консультацию',
        details: 'Связь',
        description: 'Оставьте контакты — обсудим задачи и предложим оптимальное решение под ваш бизнес.',
    });

    return (
        <>
            <Header contacts={contacts} />
            <main>
                <ScrollToHash />
                <Hero title={heroTitle} form={formTitle} />
                <About abouts={abouts} statistics={statistics} title={aboutTitle} />
                <Possibilities items={possibilities} title={possibilitieTitle} />
                <Stages items={stages} title={stageTitle} />
                <Cases items={cases} title={caseTitle} />
                <Information
                    faqs={faqTitle}
                    form={formTitle}
                    items={faqs}
                />
                <ScrollTop />
            </main>
            <Footer contacts={contacts} />
        </>
    );
}
