"use server";

import { cookies } from "next/headers";

export const getCurrUser = async () => {
  const cookieStore = await cookies();

  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    return null;
  }

  const res = await fetch(`${process.env.BACKEND_URL}/users/curr`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },

    credentials: "include",
    cache: "force-cache",
    next: {
      tags: ["currUser"],
    },
  });

  if (!res.ok) {
    throw new Error();
  }

  const data = await res.json();

  return data;
};
