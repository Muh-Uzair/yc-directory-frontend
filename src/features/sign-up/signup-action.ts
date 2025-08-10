"use server";

import { FormState } from "@/types/signup-types";
import { z } from "zod";
const formSchema = z
  .object({
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

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required." }),
  })
  .refine(async (data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const signupAction = async (prevSate: FormState, formData: FormData) => {
  try {
    const formValues = {
      username: formData.get("username"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    await formSchema.parseAsync(formValues);

    return {
      errors: {
        username: undefined,
        password: undefined,
        confirmPassword: undefined,
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
          confirmPassword:
            tree?.properties?.confirmPassword?.errors?.[0] || undefined,
        },
        status: "error",
      };
    } else {
      return {
        errors: {
          username: "Username might not be correct",
          password: "Password might not be correct",
          confirmPassword: "Confirm password might not be correct",
        },
        status: "error",
      };
    }
  }
};
