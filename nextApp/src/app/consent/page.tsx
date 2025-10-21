import type { Metadata } from 'next';
import Link from 'next/link';
import RichTextRenderer from '@/components/common/RichTextRenderer';
import { getDocument } from '@/lib/cms';
import Header from "@/components/landing/Header";

const SLUG = 'consent';

const FALLBACK_CONSENT = {
    title: 'Согласие на обработку данных',
    description:
        'Отправляя заявку или используя формы обратной связи на сайте NeuroScale, вы подтверждаете данное согласие.',
    updatedAt: '2025-01-15T00:00:00.000Z',
    content: {
        document: [
            {
                type: 'heading',
                level: 2,
                children: [{ text: '1. Субъект персональных данных' }],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Я, заполняя формы обратной связи на сайте NeuroScale, свободно, своей волей и в своём интересе предоставляю согласие на обработку персональных данных компанией NeuroScale.',
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '2. Перечень данных' }],
            },
            {
                type: 'unordered-list',
                children: [
                    {
                        type: 'list-item',
                        children: [
                            { type: 'paragraph', children: [{ text: 'Фамилия, имя, отчество или иные идентификационные данные.' }] },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            { type: 'paragraph', children: [{ text: 'Контактные данные: адрес электронной почты, номер телефона, мессенджеры.' }] },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'paragraph',
                                children: [{ text: 'Дополнительная информация, содержащаяся в сообщениях и комментариях в формах обратной связи.' }],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '3. Цели обработки' }],
            },
            {
                type: 'unordered-list',
                children: [
                    {
                        type: 'list-item',
                        children: [
                            { type: 'paragraph', children: [{ text: 'Ответ на запросы и предоставление консультаций.' }] },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            { type: 'paragraph', children: [{ text: 'Подготовка предложений по продуктам и услугам NeuroScale.' }] },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            { type: 'paragraph', children: [{ text: 'Информирование о мероприятиях, новостях и обновлениях компании.' }] },
                        ],
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '4. Действия с данными' }],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'NeuroScale вправе осуществлять сбор, систематизацию, хранение, уточнение, использование, обезличивание и удаление персональных данных, включая передачу уполномоченным партнёрам для достижения указанных целей при условии соблюдения конфиденциальности.',
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '5. Срок действия согласия' }],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Согласие действует бессрочно до момента его отзыва субъектом персональных данных. Отзыв может быть направлен в электронном виде на указанный компанией адрес электронной почты.',
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '6. Права субъекта' }],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Субъект имеет право на получение информации об обработке персональных данных, требование их уточнения, ограничения или прекращения обработки в установленном законом порядке.',
                    },
                ],
            },
            {
                type: 'heading',
                level: 2,
                children: [{ text: '7. Дополнительные условия' }],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Подтверждая согласие, субъект гарантирует достоверность предоставленных данных и согласен с условиями политики конфиденциальности. Использование сайта без предоставления согласия ограничивает доступ к отдельным сервисам.',
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
        title: doc?.title ? `${doc.title} | NeuroScale` : 'Согласие на обработку данных | NeuroScale',
        description: doc?.description ?? FALLBACK_CONSENT.description,
    };
}

export default async function ConsentPage() {
    const doc = await getDocument(SLUG);
    const data = doc ?? FALLBACK_CONSENT;
    const updatedAt = formatDate(doc?.updatedAt ?? FALLBACK_CONSENT.updatedAt);

    return (
        <>
            <Header />
            <main className="bg-[#0B1E3F] text-white">
                <section className="container mx-auto px-4 py-16 md:py-24">
                    <div className="mx-auto max-w-4xl space-y-8">
                        <header className="mt-10 space-y-2 sm:space-y-4">
                            <p className="text-[12px] sm:text-sm uppercase tracking-[0.25em] text-white/70">Документы</p>
                            <h1 className="text-xl sm:text-3xl font-semibold md:text-5xl">{data.title}</h1>
                            {data.description ? <p className="text-white/70 text-sm md:text-lg">{data.description}</p> : null}
                        </header>

                        <article className="space-y-6 rounded-3xl bg-white/5 p-6 backdrop-blur md:p-10">
                            <RichTextRenderer value={doc?.content ?? FALLBACK_CONSENT.content} />
                        </article>

                        <footer className="space-y-2 text-xs sm:text-sm text-white/60">
                            {updatedAt ? <p>Дата последнего обновления: {updatedAt}.</p> : null}
                            {!doc && (
                                <p>
                                    NeuroScale, ИНН 0000000000, Москва. Контакты:{' '}
                                    <Link href="tel:+79169080334" className="text-white hover:text-white/80">
                                        +7&nbsp;916&nbsp;908&nbsp;03&nbsp;34
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
