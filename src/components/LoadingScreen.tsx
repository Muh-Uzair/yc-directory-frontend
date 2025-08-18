import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingScreen: React.FC = () => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoadingSpinner color="primary" />
    </div>
  );
};

export default LoadingScreen;
