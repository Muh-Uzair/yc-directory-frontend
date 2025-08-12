import React, { ReactNode } from "react";
import LayoutHeader from "./LayoutHeader";
import DashboardSidebar from "./DashboardSidebar";

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
      <div className="pt-[50px] tab:pl-[80px] laptopM:pl-[250px]">
        <div className="p-3 h-screen">{children}</div>
      </div>
      <DashboardSidebar />
    </div>
  );
};

export default DashboardLayout;
