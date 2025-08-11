"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { ISigninFormState } from "@/types/signin-types";

// FUNCTION schema
const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required." })
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username must not exceed 20 characters." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, hyphen, and underscores.",
    }),

  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

// FUNCTION Action
export const signinAction = async (
  prevSate: ISigninFormState,
  formData: FormData
) => {
  try {
    const formValues = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    await formSchema.parseAsync(formValues);

    const res = await fetch(`${process.env.BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formValues.username,
        password: formValues.password,
      }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Unable to sign up");
    }

    const { data } = await res.json();

    const cookieStore = await cookies();

    cookieStore.set("jwt", data?.jwt, {
      httpOnly: true, // prevents access from JavaScript (XSS protection)
      secure: process.env.NODE_ENV === "production", // only sent over HTTPS in production
      sameSite: "lax", // or "strict" / "none" depending on frontend/backend setup
      path: "/",
      maxAge: 3 * 24 * 60 * 60 * 1000, // in milliseconds
    });

    revalidateTag("currUser");

    return {
      errors: {
        username: undefined,
        password: undefined,
      },
      status: "success",
    };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      // eslint-disable-next-line
      const tree: any = z.treeifyError(err);

      return {
        errors: {
          username: tree?.properties?.username?.errors?.[0] || undefined,
          password: tree?.properties?.password?.errors?.[0] || undefined,
        },
        status: "error",
      };
    } else {
      return {
        errors: {
          username: undefined,
          password: undefined,
        },
        status: "notValidationError",
      };
    }
  }
};
