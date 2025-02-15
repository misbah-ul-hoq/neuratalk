import Link from "next/link";
import React from "react";

const WelcomePage = () => {
  return (
    <div className="">
      <h2 className="text-center font-bold text-3xl lg:text-5xl mb-10 lg:mb-14">
        Welcome to Neuratalk
      </h2>

      <div>
        <div className="flex gap-5 items-center justify-center">
          <button className="btn btn-neutral btn-outline w-28 rounded-full">
            Log In
          </button>
          <Link href={"/signup"} className="btn btn-neutral w-28 rounded-full ">
            Sign Up
          </Link>
        </div>
      </div>

      <span className="divider my-7">or</span>

      <div className="space-y-2 flex flex-col items-center">
        <Link
          href={`/temp-chat`}
          className="btn btn-neutral rounded-full btn-wide"
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
