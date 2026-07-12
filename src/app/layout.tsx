import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/base/theme-provider";
import { GooeyToaster } from "@/components/ui/goey-toaster";
const poppins = Poppins({
  subsets: ["latin", "devanagari", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Buddyscript",
  description:
    "Buddyscript is a social media platform that allows users to connect with friends, share content, and engage in discussions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("h-full antialiased", poppins.className)}
    >
      <body className="min-h-dvh w-dvw overflow-x-hidden! flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="buddyscript-theme"
        >
          {children}
          <GooeyToaster position="top-left" bounce={0.6} />
        </ThemeProvider>
      </body>
    </html>
  );
}
