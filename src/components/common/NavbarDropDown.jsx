import { useTranslation } from "react-i18next";
import { BiConfused } from "react-icons/bi";

/* eslint-disable react/prop-types */
const NavbarDropDown = ({
  handleLogout,
  toggleDropdown,
  profilePhoto,
  name,
  email,
  isDropDown,
  toggleLanguageDropdown,
}) => {
  const { t, i18n } = useTranslation("header");

  return (
    <div
      className="flex relative justify-center justify-items-center items-center"
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
    >
      {/* Avatar */}
      <button
        className="flex transition duration-150 ease-in-out text-sm focus:outline-none bg-transparent rounded-full md:mr-0 "
        type="button"
        onClick={() => {
          toggleDropdown();
          toggleLanguageDropdown(false);
        }}
      >
        {profilePhoto ? (
          <img
            className={`w-10 border-2 border-primary-500 dark:border-gray-600 border-opacity-50 h-10 rounded-full`}
            src={profilePhoto}
            alt=""
          />
        ) : (
          <span
            className={`rounded-[50%] font-bold text-center border-opacity-50 text-xl`}
          >
            <BiConfused className="w-9 h-9" />
          </span>
        )}
      </button>
      {/* Drop down */}
      <div
        dir={i18n.language === "ku" ? "rtl" : "ltr"}
        className={`absolute rtl:left-1 ltr:right-1 top-12 bg-white dark:bg-darkBackground divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow w-44 ${
          isDropDown
            ? "duration-300 transition-opacity ease-in-out opacity-100"
            : "hidden opacity-0 pointer-events-none"
        }`}
      >
        <div
          dir={i18n.language === "ku" ? "rtl" : "ltr"}
          className="px-4 py-3 truncate text-sm text-gray-900 dark:text-white"
        >
          <div
            className="font-bold text-sm"
            dir={i18n.language === "ku" ? "rtl" : "ltr"}
          >
            {name}
          </div>
          <div className="font-normal mt-1 truncate">{email}</div>
        </div>

        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-300"
          dir={i18n.language === "ku" ? "rtl" : "ltr"}
        >
          <li>
            <a
              href="/settings"
              className="block px-4 py-2 dark:hover:bg-gray-900 hover:bg-gray-100 "
            >
              {t("Settings")}
            </a>
          </li>
          <li>
            <a
              href="/create"
              className="block px-4 py-2 dark:hover:bg-gray-900 hover:bg-gray-100 "
            >
              {t("Listing Your Property")}
            </a>
          </li>
        </ul>
        <div className="py-2" onClick={handleLogout}>
          <a className="block px-4 py-2 text-sm text-gray-700 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-900 hover:bg-gray-100 ">
            {t("Sign Out")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavbarDropDown;
