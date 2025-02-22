// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json(); // Get the request body
//     const { prompt, fullPrompt } = body; // Extract text
//     const geminiApiKey = process.env.GEMINI_API_KEY;
//     const genAI = new GoogleGenerativeAI(geminiApiKey as string);
//     const neuraTalk = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
//     const result = await neuraTalk.generateContent(fullPrompt);
//     const title = await generateTitle(
//       prompt,
//       result.response.text(),
//       geminiApiKey as string,
//     );

//     if (!geminiApiKey) {
//       return new Response(JSON.stringify({ error: "API key is missing" }), {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     return new Response(
//       JSON.stringify({
//         message: `${result.response.text()}`,
//         // title: getHtmlFromMarkdown(title),
//         title,
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       },
//     );
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Invalid request" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// async function generateTitle(
//   prompt: string,
//   response: string,
//   geminiApiKey: string,
// ) {
//   const genAI = new GoogleGenerativeAI(geminiApiKey);
//   const neuraTalk = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
//   const result = await neuraTalk.generateContent(`

//     Your job is to create a title based on the follwoing question and answer.
//     Question: ${prompt}
//     Answer: ${response}
//     Just create a title based on the question and answer. Nothing else. Send the response in pure text. Do not use markdown.
//     `);

//   const title = result.response.text();
//   return title;
// }
