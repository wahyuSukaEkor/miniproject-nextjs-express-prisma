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
  const sort_by = searchParams.get("sort_by") ?? "createdAt";
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
      <div>
        <Button asChild size="sm" className="h-8 gap-1">
          <Link href="/dashboard/events/create">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Event
            </span>
          </Link>
        </Button>
      </div>
      <div className="flex flex-1 justify-center">
        {data && data.result.length > 0 ? (
          <div className="w-full">
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
          <div className="flex min-h-full flex-col items-center justify-center gap-1 text-center">
            <h3 className="text-3xl font-bold tracking-tight">
              You have no events
            </h3>
            <p className="text-sm text-muted-foreground">
              Set up an event and proceed to sell tickets.
            </p>
            <Button className="mt-4">Add Event</Button>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default EventPage;
