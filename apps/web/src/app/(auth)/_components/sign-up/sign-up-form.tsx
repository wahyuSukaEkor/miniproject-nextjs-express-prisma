import ParticipantForm from "./participant-form";
import OrganizerForm from "./organizer-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const SignUpForm: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-2">
      <Tabs defaultValue="participants" className="w-full md:max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="organizers">Organizers</TabsTrigger>
        </TabsList>
        <TabsContent value="participants">
          <ParticipantForm />
        </TabsContent>
        <TabsContent value="organizers">
          <OrganizerForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignUpForm;
