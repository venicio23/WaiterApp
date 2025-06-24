import { GlobalStyles } from "./styles/GlobalStyles";
import { Header } from "./components/Header";

export function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <div>
        <h1>Welcome to the React App</h1>
        <p>This is a simple React application.</p>
      </div>
    </>
  );
}
