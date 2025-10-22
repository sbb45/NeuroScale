import type { Metadata } from 'next';
import Link from 'next/link';
import RichTextRenderer from '@/components/common/RichTextRenderer';
import {getDocument, getHome} from '@/lib/cms';
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import {fallbacks} from "@/lib/fallback";

const SLUG = 'privacy';

const FALLBACK_PRIVACY = {
    title: 'Политика конфиденциальности',
    description:
        'Настоящая политика описывает, как NeuroScale собирает, использует и защищает персональные данные посетителей сайта и клиентов.',
    updatedAt: '2025-01-15T00:00:00.000Z',
    content: {
        document: [
            {
                type: 'heading',
                level: 2,
                children: [{ text: '1. Общие положения' }],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Политика разработана в соответствии с Федеральным законом Российской Федерации № 152-ФЗ «О персональных данных» и иными нормативными актами. Используя наш сайт, вы подтверждаете согласие с условиями обработки персональных данных, описанными в настоящем документе.',
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '2. Какие данные мы обрабатываем' }],
            },
            {
                type: 'unordered-list',
                children: [
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'paragraph',
                                children: [{ text: 'Контактные данные: имя, номер телефона, адрес электронной почты.' }],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'paragraph',
                                children: [{ text: 'Информацию, предоставляемую в заявках и формах обратной связи.' }],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    { text: 'Технические сведения: IP-адрес, данные файлов cookie, параметры используемого устройства и браузера.' },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '3. Цели обработки данных' }],
            },
            {
                type: 'unordered-list',
                children: [
                    {
                        type: 'list-item',
                        children: [
                            { type: 'paragraph', children: [{ text: 'Связь с пользователями по запросам и заявкам.' }] },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            { type: 'paragraph', children: [{ text: 'Подготовка индивидуальных предложений и материалов.' }] },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            { type: 'paragraph', children: [{ text: 'Улучшение качества сервиса и доработка продуктов NeuroScale.' }] },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            { type: 'paragraph', children: [{ text: 'Информирование о новых возможностях, услугах и мероприятиях.' }] },
                        ],
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '4. Правовые основания' }],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'NeuroScale осуществляет обработку персональных данных на основании согласия субъектов данных, а также для исполнения договоров и законных обязанностей компании.',
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '5. Передача и хранение' }],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Данные хранятся на защищённых серверах в соответствии с требованиями безопасности. Передача третьим лицам возможна только по закону либо при привлечении партнёров, которые обязуются соблюдать конфиденциальность.',
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '6. Права субъектов данных' }],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Вы можете запросить информацию о хранении персональных данных, потребовать их уточнения, блокирования или удаления. Для этого направьте запрос на электронную почту, указанную в разделе контактов.',
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '7. Cookies и аналитика' }],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Мы используем файлы cookie и инструменты аналитики для персонализации сервисов и улучшения функциональности сайта. Вы можете ограничить использование cookie в настройках браузера, но это может повлиять на работу отдельных разделов.',
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '8. Обновление политики' }],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Мы оставляем за собой право обновлять политику конфиденциальности. Продолжение использования сайта после изменений означает ваше согласие с обновлённой редакцией.',
                    },
                ],
            },
        ],
    },
};

function formatDate(value: string | null | undefined) {
    if (!value) return null;
    try {
        return new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(value));
    } catch {
        return null;
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const doc = await getDocument(SLUG);
    return {
        title: doc?.title ? `${doc.title} | NeuroScale` : 'Политика конфиденциальности | NeuroScale',
        description: doc?.description ?? FALLBACK_PRIVACY.description,
    };
}

export default async function PrivacyPolicyPage() {
    const dataHeader = await getHome();
    const doc = await getDocument(SLUG);

    const contacts = dataHeader.contacts.length ? dataHeader.contacts : fallbacks.contacts;
    const data = doc ?? FALLBACK_PRIVACY;
    const updatedAt = formatDate(doc?.updatedAt ?? FALLBACK_PRIVACY.updatedAt);

    return (
        <>
        <Header contacts={contacts} />
        <main className="bg-[#0B1E3F] text-white">
            <section className="container mx-auto px-4 py-20 md:py-24">
                <div className="mx-auto max-w-4xl space-y-8">
                    <header className="mt-10 space-y-2 sm:space-y-4">
                        <p className="text-[12px] sm:text-sm uppercase tracking-[0.25em] text-white/70">Документы</p>
                        <h1 className="text-xl sm:text-3xl font-semibold md:text-5xl">{data.title}</h1>
                        {data.description ? <p className="text-white/70 text-sm md:text-lg">{data.description}</p> : null}
                    </header>

                    <article className="space-y-6 rounded-3xl bg-white/5 p-6 backdrop-blur md:p-10">
                        <RichTextRenderer value={doc?.content ?? FALLBACK_PRIVACY.content} />
                    </article>

                        <footer className="space-y-2 text-xs sm:text-sm text-white/60">
                            {updatedAt ? <p>Дата последнего обновления: {updatedAt}.</p> : null}
                            {!doc && (
                                <p>
                                    По вопросам обработки данных обращайтесь по адресу{' '}
                                    <Link href="mailto:info@neuroscale-company.ru" className="text-white hover:text-white/80">
                                        info@neuroscale-company.ru
                                    </Link>
                                    .
                                </p>
                            )}
                        </footer>
                </div>
            </section>
        </main>
        </>
    );
}
