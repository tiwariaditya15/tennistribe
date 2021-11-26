import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const logged = useAppSelector((state) => state.auth.logged);
  const location = useLocation();
  if (!logged) {
    return <Navigate to="/signin" state={{ from: location }} replace={true} />;
  }
  return children;
}
