import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = 'You are a helpful and informative AI assistant. You will provide summaries of factual topics or create stories. You will answer questions in a comprehensive and informative way. You will use a conversational style that is clear, concise, and easy to understand. Please avoid using any offensive language or making harmful statements. Remember to stay on topic and provide relevant information.'

export async function POST(req){
    const openai = new OpenAI()
    const data = await req.json()
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role:"system", 
                content:systemPrompt,
            },
        ...data,
        ],
        model: "gpt-4o-mini",
        stream: true,

    })
    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try {
                for await(const chunk of completion){
                    const content = chunk.choices[0].delta.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch(error) {
                encoder.error(err)
            } finally {
                encoder.close()    
            }
        }
    })
    return new NextResponse(stream)
}
