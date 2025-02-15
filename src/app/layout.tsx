import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neuratalk - AI Chatbot & Virtual Assistant for Smart Conversations",
  description:
    "Neuratalk is an advanced AI-powered chatbot designed to assist with conversations, answer queries, and enhance productivity with intelligent responses.",
  keywords:
    "AI chatbot, virtual assistant, Neuratalk, smart AI chat, AI-powered assistant, conversational AI",
  robots: "index, follow",
  openGraph: {
    title: "Neuratalk - AI Chatbot & Virtual Assistant",
    description:
      "Experience seamless AI-powered conversations with Neuratalk, your intelligent virtual assistant for instant responses and productivity enhancement.",
    url: "https://neuratalk-one.vercel.app/", // Replace with your actual URL
    type: "website",
    // images: [
    //   {
    //     url: "https://yourwebsite.com/og-image.jpg", // Replace with an actual image URL
    //     width: 1200,
    //     height: 630,
    //     alt: "Neuratalk AI Chatbot",
    //   },
    // ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@yourtwitterhandle", // Replace with your actual Twitter handle
  //   title: "Neuratalk - AI Chatbot & Virtual Assistant",
  //   description:
  //     "Smart AI chatbot for effortless conversations and instant assistance. Try Neuratalk today!",
  //   images: ["https://yourwebsite.com/og-image.jpg"], // Replace with an actual image URL
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:text-[#ededed] text-paragraph`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
