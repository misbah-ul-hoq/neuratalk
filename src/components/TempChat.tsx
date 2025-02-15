"use client";
import Image from "next/image";
import React, { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
// import { marked } from "marked";
// import Markdown from "react-markdown";
import MarkdownRenderer from "./MarkdownRenderer";
import { devInfo } from "../../public/data/devInfo";

interface Chats {
  prompt: string;
  title: string;
  response: string;
}
const TempChat = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<Chats[] | null>(null);

  const sendPrompt = async () => {
    setLoading(true);
    setChats(
      chats
        ? [...chats, { prompt, response: "", title: "" }]
        : [{ prompt, response: "", title: "" }]
    );
    const fullPrompt = `${devInfo} ${prompt}`;
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullPrompt, prompt }),
      });
      const data = await res.json();
      console.log(data);

      if (data)
        setChats(
          chats
            ? [...chats, { prompt, response: data.message, title: data.title }]
            : [{ prompt, response: data.message, title: data.title }]
        );
    } catch (error) {
      console.error("Error fetching secret key:", error);
    } finally {
      setPrompt("");
      setLoading(false);
    }
  };

  return (
    <section className="relative h-[calc(100dvh-4rem)] overflow-hidden">
      <div className="flex flex-col justify-stretch pt-3">
        <div className="max-h-[calc(100dvh-158px)] lg:max-h-[76vh] overflow-y-auto">
          <div className="grow container-center w-full mb-3 !max-w-4xl mx-auto">
            {chats &&
              chats?.map((chat, index) => {
                return (
                  <div key={index}>
                    <div className="chat chat-end">
                      <div className="chat-bubble bg-base-300 text-base-content">
                        {chat.prompt}
                      </div>
                    </div>
                    <div className="chat chat-start">
                      <div className="chat-image avatar">
                        <div className="w-9 lg:w-10 rounded-full">
                          <Image
                            src={`/neuratalk-logo.png`}
                            alt="NeuraTalk Logo"
                            height={30}
                            width={30}
                            className="lg:h-10 w-10"
                          />
                        </div>
                      </div>
                      <div className="chat-bubble bg-base-300 text-base-content">
                        {index === chats.length - 1 && loading ? (
                          <span className="loading loading-dots loading-md"></span>
                        ) : (
                          // <p
                          //   dangerouslySetInnerHTML={{
                          //     __html: marked.parse(chat.response),
                          //   }}
                          // ></p>
                          // <Markdown>{chat.response}</Markdown>
                          <MarkdownRenderer
                            content={chat.response}
                          ></MarkdownRenderer>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex justify-center">
          <form className="absolute bottom-1 lg:bottom-2 z-[1] container-center !max-w-xl mx-auto">
            <textarea
              placeholder={"Message NeuraTalk"}
              className={`textarea textarea-bordered pr-16 !w-full ${"h-[80px]"} text-lg placeholder:opacity-70`}
              onChange={(e) => {
                const value = e.target.value;
                setPrompt(value);
              }}
              value={prompt}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendPrompt();
                }
              }}
            />
            <button
              className="btn btn-sm lg:btn-md absolute right-[5px] bottom-4 !bg-base-100 shadow-none border-none z-0 btn-circle"
              disabled={loading || prompt.length < 1}
              type="submit"
            >
              <LuSendHorizontal className="" size={30} onClick={sendPrompt} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TempChat;
