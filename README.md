# `Catch the async-error(axios) using Errorboundary`

## `components`

> ### ErrorBoundary.tsx

```tsx
import React, { ReactElement, ReactNode } from "react";
interface ErrorBoundaryProps {
  FallbackComponent: ReactElement;
  children?: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
const initialState = { hasError: false, error: undefined };
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    console.log("getDerivedStateFromError ::: \n", { error });
    return { ...initialState, hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    this.setState({ hasError: true, error });
  }

  render() {
    return this.state.hasError
      ? React.cloneElement(this.props.FallbackComponent, {
          error: this.state.error,
        })
      : this.props.children;
  }
}
```

> ### Error.tsx (Fallback Component)

```tsx
import { FC } from "react";
import { AxiosError } from "axios";
interface ErrorProps {
  error?: Error;
}
const BackButton: FC = () => {
  return <button onClick={() => (location.href = "/")}>back</button>;
};
const Error: FC<ErrorProps> = ({ ...props }) => {
  const { error } = props;
  return error instanceof AxiosError ? (
    <>
      <div>API Error</div>
      <BackButton />
    </>
  ) : (
    <>
      <div>UI Error</div>
      <BackButton />
    </>
  );
};

export default Error;
```

#

## `hooks`

> ### useCatchAsyncError.ts (Custom hook)

```ts
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
```
