import Spinner from "@/components/shared/spinner";
import React from "react";

const LoadingDashboard: React.FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner className="h-20 w-20" />
    </div>
  );
};

export default LoadingDashboard;
