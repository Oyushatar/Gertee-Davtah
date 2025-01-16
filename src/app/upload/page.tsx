"use client";
import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { House } from "lucide-react";
import { UserRoundSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { SquarePlus } from "lucide-react";
import { NEXT_ROUTER_SEGMENT_PREFETCH_HEADER } from "next/dist/client/components/app-router-headers";
type tokentype = {
  userId: string;
  username: string;
};
const Page = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const decodedToken: tokentype = jwtDecode(token ?? "");
  const userId = decodedToken.userId;
  const redirectToHome = () => {
    router.push(`/post`);
  };
  const redirectToCreatePost = () => {
    router.push(`/upload`);
  };
  const redirectToUser = () => {
    router.push(`/user/${userId}`);
  };
  const uploadImages = async () => {
    if (!images) return;

    const uploadPromises = Array.from(images).map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ace_area");
      formData.append("cloud_name", "dl93ggn7x");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dl93ggn7x/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      return result.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    setUploadedImages(uploadedUrls.filter((url) => url !== null) as string[]);
  };

  const newUser = async (img: string) => {
    const createUser = {
      description: value,
      postImage: img,
      userId,
    };
    const res = await fetch(`https://instagram-3ryv.onrender.com/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createUser),
    });
    const bro = await res.json();
    console.log(bro);
    const token = bro.token;
    localStorage.setItem("token", token);
    alert("succesfully posted");
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
    <div className="max-w-lg mx-auto p-4 space-y-4 bg-black h-screen text-white">
      <input
        type="file"
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            setImages(files);
          }
        }}
        className="file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
      />

      <button
        onClick={uploadImages}
        className="bg-blue-600 rounded-md h-[45px] w-[90px]"
      >
        Upload Image
      </button>

      <div className="mt-4 text-center">
        {uploadedImages.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              className="max-w-full h-[300px] rounded-lg shadow-lg"
            />
            <div
              className="bg-stone-700 rounded-md h-[35px]"
              onClick={() => newUser(img)}
            >
              add post
            </div>
          </div>
        ))}
      </div>
      <input
        placeholder="add a comment..."
        className="text-black h-[40px] rounded-md w-[400px]"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="bg-black bottom-0 fixed w-screen h-[40px] text-white flex between justify-between">
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
