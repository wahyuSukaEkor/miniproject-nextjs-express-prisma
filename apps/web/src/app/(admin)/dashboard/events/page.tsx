"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { eventColumns } from "../../_components/events/event-columns";
import DashboardTemplate from "../../_components/template";
import { EventDataTable } from "../../_components/events/event-data-table";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import usePagination from "@/hooks/usePagination";
import LoadingDashboard from "../../_components/loading";
import { useAdminEvents } from "@/services/admin/queries";

const EventPage: React.FC = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) ?? 1;
  const limit = Number(searchParams.get("limit")) ?? 10;
  const sort_by = searchParams.get("sort_by") ?? "created_at";
  const order_by = searchParams.get("order_by") ?? "desc";

  const {
    canNextPage,
    canPrevPage,
    setCanNextPage,
    setCanPrevPage,
    setTotalPages,
    totalPages,
  } = usePagination();

  const { isPending, isError, data, error } = useAdminEvents({
    pagination: { limit, order_by, page, sort_by },
  });

  useEffect(() => {
    if (data) {
      setCanNextPage(data.total > data.limit * data.page);
      setCanPrevPage(data.page > 1);
      setTotalPages(Math.ceil(data.total / data.limit));
    }
  }, [data, setCanNextPage, setCanPrevPage, setTotalPages]);

  if (isPending) return <LoadingDashboard />;

  if (isError) toast.error(error.message);

  return (
    <DashboardTemplate>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-wide">Manage Events</h2>
        <Button
          asChild
          size="sm"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Link href="/dashboard/events/create">
            <PlusCircle className="h-5 w-5" />
            <span>Add New Event</span>
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {data && data.result.length > 0 ? (
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <EventDataTable
              columns={eventColumns}
              data={data.result}
              page={data.page}
              totalPages={totalPages}
              canNextPage={canNextPage}
              canPrevPage={canPrevPage}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <h3 className="text-xl font-semibold text-gray-800">
              No Events Found
            </h3>
            <p className="text-sm text-gray-600">
              Create your first event to get started!
            </p>
            <Button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white">
              <Link href="/dashboard/events/create">Add Event</Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default EventPage;
