"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, use, useEffect } from "react";
type commentTypes = {
  userId: string;
  _id: string;
  comment: string;
  postId: string;
}[];
const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = use(params);
  const [comments, setComments] = useState<commentTypes>([]);
  const getComments = async () => {
    const jsonData = await fetch("https://instagram-3ryv.onrender.com/posts");
    const response = await jsonData.json();
    setComments(response);
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <div className="bg-black h-screen w-screen text-white">
      <div className="w-screen h-[50px] flex align-middle justify-center">
        comment
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div className="flex">
        {" "}
        <Input />
        <Button variant="outline" className="text-black">
          comment
        </Button>
      </div>
    </div>
  );
};

export default Page;
