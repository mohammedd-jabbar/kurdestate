import { useEffect, useState, useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { notifications } from "./Notifications";
import NavbarDropDown from "./NavbarDropDown";
import { UserInfoContext } from "../../store/UserInfoProvider";
import Spinner from "../common/Spinner";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  // users url location
  let location = useLocation();
  // go to this url
  const navigateTo = useNavigate();
  // show and hide the dropdown
  const [isDropDown, setIsDropDown] = useState(false);
  // dropdown for language inside the dropdown
  const [isLanguage, setIsLanguage] = useState(false);
  // navbar scroll animation
  const [isNavbarScroll, setIsNavbarScroll] = useState(false);
  const [userAuth, setUserAuth] = useState(false);

  // navbar animation
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        setIsNavbarScroll(true);
      } else {
        setIsNavbarScroll(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  // get user from firebase auth
  const auth = getAuth();
  // users data
  const { data, isLoading, isFetching, isError } = useContext(UserInfoContext);

  // user information for the dropdown
  const [user, setUser] = useState({
    firstLetter: "",
    profilePhoto: "",
    name: "",
    email: "",
  });

  const { firstLetter, profilePhoto, name, email } = user;

  useEffect(() => {
    // if user logged in show the users information
    if (data && data !== undefined) {
      // if user logged in with google set user's image to the dropdown
      if (data?.emailVerified) {
        setUser((prev) => ({
          ...prev,
          firstLetter: "",
          profilePhoto: data?.photoURL,
          name: data?.displayName,
          email: data?.email,
        }));
        setUserAuth(true);
        // if user logged in with email and password, get users first name and set as an image
      } else {
        const fetchUser = async () => {
          const fullName = data.displayName;
          const firstLetterName = fullName.charAt(0);

          setUser((prevUser) => ({
            ...prevUser,
            name: data.displayName,
            email: data.email,
            firstLetter: firstLetterName,
          }));
          setUserAuth(true);
        };
        fetchUser();
      }
      // if user not Authenticated then set auth to false
    } else if (isError && isError.isNotAuthenticated) {
      setUserAuth(false);
    }
  }, [data]);

  // loading spinner while user fetching is loading
  if (isLoading || isFetching) {
    return <Spinner />;
  }

  // toggle dropdowns
  const toggleDropdown = () => {
    setIsDropDown(!isDropDown);
  };
  const toggleLanguageDropdown = () => {
    setIsLanguage(!isLanguage);
  };

  // when user logout redirect user to the homepage
  const handleLogout = () => {
    try {
      auth.signOut(auth); // Sign out the current user and update the state
      navigateTo("/");
      window.location.reload();
    } catch (error) {
      notifications("You can't logout", true);
    }
  };

  // this function is used to check if the current route is the same as the route passed as an argument and return some different styles
  const getActiveRouteStyles = (
    route,
    style = "!border-b-primary-500 !text-black"
  ) => {
    return location.pathname === route ? style : "";
  };

  return (
    <>
      <div
        className={`${
          isNavbarScroll ? "border-b py-1 shadow-md" : " py-0 "
        } sticky w-full bg-headerBackground border-b shadow top-0 z-40 transition-all duration-300 ease-in-out`}
      >
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto max-sm:py-2">
          <div>
            <Link to="/">
              <h1 className="h-5 cursor-pointer text-2xl flex items-center justify-center font-bold">
                Kurd <span className="text-primary-500">Estate</span>
              </h1>
            </Link>
          </div>
          <div>
            <ul
              className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
                isDropDown ? "top-12 pt-6" : "top-[-490px]"
              }`}
            >
              <Link to="/category/rent">
                <li
                  className={`py-3 cursor-pointer transition duration-500 ease-in-out text-base font-semibold text-gray-500 border-b-[3px] border-b-transparent ${getActiveRouteStyles(
                    "/category/rent"
                  )}`}
                >
                  Rent
                </li>
              </Link>
              <Link to="/category/sale">
                <li
                  className={`py-3 cursor-pointer text-base font-semibold text-gray-500 border-b-[3px] border-b-transparent ${getActiveRouteStyles(
                    "/category/sale"
                  )}`}
                >
                  Sell
                </li>
              </Link>
              <Link to="/offers">
                <li
                  className={`py-3 cursor-pointer transition duration-500 ease-in-out text-base font-semibold text-gray-500 border-b-[3px] border-b-transparent ${getActiveRouteStyles(
                    "/offers"
                  )}`}
                >
                  Offers
                </li>
              </Link>
            </ul>
          </div>
          <div>
            {/* <RxHamburgerMenu className="text-3xl font-extrabold text-gray-950" /> */}
            {userAuth ? (
              <NavbarDropDown
                handleLogout={handleLogout}
                toggleDropdown={toggleDropdown}
                toggleLanguageDropdown={toggleLanguageDropdown}
                isLanguage={isLanguage}
                isDropDown={isDropDown}
                firstLetter={firstLetter}
                profilePhoto={profilePhoto}
                name={name}
                email={email}
              />
            ) : (
              <div className="space-x-5">
                <Link to="/sign-in">
                  <button
                    // Login Button: white background with an outline. Sign Up Button: Blue background without an outline.

                    // When the Login button is clicked, the Sign Up button outline becomes visible to differentiate between the two buttons. This approach ensures clarity when both buttons have a blue background.
                    className={`shadow-sm ${
                      // If on the "/sign-in" page, style as active Login button.
                      location.pathname === "/sign-in"
                        ? `cursor-pointer text-base font-semibold transition duration-200 ease-in-out border-2 px-4 py-[5px] rounded-lg bg-primary-500 border-primary-500 !text-white hover:bg-primary-600 hover:border-primary-600 hover:shadow focus:outline-none active:bg-primary-700 active:border-primary-700`
                        : // If not on "/sign-in", style as inactive Login button.
                          `cursor-pointer text-base font-semibold transition duration-200 ease-in-out text-gray-500 border-2 px-4 py-[5px] rounded-lg border-border hover:shadow focus:outline-none`
                    }`}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button
                    className={`shadow-sm ${
                      // If on the "/sign-in" page, style as inactive Sign Up button.
                      location.pathname === "/sign-in"
                        ? `cursor-pointer text-base font-semibold transition duration-200 ease-in-out text-gray-500 border-2 px-4 py-[5px] rounded-lg border-border hover:shadow focus:outline-none`
                        : // If not on "/sign-in", style as active Sign Up button.
                          `cursor-pointer text-base font-semibold transition duration-200 ease-in-out text-white bg-primary-500 border-2 border-primary-500 px-4 py-[5px] rounded-lg hover:bg-primary-600 hover:border-primary-600 hover:shadow focus:outline-none active:bg-primary-700 active:border-primary-700`
                    }`}
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>

      <Outlet />
    </>
  );
};

export default Header;
