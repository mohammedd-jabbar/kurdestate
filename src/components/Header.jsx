import { Link, Outlet, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // this function is used to check if the current route is the same as the route passed as an argument and return some different styles
  const pathMatcheRoute = (route) => {
    return location.pathname === route ? "!border-b-red-500 !text-black" : "";
  };
  return (
    <>
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
          <div>
            <Link to="/">
              <img
                src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                className="h-5 cursor-pointer"
                alt="logo"
              />{" "}
            </Link>
          </div>
          <div>
            <ul className="flex space-x-10">
              <Link to="/">
                <li
                  className={`py-3 cursor-pointer text-base font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatcheRoute(
                    "/"
                  )}`}
                >
                  Home
                </li>
              </Link>
              <Link to="/offers">
                <li
                  className={`py-3 cursor-pointer text-base font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatcheRoute(
                    "/offers"
                  )}`}
                >
                  Offers
                </li>
              </Link>
              <Link to="/sign-in">
                <li
                  className={`py-3 cursor-pointer text-base font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatcheRoute(
                    "/sign-in"
                  )}`}
                >
                  Sign in
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
