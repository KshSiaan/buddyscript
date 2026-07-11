import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <main className="h-dvh w-full grid grid-cols-2 gap-6 items-center bg-muted">
      <div className="" id="dummy"></div>
      <div className="h-full w-full flex justify-center items-center p-[10%]">
        <Card className="w-full ring-0! ">
          <CardHeader className="flex flex-col justify-center items-center">
            <Image
              src="/svg/logo-text.svg"
              width={158}
              height={33}
              alt="buddyscript-logo"
            />
            <CardTitle className="text-center mt-6">Welcome back</CardTitle>
            <CardDescription className="text-center text-2xl font-semibold text-foreground">
              Login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="px-12 flex flex-col gap-6 justify-center items-center">
            <Button variant="outline" className="min-w-lg">
              <FcGoogle />
              Sign-in with google
            </Button>
            <div className="flex justify-center items-center min-w-lg! overflow-clip gap-4 text-muted-foreground">
              <Separator className="" />
              <span>or</span>
              <Separator className="" />
            </div>
            <div className=""></div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
