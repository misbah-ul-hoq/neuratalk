"use client";

import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropDown";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  console.log(isAuthenticated, user);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const pathName = usePathname();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, [isAuthenticated]);

  if (pathName.includes("login") || pathName.includes("signup")) {
    return null;
  }

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

        {!isLoggedIn && (
          <div className="">
            <Link href={`/login`} className="btn btn-neutral w-24 rounded-full">
              Log In
            </Link>
          </div>
        )}

        {isLoggedIn && <ProfileDropdown />}
      </nav>
    </header>
  );
};

export default NavBar;
