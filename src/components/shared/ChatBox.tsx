"use client";
import React, { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";

interface Chats {
  prompt: string;
  response: string;
}
const PromptBox = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [chats, setChats] = useState<Chats[] | null>(null);

  const sendPrompt = async () => {
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
    }
  };

  return (
    <div className="relative flex flex-col">
      <div className="grow mb-3 overflow-y-auto">
        <p>{response}</p>
      </div>
      <textarea
        placeholder="Message NeuraTalk"
        className="textarea textarea-bordered !w-full h-[80px] max-h-[600px] text-lg placeholder:opacity-70"
        onChange={(e) => {
          const value = e.target.value;
          setPrompt(value);
        }}
      />
      <LuSendHorizontal
        className="absolute right-2 bottom-4"
        size={30}
        onClick={sendPrompt}
      />
    </div>
  );
};

export default PromptBox;
