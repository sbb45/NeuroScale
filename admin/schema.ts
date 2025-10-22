// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core'
import {allowAll, denyAll} from '@keystone-6/core/access'

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
    text,
    relationship,
    password,
    timestamp,
    select, integer, multiselect, json, image,
} from '@keystone-6/core/fields'

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document'
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import { type Lists } from '.keystone/types'

export const lists: Lists = {
    // ========================
    // Раздел: Пользователи
    // ========================
    User: list({
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: {
            label: 'Администраторы',
            singular: 'Администратор',
            plural: 'Администраторы',
            path: 'admins',
            labelField: 'name',
            listView: {
                initialColumns: ['name', 'email', 'createdAt'],
                initialSort: { field: 'createdAt', direction: 'DESC' },
            },
            description: 'Пользователи системы',
        },
        fields: {
            name: text({ validation: { isRequired: true }, label: 'Имя' }),
            email: text({ validation: { isRequired: true }, isIndexed: 'unique', label: 'Электронная почта' }),
            password: password({ validation: { isRequired: true }, label: 'Пароль' }),
            createdAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Создано' }),
        },
    }),
    Client: list({
        access: {
            operation: {
                query: ({ session }) => !!session,
                create: allowAll,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: {
            label: 'Клиенты',
            singular: 'Клиент',
            plural: 'Клиенты',
            path: 'client',
            labelField: 'name',
            listView: {
                initialColumns: ['name', 'phone', 'question', 'createdAt'],
                initialSort: { field: 'createdAt', direction: 'DESC' },
            },
            description: 'Клиенты сайта',
        },
        fields: {
            name: text({ validation: { isRequired: true }, label: 'Имя' }),
            phone: text({ validation: { isRequired: true }, label: 'Телефон' }),
            question: text({ label: 'Вопрос' }),
            createdAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Создано' }),
        },
    }),

    // ========================
    // Раздел: Важное
    // ========================
    Title: list({
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: {
            label: 'Заголовки',
            singular: 'Заголовок',
            plural: 'Заголовки',
            path: 'titles',
            labelField: 'title',
            description: 'Заголовки блоков',
            listView: {
                initialColumns: ['name', 'title', 'details', 'description', 'createdAt'],
                initialSort: { field: 'createdAt', direction: 'DESC' },
            },
        },
        fields: {
            name: text({ validation: { isRequired: true }, label: 'Блок (Не менять)' }),
            details:  text({label: 'Подзаголовок' }),
            title:  text({ validation: { isRequired: true }, label: 'Заголовок' }),
            description:  text({label: 'Описание' }),
            createdAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Создано' }),
        },
        hooks: {
            async afterOperation({ operation }) {
                if (['create', 'update', 'delete'].includes(operation)) {
                    const url = `${process.env.SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ tags: ['cms:title'], paths: ['/'] }),
                    }).catch(() => {});
                }
            },
        }
    }),
    Document: list({
        graphql: { plural: 'documents' },
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: {
            label: 'Документы',
            singular: 'Документ',
            plural: 'Документы',
            path: 'documents',
            labelField: 'title',
            description: 'Правовые документы сайта',
            listView: {
                initialColumns: ['slug', 'title', 'updatedAt'],
                initialSort: { field: 'updatedAt', direction: 'DESC' },
            },
        },
        fields: {
            slug: text({ validation: { isRequired: true }, isIndexed: 'unique', label: 'Системное имя (Не менять)' }),
            title: text({ validation: { isRequired: true }, label: 'Заголовок' }),
            description: text({ label: 'Описание' }),
            content: document({
                label: 'Текст',
                formatting: {
                    inlineMarks: {
                        bold: true,
                        italic: true,
                        underline: true,
                        strikethrough: true,
                        code: true,
                    },
                    listTypes: { ordered: true, unordered: true },
                    headingLevels: [2, 3, 4],
                    blockTypes: {
                        blockquote: true,
                    },
                    softBreaks: true,
                },
                links: true,
            }),
            createdAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Создано' }),
            updatedAt: timestamp({
                db: { updatedAt: true },
                label: 'Обновлено',
            }),
        },
        hooks: {
            async afterOperation({ operation }) {
                if (['create', 'update', 'delete'].includes(operation)) {
                    const url = `${process.env.SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ tags: ['cms:document'], paths: ['/privacy', '/consent'] }),
                    }).catch(() => {});
                }
            },
        }
    }),
    Contact: list({
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: {
            label: 'Контакты',
            singular: 'Контакт',
            plural: 'Контакты',
            path: 'contacts',
            labelField: 'name',
            description: 'Контакты',
            listView: {
                initialColumns: ['name','value', 'createdAt'],
                initialSort: { field: 'createdAt', direction: 'DESC' },
            },
        },
        fields: {
            name: text({ validation: { isRequired: true }, label: 'Название (Не менять)' }),
            value:  text({ validation: { isRequired: true }, label: 'Значение' }),
            createdAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Создано' }),
        },
        hooks: {
            async afterOperation({ operation }) {
                if (['create', 'update', 'delete'].includes(operation)) {
                    const url = `${process.env.SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ tags: ['cms:contact'], paths: ['/'] }),
                    }).catch(() => {});
                }
            },
        }
    }),

    // ========================
    // Раздел: Секции
    // ========================
    About: list({
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: {
            label: 'О нас',
            singular: 'О нас',
            plural: 'О нас',
            path: 'o-nas',
            labelField: 'title',
            description: 'Секция о нас',
            listView: {
                initialColumns: ['title', 'text', 'createdAt'],
                initialSort: { field: 'createdAt', direction: 'DESC' },
            },
        },
        fields: {
            title: text({ validation: { isRequired: true }, label: 'Заголовок' }),
            text:  text({ validation: { isRequired: true }, label: 'Описание' }),
            createdAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Создано' }),
        },
        hooks: {
            async afterOperation({ operation }) {
                if (['create', 'update', 'delete'].includes(operation)) {
                    const url = `${process.env.SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ tags: ['cms:about'], paths: ['/'] }),
                    }).catch(() => {});
                }
            },
        }
    }),
    Statistic: list({
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: {
            label: 'Статистика',
            singular: 'Статистика',
            plural: 'Статистика',
            path: 'statistic',
            labelField: 'title',
            description: 'Секциия статистики',
            listView: {
                initialColumns: ['title', 'text', 'createdAt'],
                initialSort: { field: 'createdAt', direction: 'DESC' },
            },
        },
        fields: {
            title: text({ validation: { isRequired: true }, label: 'Заголовок' }),
            text:  text({ validation: { isRequired: true }, label: 'Описание' }),
            createdAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Создано' }),
        },
        hooks: {
            async afterOperation({ operation }) {
                if (['create', 'update', 'delete'].includes(operation)) {
                    const url = `${process.env.SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ tags: ['cms:statistic'], paths: ['/'] }),
                    }).catch(() => {});
                }
            },
        }
    }),
    Possibilitie: list({
        graphql: { plural: 'possibilities' },
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: {
            label: 'Возможности',
            singular: 'Возможность',
            plural: 'Возможности',
            path: 'vozmozhnosti',
            labelField: 'title',
            description: 'Секциия возможностей',
            listView: {
                initialColumns: ['title', 'text', 'createdAt'],
                initialSort: { field: 'createdAt', direction: 'DESC' },
            },
        },
        fields: {
            title: text({ validation: { isRequired: true }, label: 'Заголовок' }),
            text:  text({ validation: { isRequired: true }, label: 'Описание' }),
            points: relationship({
                ref: 'PossibilitiePoint.possibilitie',
                many: true,
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name'],
                    inlineCreate: { fields: ['name'] },
                    inlineEdit: { fields: ['name'] },
                    inlineConnect: true,
                },
                label: 'Пункты',
            }),
            createdAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Создано' }),
        },
        hooks: {
            async afterOperation({ operation }) {
                if (['create', 'update', 'delete'].includes(operation)) {
                    const url = `${process.env.SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ tags: ['cms:possibilitie'], paths: ['/'] }),
                    }).catch(() => {});
                }
            },
        }
    }),
    Stage: list({
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: {
            label: 'Этапы',
            singular: 'Этап',
            plural: 'Этапы',
            path: 'stages',
            labelField: 'title',
            description: 'Секциия Этапов',
            listView: {
                initialColumns: ['title', 'text', 'createdAt'],
                initialSort: { field: 'createdAt', direction: 'DESC' },
            },
        },
        fields: {
            title: text({ validation: { isRequired: true }, label: 'Заголовок' }),
            text:  text({ validation: { isRequired: true }, label: 'Цель' }),
            happening: relationship({
                ref: 'StagePoint.stage',
                many: true,
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name'],
                    inlineCreate: { fields: ['name'] },
                    inlineEdit: { fields: ['name'] },
                    inlineConnect: true,
                },
                label: 'Что происходит',
            }),
            createdAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Создано' }),
        },
        hooks: {
            async afterOperation({ operation }) {
                if (['create', 'update', 'delete'].includes(operation)) {
                    const url = `${process.env.SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ tags: ['cms:stage'], paths: ['/'] }),
                    }).catch(() => {});
                }
            },
        }
    }),
    Case: list({
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: {
            label: 'Кейсы',
            singular: 'Кейс',
            plural: 'Кейсы',
            path: 'cases',
            labelField: 'title',
            description: 'Наши кейсы',
            listView: {
                initialColumns: ['direction','title', 'text', 'solution', 'effect', 'createdAt'],
                initialSort: { field: 'createdAt', direction: 'DESC' },
            },
        },
        fields: {
            direction: text({ validation: { isRequired: true }, label: 'Направление' }),
            title:  text({ validation: { isRequired: true }, label: 'Заголовок' }),
            text:  text({ validation: { isRequired: true }, label: 'Описание' }),
            solution:  text({label: 'Решение' }),
            effect:  text({label: 'Эффект' }),
            createdAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Создано' }),
        },
        hooks: {
            async afterOperation({ operation }) {
                if (['create', 'update', 'delete'].includes(operation)) {
                    const url = `${process.env.SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ tags: ['cms:case'], paths: ['/'] }),
                    }).catch(() => {});
                }
            },
        }
    }),
    Faq: list({
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: {
            label: 'FAQ',
            singular: 'FAQ',
            plural: 'FAQS',
            path: 'faq',
            labelField: 'question',
            description: 'FAQS',
            listView: {
                initialColumns: ['question','answer', 'createdAt'],
                initialSort: { field: 'createdAt', direction: 'DESC' },
            },
        },
        fields: {
            question:  text({ validation: { isRequired: true }, label: 'Вопрос' }),
            answer:  text({ validation: { isRequired: true }, label: 'Ответ' }),
            createdAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Создано' }),
        },
        hooks: {
            async afterOperation({ operation }) {
                if (['create', 'update', 'delete'].includes(operation)) {
                    const url = `${process.env.SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ tags: ['cms:faq'], paths: ['/'] }),
                    }).catch(() => {});
                }
            },
        }
    }),

    // ========================
    // Раздел: Дополнительные блоки
    // ========================
    PossibilitiePoint: list({
        graphql: { plural: 'possibilitiePoints' },
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: { isHidden: true },
        fields: {
            name: text({ validation: { isRequired: true }, label: 'Название' }),
            possibilitie: relationship({ ref: 'Possibilitie.points' }),
        },
        hooks: {
            async afterOperation({ operation }) {
                if (['create', 'update', 'delete'].includes(operation)) {
                    const url = `${process.env.SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ tags: ['cms:possibilitie'], paths: ['/'] }),
                    }).catch(() => {});
                }
            },
        }
    }),
    StagePoint: list({
        graphql: { plural: 'stagePoints' },
        access: {
            operation: {
                query: allowAll,
                create: ({ session }) => !!session,
                update: ({ session }) => !!session,
                delete: ({ session }) => !!session,
            },
        },
        ui: { isHidden: true },
        fields: {
            name: text({ validation: { isRequired: true }, label: 'Название' }),
            stage: relationship({ ref: 'Stage.happening' }),
        },
        hooks: {
            async afterOperation({ operation }) {
                if (['create', 'update', 'delete'].includes(operation)) {
                    const url = `${process.env.SITE_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ tags: ['cms:stage'], paths: ['/'] }),
                    }).catch(() => {});
                }
            },
        }
    }),
} satisfies Lists
