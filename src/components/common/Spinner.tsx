import React from "react";

interface SpinnerProps {
  message: string;
}

export default function Spinner({ message }: SpinnerProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      <span className="ml-2 text-gray-500">{message}</span>
    </div>
  );
}
