/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useActionState, useState } from "react";
import FormErrorMessage from "@/components/FormErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ContactMethod,
  IStartupFormState,
  IStartupFormValues,
} from "@/types/startup-types";
import { startupAction } from "./startup-action";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

interface Props {
  step: number;
  formReadonly?: boolean;
  defaultValues?: IStartupFormValues;
  coverImageUrl?: string | undefined;
  pitchDeckUrl?: string | undefined;
  update?: boolean | undefined;
  startupId?: string | undefined;
}

// CMP CMP CMP
const StartupForm: React.FC<Props> = ({
  step,
  formReadonly = false,
  defaultValues = null,
  coverImageUrl = undefined,
  pitchDeckUrl = undefined,
  update = undefined,
  startupId,
}) => {
  // VARS
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(() =>
    defaultValues?.foundedDate ? new Date(defaultValues.foundedDate) : undefined
  );
  const [fundingStatus, setFundingStatus] = useState("bootstrapped");
  const [preferredContactMethods, setPreferredContactMethods] = useState<
    ContactMethod[]
  >(defaultValues?.preferredContactMethod ?? ["Email"]);
  const router = useRouter();
  const [updateImage, setUpdateImage] = useState(!update);
  const [updatePitch, setUpdatePitch] = useState(!update);

  // FUNCTION
  const submit = async (
    prevState: IStartupFormState,
    formData: FormData
  ): Promise<IStartupFormState> => {
    if (formReadonly) return prevState;

    const result = await startupAction(
      formData,
      date,
      preferredContactMethods,
      update,
      startupId,
      updateImage,
      updatePitch
    );

    if (result.status === "notValidationError") {
      toast.error("Creation Failed");
    }

    if (result.status === "success") {
      toast.success("Creation Successful");
      setTimeout(() => {
        router.push("/dashboard/my-startups");
      }, 1000);
    }

    return result;
  };

  const [state, formAction, isPending] = useActionState<
    IStartupFormState,
    FormData
  >(submit, {
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
    status: "initial",
  } as IStartupFormState);

  // FUNCTION
  function handleCheckboxChange(method: ContactMethod) {
    if (formReadonly) return;
    setPreferredContactMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  }

  // JSX
  return (
    <div className="py-8">
      <Card>
        <form
          action={formAction}
          className={`flex flex-col ${step === 5 ? "gap-5" : "gap-0"} `}
        >
          {/* DIVIDER section 1 */}
          <div className={`${step === 1 || step === 5 ? "block" : "hidden"}`}>
            <CardHeader className="mb-5">
              <CardTitle>
                {(step === 1 || step === 5) && <>Basic Information </>}
              </CardTitle>
              <CardDescription>
                {(step === 1 || step === 5) && (
                  <>Enter basic information about your startup.</>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <section
                className={`flex flex-col gap-4  ${
                  step === 1 || step === 5 ? "flex" : "hidden"
                }`}
              >
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., John"
                    disabled={formReadonly}
                    defaultValue={defaultValues?.name}
                  />
                  {state?.errors?.name && !formReadonly && (
                    <FormErrorMessage message={state.errors.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    placeholder="e.g., This is my startup tagline"
                    disabled={formReadonly}
                    defaultValue={defaultValues?.tagline}
                  />
                  {state?.errors?.tagline && !formReadonly && (
                    <FormErrorMessage message={state.errors.tagline} />
                  )}
                </div>

                <div>
                  <Label htmlFor="stage">Stage</Label>
                  <RadioGroup
                    name="stage"
                    defaultValue={
                      defaultValues?.stage ? defaultValues?.stage : "idea"
                    }
                    disabled={formReadonly}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="idea" id="idea" />
                      <Label htmlFor="idea">Idea</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mvp" id="mvp" />
                      <Label htmlFor="mvp">MVP</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="launched" id="launched" />
                      <Label htmlFor="launched">Launched</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scaling" id="scaling" />
                      <Label htmlFor="scaling">Scaling</Label>
                    </div>
                  </RadioGroup>
                  {state?.errors?.stage && !formReadonly && (
                    <FormErrorMessage message={state.errors.stage} />
                  )}
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    name="industry"
                    disabled={formReadonly}
                    defaultValue={
                      defaultValues?.industry ? defaultValues?.industry : "tech"
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Industries</SelectLabel>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {state?.errors?.industry && !formReadonly && (
                    <FormErrorMessage message={state.errors.industry} />
                  )}
                </div>

                <div className="flex flex-col">
                  <Label className="px-1">Founded Date</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full border border-input justify-between font-normal"
                        disabled={formReadonly}
                      >
                        {date
                          ? date.toISOString().split("T")[0]
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          if (!formReadonly) {
                            setDate(date);
                            setOpen(false);
                          }
                        }}
                        disabled={formReadonly}
                      />
                    </PopoverContent>
                  </Popover>
                  {state?.errors?.foundedDate && !formReadonly && (
                    <FormErrorMessage message={state.errors.foundedDate} />
                  )}
                </div>
              </section>
            </CardContent>
          </div>

          {step === 5 && <Separator />}

          {/* DIVIDER section 2 */}
          <div className={`${step === 2 || step === 5 ? "block" : "hidden"}`}>
            <CardHeader className="mb-5">
              <CardTitle>{(step === 2 || step === 5) && <>Media</>}</CardTitle>
              <CardDescription>
                {(step === 2 || step === 5) && <>Your startup media here.</>}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <section
                className={`flex flex-col gap-4  ${
                  step === 2 || step === 5 ? "flex" : "hidden"
                }`}
              >
                <div>
                  <Label htmlFor="coverImage">Cover image</Label>

                  {formReadonly && (
                    <div>
                      <img
                        className="rounded-md"
                        src={coverImageUrl}
                        alt="Cover Image"
                      />
                    </div>
                  )}

                  {!formReadonly && (
                    <>
                      {update && (
                        <Button
                          variant={"outline"}
                          onClick={() => {
                            setUpdateImage((prev) => !prev);
                          }}
                          className="w-full mb-5"
                        >
                          Update Image
                        </Button>
                      )}

                      {updateImage && (
                        <Input
                          type="file"
                          accept="image/*"
                          id="coverImage"
                          name="coverImage"
                          disabled={formReadonly}
                        />
                      )}
                    </>
                  )}

                  {state?.errors?.coverImage &&
                    !formReadonly &&
                    updateImage && (
                      <FormErrorMessage message={state.errors.coverImage} />
                    )}
                </div>
              </section>
            </CardContent>
          </div>

          {step === 5 && <Separator />}

          {/* DIVIDER section 3 */}
          <div className={`${step === 3 || step === 5 ? "block" : "hidden"}`}>
            <CardHeader className="mb-5">
              <CardTitle>
                {(step === 3 || step === 5) && <>Business Details</>}
              </CardTitle>
              <CardDescription>
                {(step === 3 || step === 5) && (
                  <>Inform us about business details of your startup.</>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <section
                className={`flex flex-col gap-4  ${
                  step === 3 || step === 5 ? "flex" : "hidden"
                }`}
              >
                <Select
                  name="businessModel"
                  defaultValue={defaultValues?.businessModel ?? "B2B"}
                  disabled={formReadonly}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Models</SelectLabel>
                      <SelectItem value="B2B">B2B</SelectItem>
                      <SelectItem value="B2C">B2C</SelectItem>
                      <SelectItem value="C2C">C2C</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {state?.errors?.businessModel && !formReadonly && (
                  <FormErrorMessage message={state.errors.businessModel} />
                )}

                <div>
                  <Label htmlFor="fundingStatus">Funding Status</Label>
                  <RadioGroup
                    name="fundingStatus"
                    defaultValue={
                      defaultValues?.fundingStatus ?? "bootstrapped"
                    }
                    value={fundingStatus}
                    onValueChange={(val) => setFundingStatus(val)}
                    disabled={formReadonly}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bootstrapped" id="bootstrapped" />
                      <Label htmlFor="bootstrapped">Bootstrapped</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seedFunded" id="seedFunded" />
                      <Label htmlFor="seedFunded">Seed Funded</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seriesA" id="seriesA" />
                      <Label htmlFor="seriesA">Series A</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seriesB" id="seriesB" />
                      <Label htmlFor="seriesB">Series B</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seriesC" id="seriesC" />
                      <Label htmlFor="seriesC">Series C</Label>
                    </div>
                  </RadioGroup>
                  {state?.errors?.fundingStatus && !formReadonly && (
                    <FormErrorMessage message={state.errors.fundingStatus} />
                  )}
                </div>

                <div>
                  <Label htmlFor="fundingAmount">Funding Amount</Label>
                  <Input
                    disabled={formReadonly || fundingStatus !== "bootstrapped"}
                    id="fundingAmount"
                    name="fundingAmount"
                    placeholder="e.g., 1000"
                    type="number"
                    defaultValue={defaultValues?.fundingAmount ?? 0}
                  />
                  {state?.errors?.fundingAmount && !formReadonly && (
                    <FormErrorMessage message={state.errors.fundingAmount} />
                  )}
                </div>

                <div>
                  <Label htmlFor="revenueModel">Revenue Model</Label>
                  <Textarea
                    id="revenueModel"
                    name="revenueModel"
                    placeholder="e.g., This is details about revenue model"
                    disabled={formReadonly}
                    defaultValue={defaultValues?.revenueModel ?? ""}
                  />
                  {state?.errors?.revenueModel && !formReadonly && (
                    <FormErrorMessage message={state.errors.revenueModel} />
                  )}
                </div>

                <div>
                  <Label htmlFor="yearsInOp">Years In Operations</Label>
                  <Input
                    type="number"
                    id="yearsInOp"
                    name="yearsInOp"
                    placeholder="e.g., 10"
                    disabled={formReadonly}
                    defaultValue={defaultValues?.yearsInOp ?? ""}
                  />
                  {state?.errors?.yearsInOp && !formReadonly && (
                    <FormErrorMessage message={state.errors.yearsInOp} />
                  )}
                </div>

                <div>
                  <Label htmlFor="pitchDeck">Pitch Deck</Label>
                  {!formReadonly && (
                    <>
                      {update && (
                        <Button
                          variant={"outline"}
                          onClick={() => {
                            setUpdatePitch((prev) => !prev);
                          }}
                          className="w-full mb-5"
                        >
                          Update Pitch
                        </Button>
                      )}

                      {updatePitch && (
                        <Input
                          type="file"
                          id="pitchDeck"
                          name="pitchDeck"
                          disabled={formReadonly}
                          accept="application/pdf"
                        />
                      )}
                    </>
                  )}

                  {state?.errors?.coverImage &&
                    !formReadonly &&
                    updatePitch && (
                      <FormErrorMessage message={state.errors.pitchDeck} />
                    )}

                  {formReadonly && (
                    <a
                      href={pitchDeckUrl}
                      download="pitch-deck.pdf"
                      className="text-primary underline hover:text-primary/80"
                    >
                      Download Pitch Deck
                    </a>
                  )}
                </div>
              </section>
            </CardContent>
          </div>

          {step === 5 && <Separator />}

          {/* DIVIDER section 4 */}
          <div className={`${step === 4 || step === 5 ? "block" : "hidden"}`}>
            <CardHeader className="mb-5">
              <CardTitle>
                {(step === 4 || step === 5) && <>Subscriptions</>}
              </CardTitle>
              <CardDescription>
                {(step === 4 || step === 5) && (
                  <>Would you like our subscriptions.</>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <section
                className={`flex flex-col gap-4  ${
                  step === 4 || step === 5 ? "flex" : "hidden"
                }`}
              >
                <div>
                  <Label htmlFor="preferredContactMethod">
                    Preferred Contact Methods
                  </Label>

                  {["Email", "Phone", "Fax"].map((method, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Checkbox
                        id={method}
                        checked={preferredContactMethods.includes(
                          method as ContactMethod
                        )}
                        onCheckedChange={() =>
                          handleCheckboxChange(method as ContactMethod)
                        }
                        disabled={formReadonly}
                      />
                      <Label htmlFor={method}>{method}</Label>
                    </div>
                  ))}
                  {state?.errors?.preferredContactMethod && !formReadonly && (
                    <FormErrorMessage
                      message={state.errors.preferredContactMethod}
                    />
                  )}
                </div>

                <div>
                  <Label>Newsletter Subscription</Label>
                  <Label
                    htmlFor="newsletterSubscription"
                    className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary-extra-light"
                  >
                    <Checkbox
                      id="newsletterSubscription"
                      name="newsletterSubscription"
                      disabled={formReadonly}
                      className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                      defaultChecked={
                        defaultValues?.newsletterSubscription ?? false
                      }
                    />
                    <div className="grid gap-1.5 font-normal">
                      <p className="text-sm leading-none font-medium">
                        Enable notifications
                      </p>
                      <p className="text-muted-foreground text-sm">
                        You can enable or disable notifications at any time.
                      </p>
                    </div>
                  </Label>
                  {state?.errors?.newsletterSubscription && !formReadonly && (
                    <FormErrorMessage
                      message={state.errors.newsletterSubscription}
                    />
                  )}
                </div>
              </section>
            </CardContent>
          </div>

          {/* DIVIDER */}
          {step === 5 && !formReadonly && (
            <CardContent>
              <section>
                <Button type="submit" className="w-full mt-8">
                  {isPending && <LoadingSpinner />}
                  Submit
                </Button>
              </section>
            </CardContent>
          )}
        </form>
      </Card>
    </div>
  );
};

export default StartupForm;
