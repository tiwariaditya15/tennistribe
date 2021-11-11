import { useAppSelector } from "../../app/hooks";

export default function PrivateRoute() {
  const logged = useAppSelector((state) => state.auth.logged);
}
