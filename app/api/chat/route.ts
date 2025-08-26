import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const systemPrompt = 'You are a helpful and informative AI assistant. You will provide summaries of factual topics or create stories. You will answer questions in a comprehensive and informative way. You will use a conversational style that is clear, concise, and easy to understand. Please avoid using any offensive language or making harmful statements. Remember to stay on topic and provide relevant information.'

export async function POST(req: NextRequest): Promise<NextResponse> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const data: ChatMessage[] = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const userMessages = data.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : msg.role,
        parts: [{ text: msg.content }]
    }));
    const chat = model.startChat({
        history: [
            { role: "user", parts: [{ text: systemPrompt }] },
            ...userMessages
        ]
    });
    const result = await chat.sendMessage(userMessages[userMessages.length - 1].parts[0].text);
    const responseText = result.response.text();
    return new NextResponse(responseText);
}
