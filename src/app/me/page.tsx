import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "A passionate developer who loves to build amazing applications.",
    avatar: "https://via.placeholder.com/150",
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg">
        <div className="mx-auto h-24 w-24 rounded-full border-4 border-gray-200">
          <Image
            src={`/user.jpg`}
            alt="User Avatar"
            height={200}
            width={200}
            className="h-full !w-full rounded-full"
          />
        </div>
        <div className="space-y-2">
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            Hi {user.name}, Welcome to NeuraTalk
          </h2>
          <p className="">{user.email}</p>
          <p className="">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
