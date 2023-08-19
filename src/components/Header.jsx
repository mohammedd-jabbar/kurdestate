import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const location = useLocation();

  const [pageState, setPageState] = useState("Sign In");
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  }, [auth]);

  // this function is used to check if the current route is the same as the route passed as an argument and return some different styles
  const getActiveRouteStyles = (route) => {
    return location.pathname === route ? "!border-b-red-500 !text-black" : "";
  };

  return (
    <>
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
          <div>
            <Link to="/">
              <h1 className="h-5 cursor-pointer text-2xl flex items-center justify-center font-bold">
                Kurd <span className="text-red-600">Homes</span>
              </h1>
            </Link>
          </div>
          <div>
            <ul className="flex space-x-10">
              <Link to="/">
                <li
                  className={`py-3 cursor-pointer text-base font-semibold text-gray-400 border-b-[3px] border-b-transparent ${getActiveRouteStyles(
                    "/"
                  )}`}
                >
                  Home
                </li>
              </Link>
              <Link to="/offers">
                <li
                  className={`py-3 cursor-pointer text-base font-semibold text-gray-400 border-b-[3px] border-b-transparent ${getActiveRouteStyles(
                    "/offers"
                  )}`}
                >
                  Offers
                </li>
              </Link>
              <Link to="/profile">
                <li
                  className={`py-3 cursor-pointer text-base font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                    getActiveRouteStyles("/sign-in") ||
                    getActiveRouteStyles("/profile")
                  }`}
                >
                  {pageState}
                </li>
              </Link>
            </ul>
          </div>
        </header>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
