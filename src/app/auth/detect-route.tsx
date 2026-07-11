"use client";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import React from "react";

export default function DetectRoute() {
  const path = usePathname();
  if (path === "/auth/register") {
    return (
      <>
        <CardTitle className="text-center mt-6">Get Started Now</CardTitle>
        <CardDescription className="text-center text-2xl font-semibold text-foreground">
          Registration
        </CardDescription>
      </>
    );
  } else {
    return (
      <>
        <CardTitle className="text-center mt-6">Welcome back</CardTitle>
        <CardDescription className="text-center text-2xl font-semibold text-foreground">
          Login to your account
        </CardDescription>
      </>
    );
  }
}
