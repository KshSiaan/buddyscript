import Navbar from "@/components/core/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { Suspense } from "react";
import SideNav from "./_home/side-nav";
import { Button } from "@/components/ui/button";
import PeopleList from "./_home/people-list";
import EventList from "./_home/event-list";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { fallbackMyAvatar } from "@/lib/extra";
import { HugeiconsIcon } from "@hugeicons/react";
import FriendList from "./_home/friend-list";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await auth.api.getSession({
    headers: await headers(),
  });

  if (!me?.session) {
    return redirect("/auth/login");
  }

  return (
    <main className="min-h-dvh w-full flex flex-col justify-start overflow-hidden!">
      <Navbar me={me.user} />
      <div className="w-full px-[16%] grid grid-cols-4 h-full flex-1 gap-4">
        <section className="w-full h-full pt-4 max-h-[90dvh] overflow-y-auto scrollbar-none space-y-4 scroll-fade-b">
          <Card className="border-0! ring-0!">
            <CardHeader>
              <CardTitle className="text-xl">Explore</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense>
                <SideNav />
              </Suspense>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Suggested People</CardTitle>
              <Button size="xs" variant="link">
                See all
              </Button>
            </CardHeader>
            <CardContent>
              <Suspense>
                <PeopleList />
              </Suspense>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Events</CardTitle>
              <Button size="xs" variant="link">
                See all
              </Button>
            </CardHeader>
            <CardContent>
              <Suspense>
                <EventList />
              </Suspense>
            </CardContent>
          </Card>
        </section>
        <section className="col-span-2 max-h-[calc(100dvh-4rem)] overflow-x-auto scrollbar-none space-y-4 pt-4">
          <Suspense>{children}</Suspense>
        </section>
        <section className="w-full h-full pt-4 max-h-[90dvh] overflow-y-auto scrollbar-none space-y-4 scroll-fade-b">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>You Might Like</CardTitle>
              <Button size="xs" variant="link">
                See all
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex gap-2 items-center justify-start">
                <Avatar size="lg">
                  <AvatarImage src={fallbackMyAvatar} />
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-xs text-muted-foreground">
                    Software Engineer
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">Ignore</Button>
                <Button>Follow</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Your Friends</CardTitle>
              <Button size="xs" variant="link">
                See all
              </Button>
            </CardHeader>
            <CardContent>
              <Suspense>
                <FriendList />
              </Suspense>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
