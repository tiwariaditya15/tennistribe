import { Routes, Route } from "react-router-dom";
import { Home } from "../../app/pages";
import PrivateRoute from "./PrivateRoute";

import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
