import PageHeading from "@/components/PageHeading";
import StartupTable from "@/components/StartupsTable";
import { cookies } from "next/headers";
import React from "react";

const MyStartups: React.FC = async () => {
  // VARS
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/startup/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const {
    data: { startups },
  } = await res.json();

  // FUNCTIONS

  // JSX
  return (
    <div>
      {" "}
      <div className="mb-8">
        <PageHeading>All Of Your Startups</PageHeading>
      </div>
      <StartupTable startups={startups} />
    </div>
  );
};

export default MyStartups;
