"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FastForward } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [newUserRes, setNewUserRes] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const newUser = async () => {
    const createUser = {
      email,
      password,
      username: userName,
    };
    const res = await fetch(`https://instagram-3ryv.onrender.com/signup`, {
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
  };
  const signup = () => {
    if (!email || !email.includes("@")) {
      alert("Email not valid");
    }
    if (!password || !password.includes("")) {
      alert("password not valid");
    } else {
      alert("successfully signned up");
      newUser();
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
    <div className="bg-black text-white h-screen w-screen">
      <Card className="bg-black h-screen w-screen justify-center">
        <CardHeader className="text-white">
          <img src="https://t4.ftcdn.net/jpg/03/97/48/01/360_F_397480131_ifXqWNKVteOhczWDJBeODrnMIbVcVp13.jpg" />
          <Input
            placeholder="userName"
            onChange={(e) => setUserName(e.target.value)}
            value={userName || ""}
          />
          {userName !== null && userName === "" && (
            <div className="text-red-600">error</div>
          )}
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
          {email !== null && email === "" && (
            <div className="text-red-600">error</div>
          )}
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
          {password !== null && password === "" && (
            <div className="text-red-600">error</div>
          )}
          <Button onClick={signup} className="hover: bg-sky-700">
            Sign up
          </Button>
          <div className="flex items-center justify-center ">
            <div className="text-white">already have an account?</div>
            <Button variant="link" className="text-blue-500">
              Log in!
            </Button>
          </div>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
