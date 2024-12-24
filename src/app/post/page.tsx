"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Bookmark } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type likeTypes = {
  profileImage: string;
  username: string;
  _id: string;
};

type postType = {
  _id: string;
  description: string;
  postImage: string;
  userId: string;
  likes: likeTypes[];
  profileImage: string;
}[];

const Page = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<postType>([]);
  console.log(posts);
  const getPosts = async () => {
    console.log("working");
    const jsonData = await fetch("https://instagram-3ryv.onrender.com/posts");
    // https://instagram-service-v2-oxlr.onrender.com
    const response = await jsonData.json();
    setPosts(response);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const redirectToComments = (postId: string) => {
    router.push(`post/comment/${postId}`);
  };
  return (
    <div>
      {posts?.map((post) => {
        return (
          <div key={post._id}>
            <Card className="bg-black text-white">
              <CardHeader>
                <CardTitle></CardTitle>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <img className="w-[500px] h-[650px]" src={post.postImage} />
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <div className="flex justify-between">
                <div className="flex">
                  <Heart />
                  <MessageCircle />
                  <Send />
                </div>
                <Bookmark />
              </div>
              <div>0 likes</div>
              <div>{post.description}</div>
              <div
                onClick={() => redirectToComments(post._id)}
                className="text-blue-700"
              >
                view all comments
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
