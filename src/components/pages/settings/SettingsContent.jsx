/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ExpandedContext } from "../../../store/SidebarProvider";
import useDarkSide from "../../common/darkmode/useDarkSide";
import { useTranslation } from "react-i18next";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { UserInfoContext } from "../../../store/UserInfoProvider";
import { notifications } from "../../common/Notifications";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../common/DeleteModal";

const SettingsContent = () => {
  const { t, i18n } = useTranslation("settings");
  const navigateTo = useNavigate();

  const [isOpen, setIsOpen] = useState(false); // State to handle open module

  // const credential = GoogleAuthProvider.credential(
  //   auth?.currentUser?.uid,
  //   auth?.currentUser?.idToken
  // );

  const { data, isLoading, isFetching } = useContext(UserInfoContext);

  // get the language
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // change language
  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  const { expanded } = useContext(ExpandedContext);

  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const [isChecked1, setIsChecked1] = useState(
    colorTheme === "light" ? true : false
  );
  const [isChecked2, setIsChecked2] = useState(false);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const handleCheckboxChange = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    const language = i18n.language === "ku" ? "en" : "ku";
    handleLanguageChange(language);
    setIsChecked2(!isChecked2);
  };

  const handleDeleteUser = async () => {
    if (data !== undefined && !isLoading && !isFetching) {
      await deleteDoc(doc(db, "users", data.uid));

      data
        .delete()
        .then(() => {
          // User deleted.
          location.reload();
        })
        .catch(async (error) => {
          if (error.code == "auth/requires-recent-login") {
            notifications("Logout and login again", true);
          }
          // we can improve this
          // if (error.code == "auth/requires-recent-login") {
          //   reauthenticateWithCredential(auth.currentUser, credential)
          //     .then(() => {
          //       location.reload();
          //       // User re-authenticated.
          //     })
          //     .catch((error) => {
          //       console.log(error);
          //       // An error ocurred
          //       // ...
          //     });
          // }

          notifications("There is an error for deleting your account!", true);
        });

      setIsOpen(false);
    }
  };

  return (
    <div
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
      className={`max-md:max-w-[95%] max-md:text-center transition-all duration-200 ease-in-out mt-7 ${
        expanded
          ? `${i18n.language === "ku" ? "md:mr-[13.5rem]" : "md:ml-[13.5rem]"}`
          : `${i18n.language === "ku" ? "md:mr-[5.3rem]" : "md:ml-[5.3rem]"}`
      }`}
    >
      <DeleteModal
        open={isOpen}
        childern={
          <>
            {/* fix the module center when small size */}
            <div className="mx-auto my-4 max-md:text-start w-72 max-md:w-56 z-50">
              <h3 className="max-md:text-sm text-lg font-black text-gray-800">
                {t("Confirm Delete Account")}
              </h3>
              <p className="max-md:text-xs text-sm text-gray-500 pt-2">
                {t("Are you sure you want to delete your account?")}
              </p>
            </div>
            <div className="flex mt-8 gap-6">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full font-inter bg-white border border-border text-black rounded-md py-1.5 px-3 "
              >
                {t("Cancel")}
              </button>
              <button
                onClick={handleDeleteUser}
                className="w-full font-inter bg-red-600 text-white rounded-md py-1.5 px-3 hover:bg-red-700 active:bg-red-800 transition-all duration-150 ease-in-out"
              >
                {t("Delete")}
              </button>
            </div>
          </>
        }
        onClose={() => setIsOpen(false)}
      />
      <div dir={i18n.language === "ku" ? "rtl" : "ltr"}>
        <h1 className="text-2xl font-bold pb-4 border-b border-border">
          {t("Settings")}
        </h1>
        {/* Dark mode changer */}
        <div className="flex justify-between items-center mt-6 mb-4 px-4">
          <div>
            <h1 className="text-xl font-semibold pb-1 text-start max-sm:text-base">
              {t("Dark Mode")}
            </h1>
            <p className="text-sm font-medium max-sm:text-[9px]">
              {t("Switch to dark mode for easier reading.")}
            </p>
          </div>
          <div>
            <label className="relative inline-flex cursor-pointer select-none items-center">
              <input
                onClick={toggleDarkMode}
                type="checkbox"
                checked={isChecked1}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <span
                className={`slider mx-4 flex h-6 sm:h-7 w-[55px] items-center rounded-full p-1 duration-200 ${
                  isChecked1 ? "bg-[#212b36]" : "bg-[#CCCCCE]"
                }`}
              >
                <span
                  className={`dot h-4 sm:h-5 w-4 sm:w-5 rounded-full bg-white duration-200 ${
                    isChecked1
                      ? "rtl:-translate-x-[28px] ltr:translate-x-[28px]"
                      : ""
                  }`}
                ></span>
              </span>
            </label>
          </div>
        </div>
        {/* Change language */}
        <div className="flex justify-between items-center mt-6 mb-4 px-4">
          <div>
            <h1 className="text-xl font-semibold pb-1 text-start max-sm:text-base">
              {t("Change Language")}
            </h1>
            <p className="text-sm font-medium max-sm:text-[9px] truncate">
              {t("Select your preferred language for a seamless experience.")}
            </p>
          </div>
          <div>
            <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
              <input
                type="checkbox"
                checked={isChecked2}
                onChange={handleCheckboxChange2}
                className="sr-only"
              />

              <span
                className={`slider mx-4 flex h-6 sm:h-7 w-[55px] items-center rounded-full p-1 duration-200 ${
                  isChecked2 ? "bg-[#212b36]" : "bg-[#CCCCCE]"
                }`}
              >
                <span
                  className={`dot flex items-center text-xs justify-center h-4 sm:h-5 w-4 sm:w-5 rounded-full bg-white duration-200 ${
                    isChecked2
                      ? "rtl:-translate-x-[28px] ltr:translate-x-[28px]"
                      : ""
                  }`}
                >
                  {i18n.language === "ku" ? "Ku" : "En"}
                </span>
              </span>
            </label>
          </div>
        </div>
        {/* Delete account */}
        <div className="flex justify-between items-center mt-6 mb-4 px-4">
          <div>
            <h1 className="text-xl font-semibold pb-1 xs:text-start max-sm:text-base">
              {t("Delete Account")}
            </h1>
            <p className="text-sm font-medium max-sm:text-[9px]">
              {t("Do you want to delete your account?")}
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsOpen(true)}
              className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 sm:px-5 py-2 sm:py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              {t("Delete")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
