"use server";

import { cookies } from "next/headers";

export const getCurrUser = async () => {
  try {
    const cookieStore = await cookies();

    const jwt = cookieStore.get("jwt")?.value;

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
      throw new Error("Unable to fetch user");
    }

    const data = await res.json();

    return data;
  } catch (err: unknown) {
    console.log(`Unable to fetch curr user Error => ${err}`);
  }
};
