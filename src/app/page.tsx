"use client";
import LoginPage from "@/components/LoginPage";
import { useSession } from "next-auth/react";
import TempChat from "./chat/page";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session, status);
  if (status === "loading") return null;
  if (status === "unauthenticated") return <LoginPage />;
  if (status === "authenticated")
    return (
      <main
      // className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-6 sm:p-10 lg:p-24"
      >
        <TempChat />
      </main>
    );
}
