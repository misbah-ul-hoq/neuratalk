"use client";

import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropDown";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const pathName = usePathname();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, [isAuthenticated]);

  if (
    pathName.includes("login") ||
    pathName.includes("signup") ||
    status === "loading" ||
    status === "unauthenticated"
  ) {
    return null;
  }

  return (
    <header className={`sticky top-0 z-10 flex h-16 items-center bg-base-200`}>
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

        {status !== "authenticated" && (
          <div className="">
            <Link href={`/login`} className="btn btn-neutral w-24 rounded-full">
              Log In
            </Link>
          </div>
        )}

        {status === "authenticated" && <ProfileDropdown />}
      </nav>
    </header>
  );
};

export default NavBar;
