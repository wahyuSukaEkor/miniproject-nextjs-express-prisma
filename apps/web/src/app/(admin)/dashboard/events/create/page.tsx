import React from "react";
import DashboardTemplate from "@/app/(admin)/_components/template";
import EventForm from "@/app/(admin)/_components/events/event-form";

const EventCreate: React.FC = () => {
  return (
    <DashboardTemplate>
      <EventForm />
    </DashboardTemplate>
  );
};

export default EventCreate;
