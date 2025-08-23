"use server";

import z from "zod";
import { ContactMethod } from "@/types/startup-types";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const undefErrorsObj = {
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

// FUNCTION
export const startupAction = async (
  formData: FormData,
  foundedDate: Date | undefined,
  preferredContactMethod: ContactMethod[],
  update: boolean | undefined,
  startupId: string | undefined,
  updateImage: boolean,
  updatePitch: boolean
) => {
  console.log(updateImage);
  try {
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
      industry: z.enum(["tech", "healthcare", "finance", "education"]),
      stage: z.enum(["idea", "mvp", "launched", "scaling"]),
      foundedDate: z.string().datetime(), // Changed from z.iso.datetime()

      // Step 2: Media - Fixed conditional logic
      coverImage: updateImage
        ? z
            .instanceof(File) // More specific than z.file()
            .refine(
              (file) => ["image/png", "image/jpeg"].includes(file.type),
              "Only PNG and JPEG images are allowed"
            )
            .refine(
              (file) => file.size <= 5 * 1024 * 1024, // 5MB in bytes
              "Cover image cannot exceed 5MB"
            )
        : z.any().optional(),

      // Step 3: Business details
      businessModel: z.enum(["B2B", "B2C", "C2C", "Other"]),
      fundingStatus: z.enum([
        "bootstrapped",
        "seedFunded",
        "seriesA",
        "seriesB",
        "seriesC",
      ]),
      fundingAmount: z.number().min(0, "Funding amount must be positive"),
      revenueModel: z
        .string()
        .min(10, "Revenue model must be at least 10 characters")
        .max(1000, "Revenue model must not exceed 1000 characters"), // Fixed error message
      yearsInOp: z
        .number()
        .min(0, "Years in operation must be positive")
        .max(100, "Years in operations must not exceed 100"), // More realistic max
      pitchDeck: updatePitch
        ? z
            .instanceof(File)
            .refine((file) => file.type === "application/pdf", {
              message: "Only PDF files are allowed",
            })
            .refine(
              (file) => file.size <= 20 * 1024 * 1024, // 20MB in bytes
              { message: "Pitch deck PDF cannot exceed 20MB" }
            )
            .optional()
        : z.any().optional(),

      preferredContactMethod: z.array(z.enum(["Email", "Phone", "Fax"])),
      newsletterSubscription: z.boolean(),
    });

    const formValues = {
      name: formData.get("name"),
      tagline: formData.get("tagline"),
      stage: formData.get("stage"),
      industry: formData.get("industry"),
      foundedDate: new Date(
        new Date(foundedDate as Date).setDate(
          new Date(foundedDate as Date).getDate() + 1
        )
      ).toISOString(),
      coverImage: formData.get("coverImage"),
      businessModel: formData.get("businessModel"),
      fundingStatus: formData.get("fundingStatus"),
      fundingAmount: Number(formData.get("fundingAmount")),
      revenueModel: formData.get("revenueModel"),
      yearsInOp: Number(formData.get("yearsInOp")),
      pitchDeck: formData.get("pitchDeck"),
      preferredContactMethod,
      newsletterSubscription: formData.get("newsletterSubscription") === "on",
    };

    await formSchema.parseAsync(formValues);

    const enhancedFormData = new FormData();
    if (update) {
      enhancedFormData.append("id", startupId as string);
    }

    for (const [key, value] of Object.entries(formValues)) {
      if (value instanceof File) {
        enhancedFormData.append(key, value);
      } else {
        enhancedFormData.append(key, String(value));
      }
    }

    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (update && startupId) {
      const res = await fetch(
        `${process.env.BACKEND_URL}/startup/update/${startupId}`,
        {
          method: "PATCH",
          body: enhancedFormData,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (!res?.ok) {
        throw new Error();
      }

      revalidateTag("all-startups");
    } else {
      const res = await fetch(`${process.env.BACKEND_URL}/startup/create`, {
        method: "POST",
        body: enhancedFormData,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!res?.ok) {
        throw new Error();
      }

      revalidateTag("all-startups");
    }

    return undefErrorsObj;
  } catch (err: unknown) {
    console.log("Catch block");
    if (err instanceof z.ZodError) {
      // eslint-disable-next-line
      const tree: any = z.treeifyError(err);

      console.log(tree);

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
      console.log("Unexpected Error");
      return undefErrorsObj;
    }
  }
};
