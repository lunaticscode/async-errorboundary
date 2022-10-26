import axios from "axios";
import { useEffect } from "react";
import useCatchAsyncError from "./hooks/useCatchAsyncError";

function App() {
  const catchAsyncError = useCatchAsyncError();
  const callDumbApi = () => {
    axios
      .get("http://dumbapi.hw") // must be 404 error
      .then((res) => res.data)
      .catch((err) => {
        catchAsyncError(err);
      });
  };

  useEffect(() => {
    //* UI 에러 강제 발생
    // throw new Error("this is custom error");
  }, []);
  return (
    <div className="App">
      <button onClick={callDumbApi}>api-error-test</button>
    </div>
  );
}

export default App;
