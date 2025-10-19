import { NextRequest } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
        return new Response('Unauthorized', { status: 401 });
    }

    const { tags = [], paths = [] } = await req.json().catch(() => ({ }));

    for (const t of tags) revalidateTag(t);
    for (const p of paths) revalidatePath(p);

    return Response.json({ ok: true, tags, paths });
}
