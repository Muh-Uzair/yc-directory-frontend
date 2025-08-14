"use server";

import { IStartupFormState } from "@/types/startup-types";
import z from "zod";

const formSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  stage: z.string(),
  industry: z.string(),
});

export const startupAction = async (
  prevState: IStartupFormState,
  formData: FormData,
  foundedDate: Date | undefined
) => {
  try {
    const formValues = {
      name: formData.get("name"),
      tagline: formData.get("tagline"),
      stage: formData.get("stage"),
      industry: formData.get("industry"),
      foundedDate: new Date(
        new Date(foundedDate as Date).setDate(
          new Date(foundedDate as Date).getDate() + 1
        )
      ),
    };

    await formSchema.parseAsync(formValues);

    console.log(formValues);

    return {
      errors: {
        name: undefined,
        tagline: undefined,
        stage: undefined,
        industry: undefined,
        foundedDate: undefined,
      },
      status: "success",
    };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      // eslint-disable-next-line
      const tree: any = z.treeifyError(err);

      return {
        errors: {
          name: tree?.properties?.name?.errors?.[0] || undefined,
          tagline: tree?.properties?.tagline?.errors?.[0] || undefined,
          stage: tree?.properties?.stage?.errors?.[0] || undefined,
          industry: tree?.properties?.industry?.errors?.[0] || undefined,
          foundedDate: tree?.properties?.foundedDate?.errors?.[0] || undefined,
        },
        status: "error",
      };
    } else {
      return {
        errors: {
          name: undefined,
          tagline: undefined,
          stage: undefined,
          industry: undefined,
          foundedDate: undefined,
        },
        status: "notValidationError",
      };
    }
  }
};
