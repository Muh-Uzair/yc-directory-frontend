import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageHeading: React.FC<Props> = ({ children }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <div>
      <span className="text-2xl font-semibold">{children}</span>
    </div>
  );
};

export default PageHeading;
