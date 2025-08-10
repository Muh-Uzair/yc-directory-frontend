import React from "react";

interface Props {
  message: string | undefined;
}

const FormErrorMessage: React.FC<Props> = ({ message }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return <p className="text-red-500 text-sm p-2">{message}</p>;
};

export default FormErrorMessage;
