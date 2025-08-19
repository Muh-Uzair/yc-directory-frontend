"use client";

import { ReactNode, useState } from "react";
import StartupForm from "../create-startup/StartupForm";
import { Pencil } from "lucide-react";
import { IStartupFormValues } from "@/types/startup-types";
import { Button } from "@/components/ui/button";

interface PropsFormAndUpdate {
  children: ReactNode;
  coverImageUrl: string;
  pitchDeckUrl: string;
  defaultValues: IStartupFormValues;
}

export const FormAndUpdate: React.FC<PropsFormAndUpdate> = ({
  children,
  coverImageUrl,
  pitchDeckUrl,
  defaultValues,
}) => {
  // VARS
  const [formReadonly, setFormReadyOnly] = useState(true);

  // JSX
  return (
    <>
      {" "}
      <div className="flex justify-end items-center">
        <div className="flex gap-2 justify-center items-center">
          <Button
            onClick={() => setFormReadyOnly((prev) => !prev)}
            variant="outline"
          >
            <Pencil />
            Edit
          </Button>
          {children}
        </div>
      </div>
      <StartupForm
        step={5}
        formReadonly={formReadonly}
        defaultValues={defaultValues}
        coverImageUrl={coverImageUrl}
        pitchDeckUrl={pitchDeckUrl}
      />
    </>
  );
};
