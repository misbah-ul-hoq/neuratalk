"use client";
import React from "react";

const ChatPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid gap-5 overflow-hidden lg:grid-cols-12">
      <aside
        className={`lg:col-span- fixed left-0 top-16 h-screen w-[250px] -translate-x-full overflow-y-auto bg-base-200 lg:translate-x-0`}
      >
        somecontent
      </aside>
      <div className="ml-[250px] overflow-y-auto lg:col-span-9">{children}</div>
    </div>
  );
};

export default ChatPageLayout;
