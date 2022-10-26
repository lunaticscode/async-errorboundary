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
