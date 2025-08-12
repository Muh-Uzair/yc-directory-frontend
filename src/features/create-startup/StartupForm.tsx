import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  step: number;
}

const StartupForm: React.FC<Props> = ({ step }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <div className="py-8">
      <Card>
        <form>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Card Title 1</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent></CardContent>{" "}
            </>
          )}
          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Card Title 2</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent></CardContent>{" "}
            </>
          )}
          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>Card Title 3</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent></CardContent>{" "}
            </>
          )}
          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle>Card Title 4</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent></CardContent>{" "}
            </>
          )}
          {step === 5 && (
            <>
              <CardHeader>
                <CardTitle>Card Title 5</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent></CardContent>{" "}
            </>
          )}
          {step === 6 && (
            <>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description 6</CardDescription>
              </CardHeader>
              <CardContent></CardContent>{" "}
            </>
          )}
        </form>
      </Card>
    </div>
  );
};

export default StartupForm;
