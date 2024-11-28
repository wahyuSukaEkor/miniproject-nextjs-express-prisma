import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import EventTable from "./event-table";

const EventCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center pb-0">
        <div className="grid gap-2">
          <CardTitle>Events</CardTitle>
          <CardDescription>Recent events from your store.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/dashboard/events">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-8">
        <EventTable />
      </CardContent>
    </Card>
  );
};

export default EventCard;
