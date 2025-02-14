"use client";
import React, { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";

interface Chats {
  prompt: string;
  response: string;
}
const TempChat = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<Chats[] | null>(null);

  const sendPrompt = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      if (data)
        setChats(
          chats
            ? [...chats, { prompt, response: data.message }]
            : [{ prompt, response: data.message }]
        );
    } catch (error) {
      console.error("Error fetching secret key:", error);
    } finally {
      setPrompt("");
      setLoading(false);
    }
  };

  return (
    <section className="relative h-[calc(100dvh-4rem)] container-center">
      <div className="flex flex-col">
        <div className="grow mb-3 overflow-y-auto">
          <p>{chats && chats[0]?.response}</p>
        </div>

        <div className="flex justify-center">
          <div className="absolute bottom-5 z-[1] w-full max-w-xl mx-auto">
            <textarea
              placeholder="Message NeuraTalk"
              className={`textarea textarea-bordered pr-16 !w-full ${
                prompt.length < 140 ? "h-[80px]" : "h-[120px]"
              } text-lg placeholder:opacity-70`}
              onChange={(e) => {
                const value = e.target.value;
                setPrompt(value);
              }}
              value={prompt}
            />
            <button
              className="btn btn-sm lg:btn-md absolute right-[5px] bottom-4 !bg-base-100 shadow-none border-none z-0 btn-circle"
              disabled={loading || prompt.length < 1}
            >
              <LuSendHorizontal className="" size={30} onClick={sendPrompt} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TempChat;
