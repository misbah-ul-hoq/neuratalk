import { RootState } from "@/redux/store";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ThemeChanger from "./ThemeChanger";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);
  const { data: session } = useSession();

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // const handeLogout = () => {
  //   Swal.fire({
  //     title: "Are you sure you want to logout?",
  //     text: `Logout of Neuratalk as ${user?.email}`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Logout!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(logout());
  //       redirect("/temp-chat");
  //     }
  //   });
  // };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-10" ref={dropdownRef}>
      {/* Profile Picture */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <Image
          src={`${session?.user?.image || "/user.jpg"}`} // Replace with your profile picture URL
          alt="Profile"
          className="h-10 w-10 rounded-full"
          height={10}
          width={10}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 space-y-3 rounded-md bg-base-100 p-3 shadow-lg">
          <div className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-base-200">
            <span>Switch Theme</span>
            <ThemeChanger />
          </div>

          <button
            onClick={() => {
              signOut();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-black bg-base-100 px-4 py-1 transition-all duration-200 dark:border-white"
          >
            <FiLogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
