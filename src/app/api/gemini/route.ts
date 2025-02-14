import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Get the request body
    const { prompt } = body; // Extract text
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(geminiApiKey as string);
    const neuraTalk = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const fullPrompt = ` ${prompt}`;
    const result = await neuraTalk.generateContent(fullPrompt);

    if (!geminiApiKey) {
      return new Response(JSON.stringify({ error: "API key is missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: `${result.response.text()}` }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
