import React, { ReactNode } from "react";
import LayoutHeader from "./LayoutHeader";

interface IAppLayout {
  children: ReactNode;
}

const AppLayout: React.FC<IAppLayout> = async ({ children }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <div>
      <LayoutHeader />
      <div className="pt-[50px] p-3">{children}</div>
    </div>
  );
};

export default AppLayout;
