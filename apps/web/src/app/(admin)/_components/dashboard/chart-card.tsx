import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type Props = {
  title: string;
  Filter?: React.ComponentType;
  children: React.ReactNode;
};

const ChartCard: React.FC<Props> = (props) => {
  const { title, children, Filter } = props;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {Filter && <Filter />}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ChartCard;
