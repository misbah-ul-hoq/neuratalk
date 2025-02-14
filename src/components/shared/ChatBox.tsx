"use client";
import React from "react";
import { LuSendHorizontal } from "react-icons/lu";

const PromptBox = () => {
  return (
    <div className="relative">
      <textarea
        placeholder="Message NeuraTalk"
        className="textarea textarea-bordered !w-full h-[80px] max-h-[600px] text-lg placeholder:opacity-70"
      />
      <LuSendHorizontal className="absolute right-2 bottom-4" size={30} />
    </div>
  );
};

export default PromptBox;
