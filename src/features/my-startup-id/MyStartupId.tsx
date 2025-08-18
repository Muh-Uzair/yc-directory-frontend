/* eslint-disable @next/next/no-img-element */
"use server";

import { Button } from "@/components/ui/button";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

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
      <span>Your startup</span>
      <span>{startup?.name}</span>
      <img src={imageUrl} alt="Cover" />
      <div>
        <a href={pdfUrl} download="pitch-deck.pdf">
          Download Pitch Deck
        </a>
      </div>
      <div>
        <form action={deleteStartup}>
          <Button className="w-full" variant="destructive">
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MyStartupId;
