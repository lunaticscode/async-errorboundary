import { useState } from "react";

const useCatchAsyncError = () => {
  const [_, setAsyncError] = useState<Error | undefined>(undefined);

  const catchAsyncError = (error: Error | any) => {
    setAsyncError(() => {
      throw error;
    });
  };
  return catchAsyncError;
};

export default useCatchAsyncError;
