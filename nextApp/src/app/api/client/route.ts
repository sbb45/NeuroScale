import { gql, request } from 'graphql-request';
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, question } = await req.json();

        const mutation = gql`
         mutation CreateClient(
            $name: String!
            $email: String!
            $phone: String!
            $question: String
          ) {
            createClient(
              data: { name: $name, email: $email, phone: $phone, question: $question}
            ) {
              id
              name
              email
              phone
              question
            }
          }
        `;

        const endpoint = 'http://localhost:4000/admin/api/graphql'
        const data: any = await request(endpoint, mutation, {name,email, phone, question});
        return NextResponse.json({client: data.createClient })
    }catch (err: any){
        return NextResponse.json(
            {error: err.message || 'Something went wrong'},
            {status: 500}
        )
    }
}