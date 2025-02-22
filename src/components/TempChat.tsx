"use client";
import Image from "next/image";
import React, { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
// import { marked } from "marked";
// import Markdown from "react-markdown";
import MarkdownRenderer from "./MarkdownRenderer";
import { useTempChatMutation } from "@/redux/features/chats/chatApiSlice";

interface Chats {
  prompt: string;
  title: string;
  response: string;
}
const TempChat = () => {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState<Chats[] | null>(null);
  const [addTempChatPrompt, { isLoading }] = useTempChatMutation();

  const sendPrompt = async () => {
    setChats(
      chats
        ? [...chats, { prompt, response: "", title: "" }]
        : [{ prompt, response: "", title: "" }],
    );

    try {
      addTempChatPrompt({ prompt }).then((res) => {
        if (res.data)
          setChats(
            chats
              ? [
                  ...chats,
                  {
                    prompt,
                    response: res.data.response,
                    title: res.data.title,
                  },
                ]
              : [
                  {
                    prompt,
                    response: res.data.response,
                    title: res.data.title,
                  },
                ],
          );
      });
    } catch (error) {
      console.error("Error fetching secret key:", error);
    } finally {
      setPrompt("");
    }
  };

  return (
    <section className="relative h-[calc(100dvh-4rem)] overflow-hidden">
      <div className="flex flex-col justify-stretch pt-3">
        <div className="max-h-[calc(100dvh-158px)] overflow-y-auto lg:max-h-[76vh]">
          <div className="container-center mx-auto mb-3 w-full !max-w-4xl grow">
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
                      <div className="avatar chat-image">
                        <div className="w-9 rounded-full lg:w-10">
                          <Image
                            src={`/neuratalk-logo.png`}
                            alt="NeuraTalk Logo"
                            height={30}
                            width={30}
                            className="w-10 lg:h-10"
                          />
                        </div>
                      </div>
                      <div className="chat-bubble bg-base-300 text-base-content">
                        {index === chats.length - 1 && isLoading ? (
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
          <form className="container-center absolute bottom-1 z-[1] mx-auto !max-w-xl lg:bottom-2">
            <textarea
              placeholder={"Message NeuraTalk"}
              className={`textarea textarea-bordered !w-full pr-16 ${"h-[80px]"} text-lg placeholder:opacity-70`}
              onChange={(e) => {
                const value = e.target.value;
                setPrompt(value);
              }}
              value={prompt}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendPrompt();
                }
              }}
            />
            <button
              className="btn btn-circle btn-sm absolute bottom-4 right-[5px] z-0 border-none !bg-base-100 shadow-none lg:btn-md"
              disabled={isLoading || prompt.length < 1}
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
