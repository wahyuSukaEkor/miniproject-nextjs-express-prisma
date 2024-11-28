"use client";

import React from "react";
import DashboardTemplate from "@/app/(admin)/_components/template";
import EventForm from "@/app/(admin)/_components/events/event-form";
import { useParams } from "next/navigation";
import { useEvent } from "@/services/admin/queries";
import LoadingDashboard from "@/app/(admin)/_components/loading";
import { toast } from "sonner";

const EventEdit: React.FC = () => {
  const params = useParams();
  const { isPending, isError, data, error } = useEvent({
    eventId: params.eventId as string,
  });

  if (isPending) return <LoadingDashboard />;

  if (isError) toast.error(error.message);

  return (
    <DashboardTemplate>
      {data && <EventForm type="update" event={data.result} />}
    </DashboardTemplate>
  );
};

export default EventEdit;
