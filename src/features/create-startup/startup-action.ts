"use server";

import { ContactMethod, IStartupFormState } from "@/types/startup-types";
import z from "zod";

const formSchema = z.object({
  // Step 1: Basic Startup Info
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must not exceed 20 characters"),
  tagline: z
    .string()
    .trim()
    .min(5, "Tagline must be at least 5 characters")
    .max(160, "Tagline must not exceed 160 characters"),
  industry: z.string().trim(),
  stage: z.enum(["Idea", "Prototype", "MVP", "Growth", "Scaling"]),
  foundedDate: z.iso.datetime(),

  // Step 2: Media
  coverImage: z
    .file()
    .mime(["image/png", "image/jpeg"], "Only png and jpegs are allowed")
    .max(5 * 10 ** 6, "Cover image can not exceed 5MB"),

  // Step 3: Business details
  businessModel: z.enum(["B2B", "B2C", "C2C", "Other"]),
  fundingStatus: z.enum([
    "bootstrapped",
    "seed Funded",
    "series A",
    "series B",
    "series C",
  ]),
  fundingAmount: z.number().positive(),
  revenueModel: z
    .string()
    .min(10, "Revenue model must be at least 10 characters")
    .max(1000, "Tagline must not exceed 1000 characters"),
  yearsInOp: z
    .number()
    .positive()
    .max(10000, "Years in operations must not exceed 10000"),
  pitchDeck: z
    .file()
    .mime("application/pdf", "Only png and jpegs are allowed")
    .max(20 * 10 ** 6, "Pitch deck pdf can not exceed 20MB"),
  preferredContactMethod: z.array(z.enum(["Phone", "EMail", "Fax"])),
  newsletterSubscription: z.boolean(),
});

/** Infer the TypeScript type for convenience */
export type StartupFormValues = z.infer<typeof formSchema>;

export const startupAction = async (
  prevState: IStartupFormState,
  formData: FormData,
  foundedDate: Date | undefined,
  preferredContactMethod: ContactMethod[]
) => {
  console.log(formData.get("newsletterSubscription"));
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
      coverImage: formData.get("coverImage"),
      businessModel: formData.get("businessModel"),
      fundingStatus: formData.get("fundingStatus"),
      fundingAmount: Number(formData.get("fundingAmount")),
      revenueModel: formData.get("revenueModel"),
      yearsInOp: formData.get("yearsInOp"),
      pitchDeck: formData.get("pitchDeck"),
      preferredContactMethod: preferredContactMethod,
      newsletterSubscription:
        formData.get("newsletterSubscription") === "on" ? true : false,
    };

    await formSchema.parseAsync(formValues);

    return {
      errors: {
        name: undefined,
        tagline: undefined,
        stage: undefined,
        industry: undefined,
        foundedDate: undefined,
        coverImage: undefined,
        businessModel: undefined,
        fundingStatus: undefined,
        fundingAmount: undefined,
        revenueModel: undefined,
        yearsInOp: undefined,
        pitchDeck: undefined,
        preferredContactMethod: undefined,
        newsletterSubscription: undefined,
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
          coverImage: tree?.properties?.coverImage?.errors?.[0] || undefined,
          businessModel:
            tree?.properties?.businessModel?.errors?.[0] || undefined,
          fundingStatus:
            tree?.properties?.fundingStatus?.errors?.[0] || undefined,
          fundingAmount:
            tree?.properties?.fundingAmount?.errors?.[0] || undefined,
          revenueModel:
            tree?.properties?.revenueModel?.errors?.[0] || undefined,
          yearsInOp: tree?.properties?.yearsInOp?.errors?.[0] || undefined,
          pitchDeck: tree?.properties?.pitchDeck?.errors?.[0] || undefined,
          preferredContactMethod:
            tree?.properties?.preferredContactMethod?.errors?.[0] || undefined,
          newsletterSubscription:
            tree?.properties?.newsletterSubscription?.errors?.[0] || undefined,
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
          coverImage: undefined,
          businessModel: undefined,
          fundingStatus: undefined,
          fundingAmount: undefined,
          revenueModel: undefined,
          yearsInOp: undefined,
          pitchDeck: undefined,
          preferredContactMethod: undefined,
          newsletterSubscription: undefined,
        },
        status: "notValidationError",
      };
    }
  }
};
