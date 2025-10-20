import 'server-only';
import { unstable_cache } from 'next/cache';

export type Title = { id: string; name: string; details?: string; title: string; description?: string; createdAt: string };
export type PossibilitiePoint = { id: string; name: string };
export type StagePoint = { id: string; name: string };
export type Possibilitie = { id: string; title: string; text: string; points: PossibilitiePoint[]; createdAt: string };
export type Stage = { id: string; title: string; text: string; happening: StagePoint[]; createdAt: string };
export type Case = { id: string; direction: string; title: string; text: string; solution?: string; effect?: string; createdAt: string };
export type Contact = { id: string; name: string; value: string; createdAt: string };
export type About = { id: string; title: string; text: string; createdAt: string };
export type Statistic = { id: string; title: string; text: string; createdAt: string };
export type Faq = { id: string; question: string; answer: string; createdAt: string };

export type HomeData = {
    titles: Title[];
    contacts: Contact[];
    abouts: About[];
    statistics: Statistic[];
    possibilities: Possibilitie[];
    stages: Stage[];
    cases: Case[];
    faqs: Faq[];
};


const EMPTY: HomeData = { titles: [], contacts: [], abouts: [], statistics: [], possibilities: [], stages: [], cases: [], faqs: [] };

// запрос
const GQL = `
  query HomepageData {
    titles(orderBy: [{ createdAt: desc }]) {
      id name details title description createdAt
    }
    contacts(orderBy: [{ createdAt: desc }]) {
      id name value createdAt
    }
    abouts(orderBy: [{ createdAt: desc }]) {
      id title text createdAt
    }
    statistics(orderBy: [{ createdAt: desc }]) {
      id title text createdAt
    }
    possibilities(orderBy: [{ createdAt: desc }]) {
      id title text createdAt
      points { id name }
    }
    stages(orderBy: [{ createdAt: desc }]) {
      id title text createdAt
      happening { id name }
    }
    cases(orderBy: [{ createdAt: desc }]) {
      id direction title text solution effect createdAt
    }
    faqs(orderBy: [{ createdAt: desc }]) {
      id question answer createdAt
    }
  }
`;


async function fetchHome(): Promise<HomeData> {
    try {
        const res = await fetch(process.env.KEYSTONE_GRAPHQL_URL!, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                ...(process.env.KEYSTONE_API_TOKEN ? { Authorization: `Bearer ${process.env.KEYSTONE_API_TOKEN}` } : {}),
            },
            body: JSON.stringify({ query: GQL }),
            cache: 'no-store', // кешируем только Data Cache ниже
        });
        if (!res.ok) return EMPTY;

        const json = await res.json();
        if (json.errors) console.error('GQL errors:', json.errors.map((e: any)=>e.message));
        const d = json.data ?? {};
        return {
            titles: d.titles ?? [],
            contacts: d.contacts ?? [],
            abouts: d.abouts ?? [],
            statistics: d.statistics ?? [],
            possibilities: d.possibilities ?? [],
            stages: d.stages ?? [],
            cases: d.cases ?? [],
            faqs: d.faqs ?? [],
        };
    } catch (e) {
        console.error('Keystone fetch failed:', e);
        return EMPTY;
    }
}

// один кеш на всю главную; инвалидация от ваших хуков по тегам
export const getHome = unstable_cache(fetchHome, ['cms:home'], {
    revalidate: 600,
    tags: ['cms:title','cms:contact','cms:about','cms:statistic','cms:possibilitie','cms:stage','cms:case','cms:faq'],
});

// при желании: быстрые геттеры без доп. запросов
export async function getAbouts() { return (await getHome()).abouts; }
export async function getTitles() { return (await getHome()).titles; }
export async function getContacts() { return (await getHome()).contacts; }
export async function getStatistics() { return (await getHome()).statistics; }
export async function getPossibilities() { return (await getHome()).possibilities; }
export async function getStages() { return (await getHome()).stages; }
export async function getCases() { return (await getHome()).cases; }
export async function getFaqs() { return (await getHome()).faqs; }
