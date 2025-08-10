import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface IAppLayout {
  children: ReactNode;
}

const AppLayout: React.FC<IAppLayout> = ({ children }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <div>
      <header className="flex h-[50px] p-3 bg-stone-100 items-center justify-between border-b-[1px] border-primary">
        <div>
          <span className="text-primary font-bold">YC Directory</span>
        </div>
        <div className="flex gap-x-2">
          <Button variant={"outline"}>
            <Link href={"/sign-up"}>Sign up</Link>
          </Button>
          <Button>
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
        </div>
      </header>
      <div className="p-3">{children}</div>
    </div>
  );
};

export default AppLayout;
