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
    <Card className="rounded-xl shadow-md border border-gray-200 bg-gray-50">
      <CardHeader className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg font-bold text-gray-800">
            Events
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Stay updated with recent events in your store.
          </CardDescription>
        </div>
        <Button
          asChild
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 text-sm flex items-center gap-1"
        >
          <Link href="/dashboard/events">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-hidden rounded-md bg-white shadow-inner">
          <EventTable />
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
