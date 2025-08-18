import MyStartupId from "@/features/my-startup-id/MyStartupId";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const Index: React.FC<Props> = async ({ params }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return <MyStartupId params={params} />;
};

export default Index;
