import { NextRequest, NextResponse } from "next/server";
import { gql, request } from "graphql-request";

export const runtime = "nodejs";

const ENDPOINT = process.env.KEYSTONE_GRAPHQL_URL ?? "http://localhost:4000/admin/api/graphql";
const KEYSTONE_TOKEN = process.env.KEYSTONE_API_TOKEN;

const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

type Body = {
    name: string;
    phone: string;
    question?: string | null;
    disableNotification?: boolean;
};

const CREATE_CLIENT = gql`
  mutation CreateClient($name: String!, $phone: String!, $question: String) {
    createClient(data: { name: $name, phone: $phone, question: $question }) {
      id
      name
      phone
      question
    }
  }
`;

function htmlEscape(s: string) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function buildTelegramMessage(p: { name: string; phone: string; question?: string | null }) {
    const name = htmlEscape(p.name);
    const phone = htmlEscape(p.phone);
    const q = p.question ? htmlEscape(p.question) : null;

    const lines = [
        "📩 <b>Новая заявка</b>\n",
        `👤 <b>Имя:</b> ${name}`,
        `📞 <b>Телефон:</b> ${phone}`,
        q ? `💬 <b>Вопрос:</b>\n${q}` : null,
    ]
        .filter(Boolean)

    const text = lines.join("\n");
    return text.length > 4096 ? text.slice(0, 4093) + "..." : text;
}

async function sendTelegram(params: { text: string; disableNotification?: boolean }) {
    const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: TG_CHAT_ID,
            text: params.text,
            parse_mode: "HTML",
            disable_notification: params.disableNotification ?? false,
        }),
    });
    const data = await res.json();
    return { httpOk: res.ok, apiOk: data?.ok === true, data };
}

export async function POST(req: NextRequest) {
    try {
        const { name, phone, question, disableNotification }: Body = await req.json();
        if (!name || !phone) {
            return NextResponse.json({ error: "name and phone are required" }, { status: 400 });
        }

        const headers = KEYSTONE_TOKEN ? { Authorization: `Bearer ${KEYSTONE_TOKEN}` } : undefined;

        const keystoneResp: any = await request({
            url: ENDPOINT,
            document: CREATE_CLIENT,
            variables: { name, phone, question: question ?? null },
            requestHeaders: headers,
        });

        const text = buildTelegramMessage({ name, phone, question });
        const tg = await sendTelegram({ text, disableNotification });

        if (!tg.httpOk || !tg.apiOk) {
            return NextResponse.json(
                {
                    client: keystoneResp.createClient,
                    telegram: { ok: false, error: tg.data?.description ?? "Telegram API error" },
                },
                { status: 207 }
            );
        }

        return NextResponse.json({
            client: keystoneResp.createClient,
            telegram: { ok: true, messageId: tg.data.result?.message_id },
        });
    } catch (err: any) {
        return NextResponse.json({ error: err?.message ?? "Internal error" }, { status: 500 });
    }
}
