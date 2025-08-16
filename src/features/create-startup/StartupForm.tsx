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
import { ContactMethod, IStartupFormState } from "@/types/startup-types";
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

interface Props {
  step: number;
}

const StartupForm: React.FC<Props> = ({ step }) => {
  // VARS
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [fundingStatus, setFundingStatus] = useState("bootstrapped");
  const [preferredContactMethods, setPreferredContactMethods] = useState<
    ContactMethod[]
  >(["Email"]);

  // FUNCTION
  const submit = async (
    prevState: IStartupFormState,
    formData: FormData
  ): Promise<IStartupFormState> => {
    // 1 : get result

    const result = await startupAction(
      prevState,
      formData,
      date,
      preferredContactMethods
    );

    // 2 : handle toast for errors other than validation
    if (result.status === "notValidationError") {
      toast.error("Creation Failed");
    }

    // 3 : success toast
    if (result.status === "success") {
      toast.success("Creation Successful");
    }

    // return the result
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
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    placeholder="e.g., This is my startup tagline"
                  />
                  {state?.errors?.tagline && (
                    <FormErrorMessage message={state?.errors?.tagline} />
                  )}
                </div>

                <div>
                  <Label htmlFor="stage">Stage</Label>
                  <RadioGroup name="stage" defaultValue="idea">
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
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select name="industry">
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
                </div>

                <div className="flex flex-col">
                  <Label className="px-1">Founded Date</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full border border-input justify-between font-normal"
                      >
                        {date ? date.toLocaleDateString() : "Select date"}
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
                          setDate(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
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
                  <Input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    placeholder="e.g., John"
                  />
                  {state?.errors?.coverImage && (
                    <FormErrorMessage message={state?.errors?.coverImage} />
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
                <div>
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Select name="businessModel">
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
                  {state?.errors?.businessModel && (
                    <FormErrorMessage message={state?.errors?.businessModel} />
                  )}
                </div>

                <div>
                  <Label htmlFor="fundingStatus">Funding Status</Label>
                  <RadioGroup
                    name="fundingStatus"
                    defaultValue="bootstrapped"
                    value={fundingStatus}
                    onValueChange={(val) => setFundingStatus(val)}
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
                  {state?.errors?.fundingStatus && (
                    <FormErrorMessage message={state?.errors?.fundingStatus} />
                  )}
                </div>

                <div>
                  <Label htmlFor="fundingAmount">Funding Amount</Label>
                  <Input
                    disabled={fundingStatus !== "bootstrapped"}
                    id="fundingAmount"
                    name="fundingAmount"
                    placeholder="e.g., 1000"
                    type="number"
                  />
                  {state?.errors?.fundingAmount && (
                    <FormErrorMessage message={state?.errors?.fundingAmount} />
                  )}
                </div>

                <div>
                  <Label htmlFor="revenueModel">Revenue Model</Label>
                  <Textarea
                    id="revenueModel"
                    name="revenueModel"
                    placeholder="e.g., This is details about revenue model"
                  />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="yearsInOp">Years In Operations</Label>
                  <Input
                    type="number"
                    id="yearsInOp"
                    name="yearsInOp"
                    placeholder="e.g., 10"
                  />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="pitchDeck">Pitch Deck</Label>
                  <Input type="file" id="pitchDeck" name="pitchDeck" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
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
                  {["Email", "Phone", "Fax"].map((method) => (
                    <div key={method} className="flex items-center gap-3">
                      <Checkbox
                        id={method}
                        checked={preferredContactMethods.includes(
                          method as ContactMethod
                        )}
                        onCheckedChange={() =>
                          handleCheckboxChange(method as ContactMethod)
                        }
                      />
                      <Label htmlFor={method}>{method}</Label>
                    </div>
                  ))}
                  {state?.errors?.newsletterSubscription && (
                    <FormErrorMessage
                      message={state?.errors?.newsletterSubscription}
                    />
                  )}
                  {state?.errors?.preferredContactMethod && (
                    <FormErrorMessage
                      message={state?.errors?.preferredContactMethod}
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
                      defaultChecked
                      className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
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
                </div>
              </section>
            </CardContent>
          </div>

          {/* DIVIDER  */}
          {step === 5 && (
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
