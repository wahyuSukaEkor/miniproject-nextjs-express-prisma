"use client";
import { participationColumns } from "@/app/(admin)/_components/events/[eventId]/participations/participation-column";
import { EventParticipationDataTable } from "@/app/(admin)/_components/events/[eventId]/participations/participation-data-table";
import LoadingDashboard from "@/app/(admin)/_components/loading";
import DashboardTemplate from "@/app/(admin)/_components/template";
import usePagination from "@/hooks/usePagination";
import { useEventParticipation } from "@/services/admin/queries";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const EventParticipation: React.FC = () => {
  const params = useParams();
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

  const { isPending, isError, data, error } = useEventParticipation({
    eventId: params.eventId as string,
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
      <div className="flex flex-1 justify-center">
        {data && data.result.length > 0 ? (
          <div className="w-full">
            <EventParticipationDataTable
              columns={participationColumns}
              data={data.result}
              eventId={params.eventId as string}
              page={data.page}
              totalPages={totalPages}
              canNextPage={canNextPage}
              canPrevPage={canPrevPage}
            />
          </div>
        ) : (
          <div className="flex min-h-full flex-col items-center justify-center gap-1 text-center">
            <h3 className="text-3xl font-bold tracking-tight">
              You have no participations
            </h3>
            <p className="text-sm text-muted-foreground">
              This event has no participations
            </p>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default EventParticipation;
