import MyStartupId from "@/pages/my-startup-id-page/index";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return <MyStartupId params={params} />;
};

export default Page;
