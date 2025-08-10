import React from "react";
import { Loader } from "lucide-react";

interface Props {
  size?: number | string;
}

const LoadingSpinner: React.FC<Props> = ({ size = 14 }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return <Loader className={`animate-spin text-[${size}px]`} />;
};

export default LoadingSpinner;
