import { Routes, Route } from "react-router-dom";
import { Explore, Home, Post, Profile } from "../../app/pages";
import PrivateRoute from "./PrivateRoute";

import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/explore" element={<Explore />} />
      <Route
        path="/post/:postId"
        element={
          <PrivateRoute>
            <Post />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
