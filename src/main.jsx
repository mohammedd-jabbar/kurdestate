// react router
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { Toaster } from "sonner";

// style
import "./index.css";

// pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/common/Header";
import { PrivateRoute } from "./components/common/PrivateRoute";
import { PrivateLoginRoute } from "./components/common/PrivateLoginRoute";
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
import ListingIdProvider from "./store/ListingIdProvider";
import "./i18n.js";
import Error from "./components/common/Error";
import Spinner from "./components/common/Spinner";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "settings",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Setting />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "login",
        element: <PrivateLoginRoute />,
        children: [
          {
            index: true,
            element: <Login />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "sign-up",
        element: <PrivateLoginRoute />,
        children: [
          {
            index: true,

            element: <SignUp />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "forgot-password",
        element: <PrivateLoginRoute />,
        children: [
          {
            index: true,

            element: <ForgotPassword />,
            errorElement: <Error />,
          },
        ],
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
            errorElement: <Error />,
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
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <QueryClientProvider client={queryClient}>
        <ListingIdProvider>
          <ListingsInfoProvider>
            <UserInfoProvider>
              <SearchResultProvider>
                <SidebarProvider>
                  {/* this is provider for react router */}
                  <RouterProvider router={router} />
                </SidebarProvider>
              </SearchResultProvider>
            </UserInfoProvider>
          </ListingsInfoProvider>
        </ListingIdProvider>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
