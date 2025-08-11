import Dashboard from "@/pages/dashboard-page/index";
import { getCurrUser } from "@/server-actions/get-curr-user";
import { redirect } from "next/navigation";
import React from "react";

const page: React.FC = async () => {
  // VARS
  const user = await getCurrUser();

  // FUNCTIONS
  if (!user) {
    redirect("/");
  }

  // JSX

  return <Dashboard />;
};

export default page;
