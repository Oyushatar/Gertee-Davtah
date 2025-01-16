"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { comment } from "postcss";
import { useState, use, useEffect } from "react";
import { House } from "lucide-react";
import { UserRoundSearch } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";

type commentTypes = {
  _id: string;
  comment: string;
  userId: {
    username: string;
    profile: string;
  };
}[];
type tokentype = {
  userId: string;
  username: string;
};
const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = use(params);
  const [addComment, setAddComment] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token") ?? "";
  const decodedToken: tokentype = jwtDecode(token);
  const userId = decodedToken.userId;
  const [comments, setComments] = useState<commentTypes>([]);
  const redirectToHome = () => {
    router.push(`/post`);
  };
  const redirectToCreatePost = () => {
    router.push(`/upload`);
  };
  const redirectToUser = () => {
    router.push(`/user/${userId}`);
  };
  const getComments = async () => {
    const jsonData = await fetch(
      "https://instagram-3ryv.onrender.com/comment/6761430cb244385b6ccde9d1"
    );
    const response = await jsonData.json();
    console.log(response);
    setComments(response);
  };
  useEffect(() => {
    getComments();
  }, []);
  console.log(comments);
  const content = async () => {
    const newComment = {
      comment: addComment,
      userId,
      postId,
    };

    const jsonData = await fetch(
      `https://instagram-3ryv.onrender.com/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }
    );

    const response = await jsonData.json();
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
    <div className="bg-black h-screen text-white">
      <div className="w-screen h-[50px] flex align-middle justify-center">
        comment
      </div>
      {comments?.map((comment) => {
        return (
          <div key={comment._id}>
            <div>{comment.userId.profile}</div>
            <div>
              <div>{comment.userId.username}</div>
              <div>{comment.comment}</div>
            </div>
          </div>
        );
      })}
      <div></div>
      <div className="flex bottom-0 pb-10 absolute">
        <Input className="w-[250px] " />
        <Button
          onClick={() => content()}
          variant="outline"
          className="text-black"
        >
          comment
        </Button>
      </div>
      <div className="bg-black bottom-0 fixed w-screen h-[40px] text-white flex between justify-between">
        <House className="h-[40px]" onClick={redirectToHome} />
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
