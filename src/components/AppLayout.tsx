import React, { ReactNode } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getCurrUser } from "@/server-actions/get-curr-user";
import { CurrUserMenu } from "./CurrUserMenu";

interface IAppLayout {
  children: ReactNode;
}

const AppLayout: React.FC<IAppLayout> = async ({ children }) => {
  // VARS
  const user = await getCurrUser();

  // FUNCTIONS

  // JSX
  return (
    <div>
      <header className="flex h-[50px] p-3 bg-stone-100 items-center justify-between border-b-[1px] border-primary">
        <div>
          <span className="text-primary font-bold">YC Directory</span>
        </div>
        {!user && (
          <div className="flex gap-x-2">
            <Button variant={"outline"}>
              <Link href={"/sign-up"}>Sign up</Link>
            </Button>
            <Button>
              <Link href={"/sign-in"}>Sign in</Link>
            </Button>
          </div>
        )}
        {user && (
          <div>
            <CurrUserMenu />
          </div>
        )}
      </header>
      <div className="p-3">{children}</div>
    </div>
  );
};

export default AppLayout;
