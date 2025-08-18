import { AlertTriangle } from "lucide-react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ErrorComponent: React.FC<Props> = ({ children }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <div className="flex w-full h-screen items-center justify-center  px-4">
      <div className="max-w-md w-full text-center bg-background p-8 rounded-2xl shadow-lg border">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>

        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Something went wrong
        </h2>
        <p className="text-muted-foreground mb-6">
          We couldn’t process your request. You can try again or return to your
          dashboard.
        </p>

        {children}
      </div>
    </div>
  );
};

export default ErrorComponent;
