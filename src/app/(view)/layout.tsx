import Navbar from "@/components/core/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { Suspense } from "react";
import SideNav from "./_home/side-nav";
import { Button } from "@/components/ui/button";
import PeopleList from "./_home/people-list";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh w-full flex flex-col justify-start">
      <Navbar />
      <div className="w-full mt-4 px-[16%] grid grid-cols-4 h-full flex-1 gap-4">
        <div className="w-full h-full  max-h-[90dvh] overflow-y-auto space-y-4">
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
        </div>
        <div className="col-span-2">{children}</div>
        <div className="w-full h-full bg-red-500 p-3"></div>
      </div>
    </main>
  );
}
