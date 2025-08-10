"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import FormErrorMessage from "@/components/FormErrorMessage";
import { signupAction } from "./signup-action";
import { FormState } from "@/types/signup-types";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SignupForm() {
  // VARS

  // FUNCTIONS
  const submit = async (
    prevSate: FormState,
    formData: FormData
  ): Promise<FormState> => {
    return await signupAction(prevSate, formData);
  };

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submit,
    {
      errors: {
        username: undefined,
        password: undefined,
        confirmPassword: undefined,
      },
      status: "initial",
    } as FormState
  );

  // JSX JSX JSX

  return (
    <div className="w-full h-screen flex justify-center items-center p-3">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Sign up to create an account</CardTitle>
          <CardDescription>
            Enter your credentials below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-5">
            {/* DIVIDER */}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="e.g., John" />
              {state?.errors?.username && (
                <FormErrorMessage message={state?.errors?.username} />
              )}
            </div>

            {/* DIVIDER */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
              />
              {state?.errors?.password && (
                <FormErrorMessage message={state?.errors?.password} />
              )}
            </div>

            {/* DIVIDER */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
              />
              {state?.errors?.confirmPassword && (
                <FormErrorMessage message={state?.errors?.confirmPassword} />
              )}
            </div>

            {/* DIVIDER */}
            <div>
              <Button className="w-full mt-3">
                {isPending && <LoadingSpinner />}
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
