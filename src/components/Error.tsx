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
