import React from "react";

interface SpinnerProps {
  message: string;
}

const Spinner = ({ message }: SpinnerProps) => {
  return (
    <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      <span className="ml-2 text-gray-500">{message}</span>
    </div>
  );
};

export default Spinner;
