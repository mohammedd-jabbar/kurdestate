// react router
import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

// style
import "./index.css";

// pages
// import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div>Navbar</div>
        <Outlet />
      </>
    ),
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <div>index</div>,
        errorElement: <div>404</div>,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "sign-in",
        element: <Signin />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "offers",
        element: <Offers />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* this is provider for react router */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
