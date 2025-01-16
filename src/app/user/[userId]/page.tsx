"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { House } from "lucide-react";
import { UserRoundSearch } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";

type userType = {
  _id: string;
  userId: {
    username: string;
    profile: string;
    postImage: string;
  };
};
type tokentype = {
  userId: string;
  username: string;
};

const Page = () => {
  const [user, setUser] = useState<userType | null>(null);
  const token = localStorage.getItem("token");
  const decodedToken: tokentype = jwtDecode(token ?? "");
  const userId = decodedToken.userId;
  const router = useRouter();
  const redirectToHome = () => {
    router.push(`/post`);
  };
  const redirectToCreatePost = () => {
    router.push(`/upload`);
  };
  const redirectToUser = () => {
    router.push(`/user/${userId}`);
  };
  const getProfile = async () => {
    const response = await fetch(
      `https://instagram-3ryv.onrender.com/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    setUser(res);
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="text-white bg-black h-screen ">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>{user?.userId.username}</div>
      <img className="w-[200px] h-[150px]" src={user?.userId.postImage} />
      <div className="bg-black bottom-px fixed w-screen h-[40px] text-white flex between justify-between">
        <House onClick={redirectToHome} className="h-[40px]" />
        <SquarePlus
          className="h-[40px]"
          onClick={() => redirectToCreatePost()}
        />
        <UserRoundSearch
          className="h-[40px]"
          onClick={() => redirectToUser()}
        />
      </div>
    </div>
  );
};

export default Page;
