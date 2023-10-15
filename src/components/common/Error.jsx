/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import "./Error.css";
import { BiArrowBack } from "react-icons/bi";

const Error = ({ text = false }) => {
  const { t, i18n } = useTranslation("error");
  return (
    <div
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
      className="flex flex-col justify-center items-center h-[92vh]"
    >
      <div className="fof flex flex-col">
        <h1>{text ? text : t("<404> this page not found")}</h1>
      </div>
      {!text && (
        <a
          className="flex justify-between items-center transition-all duration-200 ease-in-out mt-6 bg-primary-500 rounded-lg p-2 text-white hover:bg-primary-600 active:bg-primary-700"
          href="/"
        >
          <BiArrowBack className="w-4 h-4 rtl:ml-2 ltr:mr-2" />
          {t("Go home")}
        </a>
      )}
    </div>
  );
};

export default Error;
