import Navbar from "@/components/core/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { Suspense } from "react";
import SideNav from "./_home/side-nav";
import { Button } from "@/components/ui/button";
import PeopleList from "./_home/people-list";
import EventList from "./_home/event-list";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { fallbackAvatar } from "@/lib/extra";
import { HugeiconsIcon } from "@hugeicons/react";
import FriendList from "./_home/friend-list";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh w-full flex flex-col justify-start">
      <Navbar />
      <div className="w-full px-[16%] grid grid-cols-4 h-full flex-1 gap-4">
        <section className="w-full h-full pt-4 max-h-[90dvh] overflow-y-auto scrollbar-none space-y-4">
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
              <PeopleList />
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
              <EventList />
            </CardContent>
          </Card>
        </section>
        <section className="col-span-2">{children}</section>
        <section className="w-full h-full pt-4 max-h-[90dvh] overflow-y-auto scrollbar-none space-y-4">
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
                  <AvatarImage src={fallbackAvatar} />
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
              <FriendList />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
