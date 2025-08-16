"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import StartupForm from "./StartupForm";

const StartupStepProgressForm: React.FC = () => {
  // VARS
  const [step, setStep] = useState<number>(1);

  // FUNCTIONS

  // JSX
  return (
    <div>
      <section className="p-8 w-full flex justify-center items-center">
        <div className="rounded-full bg-primary-extra-light w-[50px] h-[50px] flex justify-center items-center">
          <span className="text-2xl font-extrabold text-primary">{step}</span>
        </div>
      </section>
      <section>
        <Progress value={(step / 5) * 100} max={5} />
      </section>

      <StartupForm step={step} />

      <section className="flex items-center justify-end gap-3">
        <Button
          variant={"outline"}
          disabled={step === 1}
          onClick={() => setStep((prev) => prev - 1)}
        >
          <ArrowLeft />
          Prev
        </Button>
        <Button
          variant={"outline"}
          disabled={step === 5}
          onClick={() => setStep((prev) => prev + 1)}
        >
          <ArrowRight />
          Next
        </Button>
      </section>
    </div>
  );
};

export default StartupStepProgressForm;
