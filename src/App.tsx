import { useValidateTokenQuery } from "./app/services/auth";
import { Router, Navbar } from "./features/auth/";

function App() {
  useValidateTokenQuery();
  return (
    <>
      <Navbar />
      <Router />
    </>
  );
}

export default App;
