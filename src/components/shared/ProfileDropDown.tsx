import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeChanger from "./ThemeChanger";
import { logout } from "@/redux/features/auth/authSlice";
import Swal from "sweetalert2";

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  console.log(user);

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handeLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: `Logout of Neuratalk as ${user?.email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
      }
    });
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Picture */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <Image
          src={`${user?.photoUrl || "/user.jpg"}`} // Replace with your profile picture URL
          alt="Profile"
          className="h-10 w-10 rounded-full"
          height={10}
          width={10}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-base-100 py-1 shadow-lg">
          <Link
            href="/me"
            className="block px-4 py-2 text-sm hover:bg-base-200"
          >
            Profile
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-base-200">
            <span>Switch Theme</span>
            <ThemeChanger />
          </div>
          <button
            onClick={handeLogout}
            className="block px-4 py-2 text-sm hover:bg-base-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
