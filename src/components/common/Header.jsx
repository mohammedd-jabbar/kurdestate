import { useEffect, useState, useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { notifications } from "./Notifications";
import NavbarDropDown from "./NavbarDropDown";
import { UserInfoContext } from "../../store/UserInfoProvider";
import Spinner from "../common/Spinner";

const Header = () => {
  // users url location
  let location = useLocation();
  // go to this url
  const navigateTo = useNavigate();
  // show and hide the dropdown
  const [isDropDown, setIsDropDown] = useState(false);
  // dropdown for language inside the dropdown
  const [isLanguage, setIsLanguage] = useState(false);

  const [isContentDropDown, setIsContentDropDown] = useState(false);
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
  }, [data, isError]);

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
  const toggleContentDropDown = () => {
    setIsContentDropDown(!isContentDropDown);
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
    style = "md:!border-b-primary-500 md:!text-black"
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
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto ">
          <div>
            <Link to="/">
              <h1 className="h-5 cursor-pointer text-2xl flex items-center justify-center font-bold">
                Kurd <span className="text-primary-500">Estate</span>
              </h1>
            </Link>
          </div>
          <div>
            <ul
              className={`md:flex md:items-center md:pb-0 pb-4 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:mr-[65px] md:space-x-10 md:w-auto md:pl-0 transition-all duration-[400ms] ease-in-out ${
                isContentDropDown
                  ? "max-md:top-12 max-md:pt-4 max-md:shadow-md"
                  : "-top-[44rem] max-md:opacity-0"
              }`}
            >
              <Link to="/category/rent">
                <li
                  className={`py-3 cursor-pointer transition duration-500 ease-in-out text-base font-semibold text-gray-500 border-b-[3px] border-b-transparent max-md:hover:bg-slate-200 px-4 max-md:hover:rounded-md ${getActiveRouteStyles(
                    "/category/rent"
                  )}`}
                  onClick={toggleContentDropDown}
                >
                  Rent
                </li>
              </Link>
              <Link to="/category/sell">
                <li
                  className={`py-3 cursor-pointer text-base font-semibold text-gray-500 border-b-[3px] border-b-transparent max-md:hover:bg-slate-200 px-4 max-md:hover:rounded-md ${getActiveRouteStyles(
                    "/category/sell"
                  )}`}
                  onClick={toggleContentDropDown}
                >
                  Sell
                </li>
              </Link>
              <Link to="/offers">
                <li
                  className={`py-3 cursor-pointer transition duration-500 ease-in-out text-base font-semibold text-gray-500 border-b-[3px] border-b-transparent max-md:hover:bg-slate-200 px-4 max-md:hover:rounded-md ${getActiveRouteStyles(
                    "/offers"
                  )}`}
                  onClick={toggleContentDropDown}
                >
                  Offers
                </li>
              </Link>
            </ul>
          </div>
          <div>
            {userAuth ? (
              <div className="flex justify-center items-center">
                <div className="md:hidden">
                  <button className="relative" onClick={toggleContentDropDown}>
                    <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all ring-0    ring-opacity-30 duration-200">
                      <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                        {!isContentDropDown && (
                          <>
                            <div className="bg-gray-950 h-[2px] w-7 transform transition-all duration-300 origin-left focus:translate-x-10"></div>
                            <div className="bg-gray-950 h-[2px] w-7 rounded transform transition-all duration-300 focus:translate-x-10 delay-75"></div>
                            <div className="bg-gray-950 h-[2px] w-7 transform transition-all duration-300 origin-left focus:translate-x-10 delay-150"></div>
                          </>
                        )}

                        {isContentDropDown && (
                          <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5  translate-x-0 flex w-12">
                            <div className="absolute bg-gray-950 h-[2px] w-5 transform transition-all duration-500  delay-300 rotate-45"></div>
                            <div className="absolute bg-gray-950 h-[2px] w-5 transform transition-all duration-500  delay-300 -rotate-45"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
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
              </div>
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
