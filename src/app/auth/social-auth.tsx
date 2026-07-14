"use client";
import { Button } from "@/components/ui/button";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { signIn, signUp } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function SOcialAuth() {
  const path = usePathname();
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={async () => {
        await signIn.social(
          {
            provider: "google",
            callbackURL: "/",
          },
          {
            onError: (error) => {
              gooeyToast.error(error?.error?.message || "Something went wrong");
            },
            onSuccess: (data) => {
              gooeyToast.success("Successfully signed in");
            },
          },
        );
      }}
    >
      <FcGoogle />
      {path === "/auth/sign-in"
        ? "Sign-in with Google"
        : "Register with google"}
    </Button>
  );
}
