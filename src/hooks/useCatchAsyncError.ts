import { useState } from "react";

const useCatchAsyncError = () => {
  const [_, setAsyncError] = useState();

  const catchAsyncError = (error: Error) => {
    setAsyncError(() => {
      throw error;
    });
  };
  return catchAsyncError;
};

export default useCatchAsyncError;
