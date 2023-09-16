/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ExpandedContext } from "../../../store/SidebarProvider";
import useDarkSide from "../../common/darkmode/useDarkSide";
import { useTranslation } from "react-i18next";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { UserInfoContext } from "../../../store/UserInfoProvider";
import { notifications } from "../../common/Notifications";
import { getAuth, reauthenticateWithCredential } from "firebase/auth";

const SettingsContent = () => {
  const { t, i18n } = useTranslation();

  const auth = getAuth();

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

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const [isChecked1, setIsChecked1] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked1(!isChecked1);
  };

  const [isChecked2, setIsChecked2] = useState(false);

  const handleCheckboxChange2 = () => {
    const language = i18n.language === "ku" ? "en" : "ku";
    handleLanguageChange(language);
    setIsChecked2(!isChecked2);
  };

  const handleDeleteUser = async () => {
    if (data !== undefined && !isLoading && !isFetching) {
      if (window.confirm("Are you sure you want to delete your account?"))
        console.log("delete");
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
    }
  };

  return (
    <div
      className={`max-w-6xl max-md:max-w-[95%] mx-auto max-md:text-center transition-all duration-200 ease-in-out mt-7  ${
        expanded ? "md:ml-[13.5rem]" : "md:ml-[5.3rem]"
      }`}
    >
      <div>
        <h1 className="text-2xl font-bold pb-4 border-b border-border">
          Settings
        </h1>
        {/* Dark mode changer */}
        <div className="flex justify-between max-xs:flex-col max-sm:space-y-4 items-center mt-6 mb-4 px-4">
          <div>
            <h1 className="text-xl font-semibold pb-1 xs:text-start max-sm:text-base">
              Dark Mode
            </h1>
            <p className="text-sm font-medium max-sm:text-xs">
              Lorem ipsum dolor sit.
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
                className={`slider mx-4 flex h-7 w-[55px] items-center rounded-full p-1 duration-200 ${
                  isChecked1 ? "bg-[#212b36]" : "bg-[#CCCCCE]"
                }`}
              >
                <span
                  className={`dot h-5 w-5 rounded-full bg-white duration-200 ${
                    isChecked1 ? "translate-x-[28px]" : ""
                  }`}
                ></span>
              </span>
            </label>
          </div>
        </div>
        {/* Change language */}
        <div className="flex justify-between max-xs:flex-col max-sm:space-y-4 items-center mt-6 mb-4 px-4">
          <div>
            <h1 className="text-xl font-semibold pb-1 xs:text-start max-sm:text-base">
              Change Language
            </h1>
            <p className="text-sm font-medium max-sm:text-xs">
              Lorem ipsum dolor sit.
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
              <span className="label flex items-center max-sm:text-xs text-sm font-medium text-black">
                En
              </span>
              <span
                className={`slider mx-4 flex h-7 w-[55px] items-center rounded-full p-1 duration-200 ${
                  isChecked2 ? "bg-[#212b36]" : "bg-[#CCCCCE]"
                }`}
              >
                <span
                  className={`dot h-5 w-5 rounded-full bg-white duration-200 ${
                    isChecked2 ? "translate-x-[28px]" : ""
                  }`}
                ></span>
              </span>
              <span className="label flex items-center max-sm:text-xs text-sm font-medium text-black">
                Ku
              </span>
            </label>
          </div>
        </div>
        {/* Delete account */}
        <div className="flex justify-between max-xs:flex-col max-sm:space-y-4 items-center mt-6 mb-4 px-4">
          <div>
            <h1 className="text-xl font-semibold pb-1 xs:text-start max-sm:text-base">
              Delete Account
            </h1>
            <p className="text-sm font-medium max-sm:text-xs">
              Do you want to delete your account?
            </p>
          </div>
          <div>
            <button
              onClick={handleDeleteUser}
              className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
