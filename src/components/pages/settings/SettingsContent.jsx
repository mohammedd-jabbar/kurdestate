import { useContext, useState } from "react";
import { ExpandedContext } from "../../../store/SidebarProvider";

const SettingsContent = () => {
  const { expanded } = useContext(ExpandedContext);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <span
                className={`slider mx-4 flex h-7 w-[55px] items-center rounded-full p-1 duration-200 ${
                  isChecked ? "bg-[#212b36]" : "bg-[#CCCCCE]"
                }`}
              >
                <span
                  className={`dot h-5 w-5 rounded-full bg-white duration-200 ${
                    isChecked ? "translate-x-[28px]" : ""
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
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <span className="label flex items-center max-sm:text-xs text-sm font-medium text-black">
                En
              </span>
              <span
                className={`slider mx-4 flex h-7 w-[55px] items-center rounded-full p-1 duration-200 ${
                  isChecked ? "bg-[#212b36]" : "bg-[#CCCCCE]"
                }`}
              >
                <span
                  className={`dot h-5 w-5 rounded-full bg-white duration-200 ${
                    isChecked ? "translate-x-[28px]" : ""
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
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Red
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
