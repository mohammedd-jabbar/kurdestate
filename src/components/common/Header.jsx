import { useEffect, useState, useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { notifications } from "./Notifications";
import NavbarDropDown from "./NavbarDropDown";
import { UserInfoContext } from "../../store/UserInfoProvider";
import Spinner from "../common/Spinner";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTranslation } from "react-i18next";
import { Toaster } from "sonner";
import LanguageDropDown from "./LanguageDropDown";
import useDarkSide from "./darkmode/useDarkSide";
import DropdownButton from "./DropdownButton";

const Header = () => {
  // users url location
  let location = useLocation();
  // go to this url
  const navigateTo = useNavigate();

  const { t, i18n } = useTranslation("header");

  // show and hide the dropdown
  const [isDropDown, setIsDropDown] = useState(false);
  // show and hide the dropdown
  const [isLanguageDropDown, setIsLanguageDropDown] = useState(false);

  const [isContentDropDown, setIsContentDropDown] = useState(false);
  // navbar scroll animation
  const [isNavbarScroll, setIsNavbarScroll] = useState(false);

  const [userAuth, setUserAuth] = useState(false);

  // get the dark mode
  const [themeColor, setThemeColor] = useState("light");

  // dark mode stuff:
  const [colorTheme, setTheme] = useDarkSide();

  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    const color = localStorage.getItem("theme");
    setThemeColor(color);
    setTheme(colorTheme);
    setDarkSide(checked);
  };

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
  const toggleLanguageDropdown = () => {
    setIsLanguageDropDown(!isLanguageDropDown);
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

  return (
    <>
      <Toaster
        richColors
        position="top-center"
        invert="true"
        theme={themeColor === "dark" ? "dark" : "light"}
      />
      <div
        className={`transition-all duration-200 ease-in-out border-b py-1 shadow-md bg-headerBackground dark:bg-darkBackground  ${
          isNavbarScroll && "py-2"
        } sticky w-full top-0 z-40`}
        dir={i18n.language === "ku" ? "rtl" : "ltr"}
      >
        <header
          className={`flex text-black dark:text-white justify-between px-3 max-w-6xl mx-auto`}
        >
          <div className="flex items-center justify-normal font-bold space-x-4 rtl:space-x-0">
            <h1 className="cursor-pointer text-2xl">
              <a href="/">
                {t("Kurd")}
                <span className={`text-primary-500`}>{t("Estate")}</span>
              </a>
            </h1>
            <nav className="font-semibold text-lg ">
              <ul
                className={`lg:flex rtl:lg:mr-4 ltr:lg:ml-4 lg:items-center lg:pb-0 pb-4 absolute lg:static lg:z-auto z-[-1] left-0 w-full ltr:lg:mr-[65px] lg:w-auto lg:pl-0 max-lg:transition-all max-lg:duration-300 max-lg:ease-in-out max-lg:bg-white max-lg:dark:bg-darkBackground ${
                  isContentDropDown
                    ? "max-lg:top-[3.6rem] max-lg:shadow-lg"
                    : "-top-[44rem] max-lg:opacity-0"
                }`}
              >
                {!userAuth && (
                  <li
                    className={`md:hidden flex items-center justify-center relative cursor-pointer text-lg font-semibold px-8 max-lg:px-4 max-lg:hover:rounded-lg `}
                  >
                    <div className="text-center space-x-5 rtl:space-x-reverse py-2">
                      <Link to="/login">
                        <button
                          onClick={toggleContentDropDown}
                          className={`shadow-sm  ${
                            // If on the "/login" page, style as active Login button.
                            location.pathname === "/login"
                              ? `cursor-pointer text-base font-semibold transition duration-200 ease-in-out border-2 px-4 py-[5px] rounded-lg bg-primary-500 border-primary-500 dark:bg-indigo-900 dark:border-indigo-900 !text-white hover:bg-primary-600 hover:border-primary-600 hover:shadow focus:outline-none active:bg-primary-700 active:border-primary-700`
                              : // If not on "/login", style as inactive Login button.
                                `cursor-pointer text-base font-semibold transition duration-200 ease-in-out text-gray-500 dark:text-white border-2 px-4 py-[5px] rounded-lg border-border hover:shadow focus:outline-none`
                          } `}
                        >
                          {t("Login")}
                        </button>
                      </Link>
                      <Link to="/sign-up">
                        <button
                          onClick={toggleContentDropDown}
                          className={`shadow-sm ${
                            // If on the "/login" page, style as inactive Sign Up button.
                            location.pathname === "/login"
                              ? `cursor-pointer text-base font-semibold transition duration-200 ease-in-out text-gray-500 dark:text-white border-2 px-4 py-[5px] rounded-lg border-border hover:shadow focus:outline-none`
                              : // If not on "/login", style as active Sign Up button.
                                `cursor-pointer text-base font-semibold transition duration-200 ease-in-out text-white bg-primary-500 border-2 border-primary-500 dark:bg-indigo-900 dark:border-indigo-900 px-4 py-[5px] rounded-lg hover:bg-primary-600 hover:border-primary-600 hover:shadow focus:outline-none active:bg-primary-700 active:border-primary-700`
                          }`}
                        >
                          {t("Sign In")}
                        </button>
                      </Link>
                    </div>
                  </li>
                )}

                <li>
                  <a
                    href="/category/rent"
                    className="block px-3 text-gray-500 py-2 hover:bg-slate-100"
                  >
                    {t("Rent")}
                  </a>
                </li>
                <li>
                  <a
                    href="/category/sell"
                    className="block px-3 text-gray-500 py-2 hover:bg-slate-100"
                  >
                    {t("Sell")}
                  </a>
                </li>
                <li>
                  <a
                    href="/category/house"
                    className="block px-3 text-gray-500 py-2 hover:bg-slate-100"
                  >
                    {t("Houses")}
                  </a>
                </li>
                <li>
                  <a
                    href="/category/apartment"
                    className="block px-3 text-gray-500 py-2 hover:bg-slate-100"
                  >
                    {t("Apartments")}
                  </a>
                </li>

                <li>
                  <a
                    href="/category/land"
                    className="block px-3 text-gray-500 py-2 hover:bg-slate-100"
                  >
                    {t("Lands")}
                  </a>
                </li>
                <li>
                  <a
                    href="/category/shop"
                    className="block px-3 text-gray-500 py-2 hover:bg-slate-100"
                  >
                    {t("Shops")}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center justify-center space-x-6 rtl:space-x-reverse">
            <LanguageDropDown
              toggleLanguageDropdown={toggleLanguageDropdown}
              isLanguageDropDown={isLanguageDropDown}
              handleLanguageChange={handleLanguageChange}
            />
            <div>
              <DarkModeSwitch
                checked={darkSide}
                onChange={toggleDarkMode}
                size={27}
              />
            </div>
            {userAuth ? (
              <div className="flex justify-between items-center max-lg:space-x-6 rtl:space-x-reverse">
                <div className="lg:hidden">
                  <DropdownButton
                    toggleContentDropDown={toggleContentDropDown}
                    isContentDropDown={isContentDropDown}
                    isNavbarScroll={isNavbarScroll}
                  />
                </div>
                <NavbarDropDown
                  handleLogout={handleLogout}
                  toggleDropdown={toggleDropdown}
                  isDropDown={isDropDown}
                  firstLetter={firstLetter}
                  profilePhoto={profilePhoto}
                  name={name}
                  email={email}
                />
              </div>
            ) : (
              <>
                <div className="hidden md:block space-x-6 rtl:space-x-reverse py-2">
                  <Link to="/login">
                    <button
                      // Login Button: white background with an outline. Sign Up Button: Blue background without an outline.

                      // When the Login button is clicked, the Sign Up button outline becomes visible to differentiate between the two buttons. This approach ensures clarity when both buttons have a blue background.

                      className={`shadow-sm  ${
                        // If on the "/login" page, style as active Login button.
                        location.pathname === "/login"
                          ? `cursor-pointer text-base font-semibold transition duration-200 ease-in-out border-2 px-4 py-[5px] rounded-lg bg-primary-500 border-primary-500 dark:bg-indigo-900 dark:border-indigo-900 !text-white hover:bg-primary-600 hover:border-primary-600 hover:shadow focus:outline-none active:bg-primary-700 active:border-primary-700`
                          : // If not on "/login", style as inactive Login button.
                            `cursor-pointer text-base font-semibold transition duration-200 ease-in-out text-gray-500 dark:text-white border-2 px-4 py-[5px] rounded-lg border-border hover:shadow focus:outline-none`
                      } `}
                    >
                      {t("Login")}
                    </button>
                  </Link>
                  <Link to="/sign-up">
                    <button
                      className={`shadow-sm ${
                        // If on the "/login" page, style as inactive Sign Up button.
                        location.pathname === "/login"
                          ? `cursor-pointer text-base font-semibold transition duration-200 ease-in-out text-gray-500 dark:text-white border-2 px-4 py-[5px] rounded-lg border-border hover:shadow focus:outline-none`
                          : // If not on "/login", style as active Sign Up button.
                            `cursor-pointer text-base font-semibold transition duration-200 ease-in-out text-white bg-primary-500 border-2 border-primary-500 dark:bg-indigo-900 dark:border-indigo-900 px-4 py-[5px] rounded-lg hover:bg-primary-600 hover:border-primary-600 hover:shadow focus:outline-none active:bg-primary-700 active:border-primary-700`
                      }`}
                    >
                      {t("Sign In")}
                    </button>
                  </Link>
                </div>
                <div className="lg:hidden">
                  <DropdownButton
                    toggleContentDropDown={toggleContentDropDown}
                    isContentDropDown={isContentDropDown}
                    isNavbarScroll={isNavbarScroll}
                  />
                </div>
              </>
            )}
          </div>
        </header>
      </div>

      <Outlet />
    </>
  );
};

export default Header;
