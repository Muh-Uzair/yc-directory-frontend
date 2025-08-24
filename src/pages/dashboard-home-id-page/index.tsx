import DashboardHomeId from "@/features/dashboard-home-id/DashboardHomeId";
import React from "react";

interface Props {
  id: string;
}

const Index: React.FC<Props> = ({ id }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return <DashboardHomeId id={id} />;
};

export default Index;
