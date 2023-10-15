/* eslint-disable react/prop-types */
import { LiaBedSolid, LiaBathSolid } from "react-icons/lia";
import { AiOutlineCar } from "react-icons/ai";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaPencilRuler } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// import {} from "react-icons/fa6";

const Overview = ({ listing }) => {
  const { t, i18n } = useTranslation("listing");
  return (
    listing && (
      <div
        className="w-full h-[89vh] max-sm:h-[60vh] bg-white dark:text-white dark:bg-darkBackground max-xs:max-w-[90%] xs:max-w-[90%] lg:max-w-[85%] mx-auto overflow-y-scroll no-scrollbar"
        dir={i18n.language === "ku" ? "rtl" : "ltr"}
      >
        <div className="mb-2">
          <h1 className="font-semibold text-2xl py-4 sm:py-8 border-b-2 border-border dark:border-slate-600 border-opacity-80">
            {t("Property information")}
          </h1>
          <div className="grid grid-cols-3 max-sm:grid-cols-2">
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                {/* <AiFillEye className="mr-3 h-6 w-6" /> */}
                <p className="text-2xl font-bold">{t("Status")}</p>
              </div>
              <p className="text-base font-light">
                {i18n.language === "ku"
                  ? listing.typeKu === "کرێ"
                    ? "بۆ کرێ"
                    : "بۆ فرۆشتن"
                  : listing.type === "rent"
                  ? "For Rent"
                  : "For Sell"}
              </p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                <LiaBedSolid className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                <p className="text-2xl font-bold">{listing.beds}</p>
              </div>
              <p className="text-base font-light">{t("Bedrooms")}</p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                <LiaBathSolid className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                <p className="text-2xl font-bold">{listing.baths}</p>
              </div>
              <p className="text-base font-light">{t("Bathrooms")}</p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                <AiOutlineCar className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                <p className="text-2xl font-bold">{listing.parking}</p>
              </div>
              <p className="text-base font-light">{t("Garage")}</p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                <FaPencilRuler className="ltr:mr-3 rtl:ml-3 h-5 w-5" />
                <p className="text-2xl font-bold">{listing.area}</p>
              </div>
              <p className="text-base font-light">{t("Meters")}</p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                <MdOutlineCalendarMonth className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                <p className="text-2xl font-bold">{listing.yearBuilt}</p>
              </div>
              <p className="text-base font-light">{t("Year Built")}</p>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold text-2xl py-4 sm:py-8 border-b-2 border-border dark:border-slate-600 border-opacity-80">
            {t("Description")}
          </h1>
          <p className="px-6 py-4">
            {i18n.language === "ku"
              ? listing.descriptionKu
              : listing.description}
          </p>
        </div>
      </div>
    )
  );
};

export default Overview;
