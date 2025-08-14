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
import { IStartupFormState } from "@/types/startup-types";
import { startupAction } from "./startup-action";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
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

interface Props {
  step: number;
}

const StartupForm: React.FC<Props> = ({ step }) => {
  // VARS
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  // FUNCTIONS

  const submit = async (
    prevState: IStartupFormState,
    formData: FormData
  ): Promise<IStartupFormState> => {
    // 1 : get result
    const result = await startupAction(prevState, formData, date);

    // 2 : handle toast for errors other than validation
    if (result.status === "notValidationError") {
      toast.error("Sign up failed");
    }

    // 3 : success toast
    if (result.status === "success") {
      toast.success("Sign up success");
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
    },
    status: "initial",
  } as IStartupFormState);

  // JSX
  return (
    <div className="py-8">
      <Card>
        <form
          action={formAction}
          className={`flex flex-col ${step === 6 ? "gap-5" : "gap-0"} `}
        >
          {/* DIVIDER section 1 */}
          <div className={`${step === 1 || step === 6 ? "block" : "hidden"}`}>
            <CardHeader className="mb-5">
              <CardTitle>
                {(step === 1 || step === 6) && <>Basic Information </>}
              </CardTitle>
              <CardDescription>
                {(step === 1 || step === 6) && (
                  <>Enter basic information about your startup.</>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <section
                className={`flex flex-col gap-3  ${
                  step === 1 || step === 6 ? "flex" : "hidden"
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
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
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

          {step === 6 && <Separator />}

          {/* DIVIDER section 2 */}
          <div className={`${step === 2 || step === 6 ? "block" : "hidden"}`}>
            <CardHeader className="mb-5">
              <CardTitle>
                {(step === 2 || step === 6) && <>Founder And Team</>}
              </CardTitle>
              <CardDescription>
                {(step === 2 || step === 6) && (
                  <>Enter basic information about your startup.</>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <section
                className={`flex flex-col gap-3  ${
                  step === 2 || step === 6 ? "flex" : "hidden"
                }`}
              >
                <div>
                  <Label htmlFor="name">Cover image</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Images</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>
              </section>
            </CardContent>
          </div>

          {step === 6 && <Separator />}

          {/* DIVIDER section 3 */}
          <div className={`${step === 3 || step === 6 ? "block" : "hidden"}`}>
            <CardHeader className="mb-5">
              <CardTitle>
                {(step === 3 || step === 6) && <>Step 3 </>}
              </CardTitle>
              <CardDescription>
                {(step === 3 || step === 6) && (
                  <>Enter basic information about your startup.</>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <section
                className={`flex flex-col gap-3  ${
                  step === 3 || step === 6 ? "flex" : "hidden"
                }`}
              >
                <div>
                  <Label htmlFor="name">Business Model</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Funding Status</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Funding Amount</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Revenue Model</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Years In Operations</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Pitch Deck</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>
              </section>
            </CardContent>
          </div>

          {step === 6 && <Separator />}

          {/* DIVIDER section 4 */}
          <div className={`${step === 4 || step === 6 ? "block" : "hidden"}`}>
            <CardHeader className="mb-5">
              <CardTitle>
                {(step === 4 || step === 6) && <>Step 4 </>}
              </CardTitle>
              <CardDescription>
                {(step === 4 || step === 6) && (
                  <>Enter basic information about your startup.</>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <section
                className={`flex flex-col gap-3  ${
                  step === 4 || step === 6 ? "flex" : "hidden"
                }`}
              >
                <div>
                  <Label htmlFor="name">Target Market</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Problem Being Solved</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Unique Selling Proposition</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Social Impact</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Impact Description</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>
              </section>
            </CardContent>
          </div>

          {step === 6 && <Separator />}

          {/* DIVIDER section 5 */}

          <div className={`${step === 5 || step === 6 ? "block" : "hidden"}`}>
            <CardHeader className="mb-5">
              <CardTitle>
                {(step === 5 || step === 6) && <>Step 5 </>}
              </CardTitle>
              <CardDescription>
                {(step === 5 || step === 6) && (
                  <>Enter basic information about your startup.</>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <section
                className={`flex flex-col gap-3  ${
                  step === 5 || step === 6 ? "flex" : "hidden"
                }`}
              >
                <div>
                  <Label htmlFor="name">Preferred Contact Method</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Categories</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Public Listening</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Newsletter Subscription</Label>
                  <Input id="name" name="name" placeholder="e.g., John" />
                  {state?.errors?.name && (
                    <FormErrorMessage message={state?.errors?.name} />
                  )}
                </div>
              </section>
            </CardContent>
          </div>

          {/* DIVIDER  */}
          {step === 6 && (
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
