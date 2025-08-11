"use server";

import { toast } from "sonner";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const signoutAction = async () => {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("jwt");

    revalidateTag("currUser");

    toast.success("Sign out success");
  } catch (err: unknown) {
    console.error(`Sign out failed Error => ${err}`);
  }
};
