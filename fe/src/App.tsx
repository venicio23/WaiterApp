import { ToastContainer } from "react-toastify";
import { Router } from "./Router";
import { GlobalStyles } from "./styles/GlobalStyles";

export function App() {
  return (
    <>
      <GlobalStyles />
      <Router />
      <ToastContainer position="bottom-center" autoClose={3000} />
    </>
  );
}
