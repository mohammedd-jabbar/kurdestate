/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

const LanguageDropDown = ({
  toggleLanguageDropdown,
  isLanguageDropDown,
  handleLanguageChange,
  toggleDropdown,
}) => {
  const { t, i18n } = useTranslation("header");
  return (
    <div
      className="flex relative justify-center justify-items-center items-center"
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
    >
      {/* Avatar */}
      <button
        className="flex transition duration-150 ease-in-out text-sm focus:outline-none bg-transparent rounded-full md:mr-0"
        type="button"
        onClick={() => {
          toggleLanguageDropdown();
          toggleDropdown(false);
        }}
      >
        <MdLanguage className="transition duration-200 ease-in-out text-black hover:text-slate-500 dark:hover:text-slate-400 dark:text-white w-6 h-6 xs:w-[32px] xs:h-[32px]" />
      </button>
      {/* Drop down */}
      <div
        className={`absolute rtl:-left-16 ltr:-right-16 top-12 bg-white dark:bg-darkBackground divide-y rounded-lg shadow-xl w-44 ${
          isLanguageDropDown
            ? "duration-300 transition-opacity ease-in-out opacity-100"
            : "hidden opacity-0 pointer-events-none"
        }`}
      >
        <ul className="">
          {/* Language drop down */}
          <li>
            <div
              className={`z-10 bg-white dark:bg-darkBackground divide-y rounded-lg shadow w-44`}
            >
              <ul className="py-2 text-sm dark:text-slate-200 text-gray-700 ">
                <li>
                  <a
                    onClick={() => {
                      toggleLanguageDropdown();
                      handleLanguageChange("ku");
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    {t("Kurdish")}
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      toggleLanguageDropdown();
                      handleLanguageChange("en");
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    {t("English")}
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageDropDown;
