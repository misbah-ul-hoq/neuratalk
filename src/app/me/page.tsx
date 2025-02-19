"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";

import FullScreenSpinner from "@/components/shared/FullScreenSpinner";
import { useGetUserInfoMutation } from "@/redux/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import { redirect } from "next/navigation";

interface User {
  name: string;
  email: string;
  photoUrl: string;
  createdAt: string;
}
const ProfilePage = () => {
  const [getUserInfo] = useGetUserInfoMutation();
  const [user, setUser] = useState<User | null>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      getUserInfo({ authToken }).then((res) => {
        console.log(res);
        dispatch(
          loginSuccess({
            user: res?.data,
            isAuthenticated: true,
            loading: false,
            authToken: "",
          }),
        );
        if (res.error) {
          console.log(res);
        } else {
          setUser(res.data);
        }
      });
    } else if (!authToken) {
      redirect("/login");
    }
  }, [getUserInfo, dispatch]);

  if (!user) return <FullScreenSpinner />;

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-base-200 p-6 text-center shadow-lg">
        <div className="mx-auto h-24 w-24 rounded-full border-4 border-gray-200">
          <Image
            src={`${user?.photoUrl || "/user.jpg"}`}
            alt="User Avatar"
            height={200}
            width={200}
            className="h-full !w-full rounded-full"
          />
        </div>
        <div className="space-y-2">
          <h2 className="mt-4 text-lg font-semibold">
            Hi, {user?.name}, Welcome to NeuraTalk
          </h2>
          <p className="">
            <strong>Email: </strong>
            {user?.email}
          </p>
          <p className="">
            <strong> Signup Date:</strong>{" "}
            {moment(user?.createdAt).format("Do MMMM YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
