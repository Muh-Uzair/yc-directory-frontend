"use server";

import PageHeading from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { Trash } from "lucide-react";
import { FormAndUpdate } from "./FormAndUpdate";

interface Props {
  params: Promise<{ id: string }>;
}

const MyStartupId: React.FC<Props> = async ({ params }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/startup/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    cache: "force-cache",
  });

  const { data = {} } = await res.json();

  const { startup = {} } = data || {};

  const imageUrl = startup?.coverImage?.data
    ? `data:image/png;base64,${startup.coverImage.data}`
    : "";

  const pdfUrl = startup?.pitchDeck?.data
    ? `data:application/pdf;base64,${startup.pitchDeck.data}`
    : "";

  // SERVER ACTION
  async function deleteStartup() {
    "use server";
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/startup/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!res.ok) {
        console.error("Unable to delete startup");
        return;
      }
      revalidateTag("all-startups");
    } catch (err: unknown) {
      console.error(err);
    }
    redirect("/dashboard/my-startups");
  }

  return (
    <div>
      <div className="mb-8">
        <PageHeading>Your Startup Details</PageHeading>
      </div>
      <FormAndUpdate
        coverImageUrl={imageUrl}
        pitchDeckUrl={pdfUrl}
        defaultValues={startup}
        startupId={id}
      >
        <form action={deleteStartup}>
          <Button variant="destructive">
            <Trash />
            Delete
          </Button>
        </form>
      </FormAndUpdate>
    </div>
  );
};

export default MyStartupId;
