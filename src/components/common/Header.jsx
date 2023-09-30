import { useEffect, useState, useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { notifications } from "./Notifications";
import NavbarDropDown from "./NavbarDropDown";
import { UserInfoContext } from "../../store/UserInfoProvider";
import Spinner from "../common/Spinner";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Header = () => {
  // users url location
  let location = useLocation();
  // go to this url
  const navigateTo = useNavigate();
  // show and hide the dropdown
  const [isDropDown, setIsDropDown] = useState(false);
  // show and hide the dropdown
  const [isCategoryDropDown, setIsCategoryDropDown] = useState(false);

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

  const { t, i18n } = useTranslation();

  // get the language
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

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
  const toggleCategoryDropDown = () => {
    setIsCategoryDropDown(!isCategoryDropDown);
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
  const getActiveRouteStyles = (route, style = "!text-black") => {
    return location.pathname === route ? style : "";
  };

  return (
    <>
      <div
        className={`transition-all duration-200 ease-in-out border-b py-1 shadow-md bg-headerBackground  ${
          isNavbarScroll && "bg-headerBackground py-2"
        } sticky w-full top-0 z-40`}
      >
        <header
          className={`flex text-black justify-between px-3 max-w-6xl mx-auto`}
        >
          <div className="flex items-center justify-normal font-bold space-x-4">
            <h1 className="cursor-pointer text-2xl">
              <a href="/">
                Kurd
                <span className={`text-primary-500`}>Estate</span>
              </a>
            </h1>
            <nav className="font-semibold text-lg">
              <ul
                className={`md:flex md:items-center md:pb-0 pb-4 absolute md:static md:z-auto z-[-1] left-0 w-full md:mr-[65px]  md:w-auto md:pl-0 max-md:transition-all max-md:duration-300 max-md:ease-in-out bg-white ${
                  isContentDropDown
                    ? "max-md:top-12 max-md:pt-4 max-md:shadow-md"
                    : "-top-[44rem] max-md:opacity-0"
                }`}
              >
                <li
                  className={`flex items-center justify-between relative cursor-pointer text-lg font-semibold px-8 max-md:px-4 max-md:hover:rounded-md text-gray-500 max-md:hover:bg-slate-100 ${getActiveRouteStyles(
                    "/category/sell"
                  )}  ${isContentDropDown && `max-md:py-4 max-md:my-2`}`}
                  onClick={toggleCategoryDropDown}
                >
                  Category
                  <FiChevronDown
                    className={`ml-1 transition-all duration-300 ease-in-out ${
                      isCategoryDropDown && "rotate-180"
                    }`}
                  />
                  <div
                    className={`absolute mt-1 p-2 right-4 top-11 md:right-0 md:top-7 min-w-max shadow rounded  ${
                      isCategoryDropDown ? "block" : "hidden"
                    } bg-white border border-border transition delay-75 ease-in-out z-10`}
                  >
                    <ul className="block text-right text-gray-900">
                      <li>
                        <a
                          href="/category/rent"
                          className="block px-3 text-gray-500 border-b py-2 hover:bg-slate-100"
                        >
                          Rent
                        </a>
                      </li>
                      <li>
                        <a
                          href="/category/sell"
                          className="block px-3 text-gray-500 border-b py-2 hover:bg-slate-100"
                        >
                          Sell
                        </a>
                      </li>
                      <li>
                        <a
                          href="/category/house"
                          className="block px-3 text-gray-500 border-b py-2 hover:bg-slate-100"
                        >
                          Houses
                        </a>
                      </li>
                      <li>
                        <a
                          href="/category/apartment"
                          className="block px-3 text-gray-500 border-b py-2 hover:bg-slate-100"
                        >
                          Apartments
                        </a>
                      </li>
                      <li>
                        <a
                          href="/category/land"
                          className="block px-3 text-gray-500 border-b py-2 hover:bg-slate-100"
                        >
                          Land
                        </a>
                      </li>
                      <li>
                        <a
                          href="category/shop"
                          className="block px-3 text-gray-500 py-2 hover:bg-slate-100"
                        >
                          Shops
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
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
                            <div
                              className={`bg-gray-950 ${
                                location.pathname === "/" &&
                                !isNavbarScroll &&
                                "!bg-primary-500"
                              } h-[2px] w-7 transform transition-all duration-300 origin-left focus:translate-x-10`}
                            ></div>
                            <div
                              className={`bg-gray-950 ${
                                location.pathname === "/" &&
                                !isNavbarScroll &&
                                "!bg-primary-500"
                              } h-[2px] w-7 rounded transform transition-all duration-300 focus:translate-x-10 delay-75`}
                            ></div>
                            <div
                              className={`bg-gray-950 ${
                                location.pathname === "/" &&
                                !isNavbarScroll &&
                                "!bg-primary-500"
                              } h-[2px] w-7 transform transition-all duration-300 origin-left focus:translate-x-10 delay-150`}
                            ></div>
                          </>
                        )}

                        {isContentDropDown && (
                          <div
                            className={`absolute items-center justify-between transform transition-all duration-500 top-2.5  translate-x-0 flex w-12`}
                          >
                            <div
                              className={`absolute ${
                                location.pathname === "/" &&
                                !isNavbarScroll &&
                                "bg-primary-500"
                              } bg-gray-950 h-[2px] w-5 transform transition-all duration-500  delay-300 rotate-45`}
                            ></div>
                            <div
                              className={`absolute ${
                                location.pathname === "/" &&
                                !isNavbarScroll &&
                                "bg-primary-500"
                              } bg-gray-950 h-[2px] w-5 transform transition-all duration-500  delay-300 -rotate-45`}
                            ></div>
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
                  handleLanguageChange={handleLanguageChange}
                  isLanguage={isLanguage}
                  isDropDown={isDropDown}
                  firstLetter={firstLetter}
                  profilePhoto={profilePhoto}
                  name={name}
                  email={email}
                />
              </div>
            ) : (
              <div className="space-x-5 py-2">
                <Link to="/login">
                  <button
                    // Login Button: white background with an outline. Sign Up Button: Blue background without an outline.

                    // When the Login button is clicked, the Sign Up button outline becomes visible to differentiate between the two buttons. This approach ensures clarity when both buttons have a blue background.
                    className={`shadow-sm  ${
                      // If on the "/login" page, style as active Login button.
                      location.pathname === "/login"
                        ? `cursor-pointer text-base font-semibold transition duration-200 ease-in-out border-2 px-4 py-[5px] rounded-lg bg-primary-500 border-primary-500 !text-white hover:bg-primary-600 hover:border-primary-600 hover:shadow focus:outline-none active:bg-primary-700 active:border-primary-700`
                        : // If not on "/login", style as inactive Login button.
                          `cursor-pointer text-base font-semibold transition duration-200 ease-in-out text-gray-500 border-2 px-4 py-[5px] rounded-lg border-border hover:shadow focus:outline-none`
                    } `}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button
                    className={`shadow-sm ${
                      // If on the "/login" page, style as inactive Sign Up button.
                      location.pathname === "/login"
                        ? `cursor-pointer text-base font-semibold transition duration-200 ease-in-out text-gray-500 border-2 px-4 py-[5px] rounded-lg border-border hover:shadow focus:outline-none`
                        : // If not on "/login", style as active Sign Up button.
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
