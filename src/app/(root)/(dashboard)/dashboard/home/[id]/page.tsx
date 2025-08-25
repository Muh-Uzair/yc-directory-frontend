import React from "react";
import DashboardHomeId from "@/pages/dashboard-home-id-page/index";

interface Props {
  params: Promise<{ id: string }>;
}

export const experimental_ppr = true;

const Page: React.FC<Props> = async ({ params }) => {
  // VARS

  const { id } = await params;
  // FUNCTIONS

  // JSX
  return <DashboardHomeId id={id} />;
};

export default Page;
