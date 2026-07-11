"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function SideCovers() {
  const { resolvedTheme } = useTheme();
  const path = usePathname();
  return (
    <div className="relative w-full h-full p-[10%] z-10 flex justify-center items-center">
      {path === "/auth/register" ? (
        <Image
          src={
            resolvedTheme === "dark"
              ? "/image/auth/reg-dark.webp"
              : "/image/auth/reg-light.webp"
          }
          height={1200}
          width={1200}
          className="h-full w-full size-[35dvw]! object-cover"
          alt="blob_svg"
        />
      ) : (
        <Image
          src={
            resolvedTheme === "dark"
              ? "/image/auth/login.webp"
              : "/image/auth/login.webp"
          }
          height={1200}
          width={1200}
          className="h-full w-full size-[35dvw]! object-contain"
          alt="blob_svg"
        />
      )}
    </div>
  );
}
