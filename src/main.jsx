// react router
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// style
import "./index.css";

// pages
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Header from "./components/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <div>404</div>,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
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
