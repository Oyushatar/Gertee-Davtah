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
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const signup = () => {
    if (!email || !email.includes("@")) {
      return alert("Email not valid");
    }
    if (!password || !password.includes("@")) {
      return alert("password not valid");
    } else {
      return alert("successfully signned up");
    }
  };

  return (
    <div className="bg-black text-white h-screen w-screen">
      <Card className="bg-black h-screen w-screen justify-center">
        <CardHeader className="text-white">
          <img src="https://t4.ftcdn.net/jpg/03/97/48/01/360_F_397480131_ifXqWNKVteOhczWDJBeODrnMIbVcVp13.jpg" />
          <Input
            placeholder="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName || ""}
          />
          {firstName !== null && firstName === "" && (
            <div className="text-red-600">error</div>
          )}
          <Input
            placeholder="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName || ""}
          />
          {lastName !== null && lastName === "" && (
            <div className="text-red-600">error</div>
          )}
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
        <CardContent>
          <p></p>
        </CardContent>
        <CardFooter>
          <p></p>
        </CardFooter>{" "}
      </Card>
    </div>
  );
}
