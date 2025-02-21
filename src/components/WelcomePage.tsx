"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const WelcomePage = () => {
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    console.log(authToken);
    if (!authToken) {
      redirect("/temp-chat");
    } else {
      redirect("/chat");
    }
  }, []);
  return (
    <div className="">
      <h2 className="mb-10 text-center text-3xl font-bold lg:mb-14 lg:text-5xl">
        Welcome to Neuratalk
      </h2>

      <div>
        <div className="flex items-center justify-center gap-5">
          <Link
            href={`/login`}
            className="btn btn-outline btn-neutral w-28 rounded-full"
          >
            Log In
          </Link>
          <Link href={"/signup"} className="btn btn-neutral w-28 rounded-full">
            Sign Up
          </Link>
        </div>
      </div>

      <span className="divider my-7">or</span>

      <div className="flex flex-col items-center space-y-2">
        <Link
          href={`/temp-chat`}
          className="btn btn-outline btn-neutral btn-wide rounded-full"
        >
          Continue Without Login
        </Link>
        <p className="text-center text-sm">
          Your chat history won&apos;t be saved if you continue without login.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
