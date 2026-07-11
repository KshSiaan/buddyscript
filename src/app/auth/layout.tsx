import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buddyscript - Authentication",
  description: "Log in or sign up to access Buddyscript",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
