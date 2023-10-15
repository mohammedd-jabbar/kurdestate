/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";
import Spinner from "../../common/Spinner";
import { BiConfused } from "react-icons/bi";

const UserInfo = ({ landLord, screen, listing }) => {
  const { t, i18n } = useTranslation("listing");

  const nameKu = listing.nameKu;
  const nameEn = listing.name;

  return (
    <div
      className={`md:w-1/3 shadow-lg mb-6 bg-white dark:bg-darkBackground rounded-sm ${
        screen === "sm"
          ? "max-sm:flex max-sm:order-6 rounded-md flex-col hidden mx-auto p-6 "
          : "flex flex-col max-sm:hidden mx-auto p-6 md:-mt-3"
      }`}
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
    >
      <div className="">
        <h2 className="text-xl font-semibold pb-4 border-b border-border dark:text-white dark:border-slate-700">
          {t("Property owner information")}
        </h2>
        <div className="flex items-center mt-4 pb-6 border-b border-border dark:text-white dark:border-slate-700">
          {landLord?.photoURL ? (
            <img
              className="w-16 rtl:ml-3 h-16 rounded-full "
              src={landLord?.photoURL}
            />
          ) : (
            <span
              className={`rounded-[50%] rtl:ml-3 font-bold text-center border-opacity-50 text-xl`}
            >
              <BiConfused className="w-16 h-16" />
            </span>
          )}

          <div className="ml-4">
            {landLord ? (
              <div className="flex flex-col justify-center items-start">
                <p className="text-lg font-semibold">{landLord?.name}</p>
                <p className="text-sm mt-2 font-normal truncate">
                  {t("Land Lord")}
                </p>
              </div>
            ) : (
              // You can provide a placeholder or loading indicator here
              <p>
                <Spinner />
              </p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl mt-6 font-semibold pb-4 dark:text-white">
            {i18n.language === `ku`
              ? t("Ask for the '{{nameKu}}'", { nameKu })
              : t("Ask for the '{{nameEn}}'", { nameEn })}
          </h2>
          <form action="">
            <input
              type="text"
              className="border-gray-600 w-full rounded placeholder:text-gray-700 focus:border-gray-400 focus:ring-0 mb-4"
              placeholder={t("Full Name")}
            />
            <input
              type="email"
              className="border-gray-600 w-full rounded placeholder:text-gray-700 focus:border-gray-400 focus:ring-0 mb-4"
              placeholder={t("Email Address")}
            />
            <textarea
              className="border-gray-600 w-full rounded placeholder:text-gray-700 focus:border-gray-400 focus:ring-0 mb-4"
              placeholder={t("Message")}
            />
            <button className="text-white bg-primary-500 rounded shadow w-full p-2 hover:bg-primary-600 hover:shadow-lg focus:shadow-lg focus:bg-primary-600 active:bg-primary-700 active:shadow-lg  transition duration-200 ease-in-out">
              {t("Send Message")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
