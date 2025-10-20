import React from 'react';

type DocumentNode = {
    type?: string;
    text?: string;
    id?: string;
    href?: string;
    relationship?: any;
    layout?: any;
    level?: number;
    children?: DocumentNode[];
    [key: string]: any;
};

type RichTextRendererProps = {
    value: { document?: DocumentNode[] } | null | undefined;
};

function renderText(node: DocumentNode, key: React.Key) {
    let content: React.ReactNode = node.text ?? '';
    if (!content) return null;

    if (node.bold) {
        content = <strong key={`${key}-bold`}>{content}</strong>;
    }
    if (node.italic) {
        content = <em key={`${key}-italic`}>{content}</em>;
    }
    if (node.underline) {
        content = (
            <span key={`${key}-underline`} className="underline">
                {content}
            </span>
        );
    }
    if (node.strikethrough) {
        content = (
            <span key={`${key}-strikethrough`} className="line-through">
                {content}
            </span>
        );
    }
    if (node.code) {
        content = (
            <code key={`${key}-code`} className="rounded bg-black/10 px-1 py-0.5 text-sm">
                {content}
            </code>
        );
    }

    return <React.Fragment key={key}>{content}</React.Fragment>;
}

function renderChildren(nodes: DocumentNode[] | undefined) {
    if (!nodes) return null;
    return nodes.map((node, index) => renderNode(node, index));
}

function renderNode(node: DocumentNode, index: number): React.ReactNode {
    if (!node) return null;

    if (node.text !== undefined) {
        return renderText(node, index);
    }

    const key = node.id ?? index;
    switch (node.type) {
        case 'paragraph':
            return (
                <p key={key} className="leading-relaxed text-white/80 md:text-lg">
                    {renderChildren(node.children)}
                </p>
            );
        case 'heading': {
            const level = node.level ?? 2;
            const Tag = (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)[Math.min(Math.max(level, 1), 6) - 1];
            const headingClasses =
                level === 2
                    ? 'text-2xl font-semibold text-white md:text-3xl'
                    : level === 3
                        ? 'text-xl font-semibold text-white md:text-2xl'
                        : 'text-lg font-semibold text-white/90 md:text-xl';
            return (
                <Tag key={key} className={`${headingClasses} mt-8 first:mt-0`}>
                    {renderChildren(node.children)}
                </Tag>
            );
        }
        case 'blockquote':
            return (
                <blockquote
                    key={key}
                    className="border-l-4 border-white/20 pl-6 italic text-white/80"
                >
                    {renderChildren(node.children)}
                </blockquote>
            );
        case 'unordered-list':
            return (
                <ul key={key} className="list-disc space-y-2 pl-6 text-white/80 md:text-lg">
                    {renderChildren(node.children)}
                </ul>
            );
        case 'ordered-list':
            return (
                <ol key={key} className="list-decimal space-y-2 pl-6 text-white/80 md:text-lg">
                    {renderChildren(node.children)}
                </ol>
            );
        case 'list-item':
            return <li key={key}>{renderChildren(node.children)}</li>;
        case 'link':
            return (
                <a
                    key={key}
                    href={node.href}
                    target={node.openInNewTab ? '_blank' : undefined}
                    rel={node.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="text-blue-200 underline decoration-dotted underline-offset-4 hover:text-blue-100"
                >
                    {renderChildren(node.children)}
                </a>
            );
        case 'code':
            return (
                <pre
                    key={key}
                    className="overflow-x-auto rounded-2xl bg-black/40 p-4 text-sm leading-6 text-white/90"
                >
                    <code>{renderChildren(node.children)}</code>
                </pre>
            );
        case 'divider':
            return <hr key={key} className="my-8 border-white/10" />;
        case 'layout':
            return (
                <div key={key} className="grid gap-6 md:grid-cols-2">
                    {renderChildren(node.children)}
                </div>
            );
        default:
            return (
                <div key={key} className="space-y-4">
                    {renderChildren(node.children)}
                </div>
            );
    }
}

export default function RichTextRenderer({ value }: RichTextRendererProps) {
    if (!value?.document || !Array.isArray(value.document) || !value.document.length) {
        return null;
    }

    return <div className="space-y-6">{renderChildren(value.document)}</div>;
}
