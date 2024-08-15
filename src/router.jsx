import { createBrowserRouter } from "react-router-dom";
import { Historic } from "./pages/historic";

import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Home } from "./pages/home";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/historic",
    element: <Historic />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
