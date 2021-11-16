import { Router, Navbar } from "./features/auth/";
import { useGetCurrentUserQuery } from "./app/services/auth";
function App() {
  const { data, isLoading, isError, error } = useGetCurrentUserQuery();
  return (
    <>
      <Navbar />
      <Router />
    </>
  );
}

export default App;
