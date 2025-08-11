import React, { ReactNode } from "react";
import LayoutHeader from "./LayoutHeader";

interface Props {
  children: ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <div>
      <LayoutHeader />
      <div className="pt-[50px] h-screen tab:pl-[80px] p-3">{children}</div>
      <div className="hidden tab:flex fixed left-0 w-[80px] bottom-0 top-[50px] bg-primary">
        s
      </div>
    </div>
  );
};

export default DashboardLayout;
