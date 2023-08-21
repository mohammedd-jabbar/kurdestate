// react router
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// style
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// pages
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Header from "./components/Header";
import { PrivateRoute } from "./components/PrivateRoute";
import CreateList from "./pages/CreateList";
import Editlisting from "./pages/Editlisting";

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
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Profile />,
            errorElement: <div>404</div>,
          },
        ],
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

      {
        path: "create",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <CreateList />,
            errorElement: <div>404</div>,
          },
        ],
      },
      {
        path: "edit/:listId",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Editlisting />,
            errorElement: <div>404</div>,
          },
        ],
      },
      {
        path: "*",
        element: <div>Not found</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
    />
    {/* this is provider for react router */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
