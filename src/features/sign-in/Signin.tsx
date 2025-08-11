"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import FormErrorMessage from "@/components/FormErrorMessage";
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
import { signinAction } from "./signin-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ISigninFormState } from "@/types/signin-types";

export default function SignupForm() {
  // VARS
  const router = useRouter();

  // FUNCTION
  const submit = async (
    prevState: ISigninFormState,
    formData: FormData
  ): Promise<ISigninFormState> => {
    // 1 : get result
    const result = await signinAction(prevState, formData);

    // 2 : handle toast for errors other than validation
    if (result.status === "notValidationError") {
      toast.error("Sign up failed");
    }

    // 3 : success toast
    if (result.status === "success") {
      toast.success("Sign up success");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }

    // return the result
    return result;
  };

  const [state, formAction, isPending] = useActionState<
    ISigninFormState,
    FormData
  >(submit, {
    errors: {
      username: undefined,
      password: undefined,
    },
    status: "initial",
  } as ISigninFormState);

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
              <Button className="w-full mt-3">
                {isPending && <LoadingSpinner />}
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
