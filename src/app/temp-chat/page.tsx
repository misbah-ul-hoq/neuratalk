import PromptBox from "@/components/shared/ChatBox";
import React from "react";

const TemporaryChatPage = () => {
  return (
    <section className="relative h-[calc(100dvh-4rem)] container-center">
      <div className="flex justify-center">
        <div className="absolute bottom-5 w-full max-w-xl mx-auto">
          <PromptBox />
        </div>
      </div>
    </section>
  );
};

export default TemporaryChatPage;
