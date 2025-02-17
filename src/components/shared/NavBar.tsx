"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const NavBar = () => {
  const [theme, setTheme] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      }
    }
  }, []);
  return (
    <header className={`sticky top-0 flex h-16 items-center bg-base-200`}>
      <nav className="container-center flex items-center justify-between">
        <Link
          href={`/`}
          className="flex cursor-pointer items-center gap-1 font-mono"
        >
          <Image
            src={`/neuratalk-logo.png`}
            alt="NeuraTalk Logo"
            height={50}
            width={50}
            className="text-white"
          />
          NeuraTalk
        </Link>

        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            value="dark"
            className="theme-controller toggle col-span-2 col-start-1 row-start-1 bg-base-content"
            checked={theme === "dark"}
            onChange={(e) => {
              setTheme(e.target.checked ? "dark" : "light");
              localStorage.setItem(
                "theme",
                e.target.checked ? "dark" : "light",
              );
              document.documentElement.setAttribute(
                "data-theme",
                e.target.checked ? "dark" : "light",
              );
            }}
          />
          <svg
            className="col-start-1 row-start-1 fill-base-100 stroke-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="col-start-2 row-start-1 fill-base-100 stroke-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        {/* <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="dark"
            className="theme-controller toggle"
            checked={theme === "dark"}
            onChange={(e) => {
              setTheme(e.target.checked ? "dark" : "light");
              localStorage.setItem(
                "theme",
                e.target.checked ? "dark" : "light",
              );
              document.documentElement.setAttribute(
                "data-theme",
                e.target.checked ? "dark" : "light",
              );
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label> */}
      </nav>
    </header>
  );
};

export default NavBar;
