"use client";
import React, { useEffect, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";

const PromptBox = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  useEffect(() => {
    const fetchSecretKey = async () => {
      try {
        const res = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "How are you doing?" }),
        });
        const data = await res.json();
        console.log(data); // Response from API
        setResponse(data.message);
      } catch (error) {
        console.error("Error fetching secret key:", error);
      }
    };

    fetchSecretKey();
  }, []);
  return (
    <div className="relative flex flex-col">
      <div className="grow mb-3 overflow-y-auto">
        <p>{response}</p>
      </div>
      <textarea
        placeholder="Message NeuraTalk"
        className="textarea textarea-bordered !w-full h-[80px] max-h-[600px] text-lg placeholder:opacity-70"
      />
      <LuSendHorizontal className="absolute right-2 bottom-4" size={30} />
    </div>
  );
};

export default PromptBox;
