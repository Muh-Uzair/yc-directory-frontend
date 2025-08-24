import React from "react";
import DashboardHomeId from "@/pages/dashboard-home-id-page/index";

interface Props {
  params: Promise<{ id: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  // VARS

  const { id } = await params;
  // FUNCTIONS

  // JSX
  return <DashboardHomeId id={id} />;
};

export default Page;
