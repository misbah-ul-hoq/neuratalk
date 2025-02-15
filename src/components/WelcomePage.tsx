import Link from "next/link";
import React from "react";

const WelcomePage = () => {
  return (
    <div className="">
      <h2 className="mb-10 text-center text-3xl font-bold lg:mb-14 lg:text-5xl">
        Welcome to Neuratalk
      </h2>

      <div>
        <div className="flex items-center justify-center gap-5">
          <button className="btn btn-outline btn-neutral w-28 rounded-full">
            Log In
          </button>
          <Link href={"/signup"} className="btn btn-neutral w-28 rounded-full">
            Sign Up
          </Link>
        </div>
      </div>

      <span className="divider my-7">or</span>

      <div className="flex flex-col items-center space-y-2">
        <Link
          href={`/temp-chat`}
          className="btn btn-neutral btn-wide rounded-full"
        >
          Continue Without Login
        </Link>
        <p className="text-center">
          Your chat history won&apos;t be saved if you continue without login
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
