"use client";

import React from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { useDeleteEvent } from "@/services/event/mutations";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

const EventDeleteAlert: React.FC<Props> = (props) => {
  const { id } = props;
  const router = useRouter();
  const deleteEventMutation = useDeleteEvent();

  const handleDelete = (id: number) => {
    deleteEventMutation.mutate(`${id}`);
    router.push("/dashboard/events");
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the event.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => handleDelete(id)}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default EventDeleteAlert;
