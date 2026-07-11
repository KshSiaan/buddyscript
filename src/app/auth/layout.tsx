import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import DetectRoute from "./detect-route";
import SideCovers from "./side-covers";
export const metadata: Metadata = {
  title: "Buddyscript - Authentication",
  description: "Log in or sign up to access Buddyscript",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-dvh w-full grid grid-cols-5 gap-6 items-center bg-muted overflow-clip relative">
      {/* Blobs start >>>> */}
      <Image
        src="/svg/auth.svg"
        height={200}
        width={200}
        alt="blob_svg"
        className="absolute size-[70dvh]! top-[-20dvh] left-[-20dvw]"
      />
      <Image
        src="/svg/auth.svg"
        height={200}
        width={200}
        alt="blob_svg"
        className="absolute size-[70dvh]! top-[-20dvh] right-0"
      />
      <Image
        src="/svg/auth.svg"
        height={200}
        width={200}
        alt="blob_svg"
        className="absolute size-[50dvh]! bottom-[10dvh] right-[20dvw]"
      />
      {/* Blobs end <<<< */}
      <div className=" col-span-3" id="">
        <SideCovers />
      </div>
      <div className="h-full w-full flex justify-center items-center p-[10%] z-10 col-span-2">
        <Card className="w-full ring-0! max-w-lg!">
          <CardHeader className="flex flex-col justify-center items-center">
            <Image
              src="/svg/logo-text.svg"
              width={158}
              height={33}
              alt="buddyscript-logo"
              priority
            />
            <Suspense>
              <DetectRoute />
            </Suspense>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 justify-center items-center py-6">
            <Button variant="outline" className="w-full">
              <FcGoogle />
              Sign-in with google
            </Button>
            <div className="flex justify-center w-full items-center overflow-clip gap-4 text-muted-foreground">
              <Separator className="w-full border-muted border" />
              <span>or</span>
              <Separator className="w-full border-muted border" />
            </div>
            <div className=" w-full">{children}</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
