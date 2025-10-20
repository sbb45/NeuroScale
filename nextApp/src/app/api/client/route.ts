import { gql, request } from 'graphql-request';
import {NextRequest, NextResponse} from "next/server";

const ENDPOINT = process.env.KEYSTONE_GRAPHQL_URL ?? 'http://localhost:4000/admin/api/graphql';

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, question, contactMethod } = await req.json();
        const method = ['call', 'telegram', 'vk', 'whatsapp'].includes(contactMethod)
            ? contactMethod
            : 'call';

        const mutation = gql`
         mutation CreateClient(
            $name: String!
            $phone: String!
            $question: String
            $contactMethod: ClientContactMethodType
          ) {
            createClient(
              data: { name: $name, phone: $phone, question: $question, contactMethod: $contactMethod}
            ) {
              id
              name
              phone
              question
              contactMethod
            }
          }
        `;

        const headers = process.env.KEYSTONE_API_TOKEN
            ? { Authorization: `Bearer ${process.env.KEYSTONE_API_TOKEN}` }
            : undefined;

        const data: any = await request({
            url: ENDPOINT,
            document: mutation,
            variables: { name, phone, question, contactMethod: method },
            requestHeaders: headers,
        });
        console.log(data);
        return NextResponse.json({client: data.createClient })
    }catch (err: any){
        return NextResponse.json(
            {error: err.message || 'Something went wrong'},
            {status: 500}
        )
    }
}
