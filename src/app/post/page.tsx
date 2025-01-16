"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Bookmark } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { House } from "lucide-react";
import { UserRoundSearch } from "lucide-react";
import { SquarePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type postType = {
  _id: string;
  userId: {
    profileImage: string;
    username: string;
  };
  description: string;
  postImage: string;
  likes: string[];
};
type tokentype = {
  userId: string;
  username: string;
};

const Page = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<postType[]>([]);
  const [open, setOpen] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<number>(0);
  const getPosts = async () => {
    const jsonData = await fetch("https://instagram-3ryv.onrender.com/posts", {
      method: "GET",
    });
    const response = await jsonData.json();
    console.log(response);
    setPosts(response);
  };
  const token = localStorage.getItem("token");
  const decodedToken: tokentype = jwtDecode(token ?? "");
  console.log(decodedToken);
  const userId = decodedToken.userId;
  useEffect(() => {
    getPosts();
  }, []);

  const redirectToComments = (postId: string) => {
    router.push(`post/comment/${postId}`);
  };
  const redirectToCreatePost = () => {
    router.push(`/upload`);
  };
  const redirectToUser = () => {
    router.push(`/user/${userId}`);
  };

  const handleLike = async (postId: string, likes: string[]) => {
    const isUserLiked = likes.includes(userId);
    const userLike = async () => {
      await fetch(`https://instagram-3ryv.onrender.com/post/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: postId, userId: userId }),
      });
      console.log("true");
    };
    const userUnLike = async () => {
      await fetch(`https://instagram-3ryv.onrender.com/post/unlike `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: postId, userId: userId }),
      });
    };
    if (isUserLiked === true) {
      userUnLike();
    } else {
      userLike();
    }
  };

  if (loading === true) {
    return (
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
  }
  return (
    <div>
      {posts?.map((post) => {
        return (
          <div key={post._id}>
            <Card className="bg-black text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />{" "}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div onClick={redirectToUser} className="text-white">
                    {post.userId?.username}
                  </div>
                </CardTitle>
                <img className="w-[500px] h-[350px]" src={post.postImage} />
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <div className="flex justify-between">
                <div className="flex">
                  <Heart
                    onClick={() => handleLike(post._id, post.likes)}
                    // color={isLike ? "white" : "red"}
                    // fill={isLike ? "black" : "red"}
                  />
                  <MessageCircle />
                  <Send />
                </div>
                <Bookmark />
              </div>
              <Dialog>
                <DialogTrigger>{post.likes.length} likes</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Liked Peoples</DialogTitle>
                    <DialogDescription>{post._id}</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <div>{post.description}</div>
              <div
                onClick={() => redirectToComments(post._id)}
                className="text-blue-700"
              >
                view all comments
              </div>
            </Card>
            <div className="bg-black bottom-0 fixed w-screen h-[40px] text-white flex between justify-between">
              <House className="h-[40px]" />
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
      })}
    </div>
  );
};

export default Page;
