// react router
import React, { Suspense } from "react";
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
import Header from "./components/common/Header";
import { PrivateRoute } from "./components/common/PrivateRoute";
import CreateList from "./pages/CreateList";
import Editlisting from "./pages/Editlisting";
import Listing from "./pages/Listing";
import Category from "./pages/Category";
import Setting from "./pages/Setting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserInfoProvider from "./store/UserInfoProvider";
import SidebarProvider from "./store/SidebarProvider";
import ListingsInfoProvider from "./store/ListingsInfoProvider";
import SearchResultProvider from "./store/SearchResultProvider";
import "./i18n.js";

const queryClient = new QueryClient();

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
        path: "settings",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Setting />,
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
        path: "category/:categoryName",
        element: <Category />,
      },
      {
        path: "category/:categoryName/:listingId",
        element: <Listing />,
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
    <Suspense fallback="Loading...">
      <QueryClientProvider client={queryClient}>
        <ListingsInfoProvider>
          <UserInfoProvider>
            <SearchResultProvider>
              <SidebarProvider>
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
              </SidebarProvider>
            </SearchResultProvider>
          </UserInfoProvider>
        </ListingsInfoProvider>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
