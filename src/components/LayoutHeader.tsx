import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getCurrUser } from "@/server-actions/get-curr-user";
import { CurrUserMenu } from "./CurrUserMenu";
import YcDirectoryLogo from "./YcDirectoryLogo";

const LayoutHeader: React.FC = async () => {
  // VARS
  const user = await getCurrUser();

  // FUNCTIONS

  // JSX
  return (
    <header className="flex h-[50px] fixed left-0  z-10 right-0 top-0 p-3 bg-stone-100 items-center justify-between border-b-[1px] border-primary">
      <div>
        <YcDirectoryLogo />
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
        <div className="block">
          <CurrUserMenu />
        </div>
      )}
    </header>
  );
};

export default LayoutHeader;
