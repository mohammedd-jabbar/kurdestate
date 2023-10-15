/* eslint-disable react/prop-types */
import { LiaBedSolid, LiaBathSolid } from "react-icons/lia";
import { AiOutlineCar } from "react-icons/ai";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaPencilRuler } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { BiStreetView } from "react-icons/bi";
import { BsHouseGearFill } from "react-icons/bs";

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
            {listing.category !== "land" && (
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
            )}
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                {listing.category === "house" ? (
                  <LiaBedSolid className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                ) : listing.category === "apartment" ? (
                  <LiaBedSolid className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                ) : listing.category === "land" ? (
                  <GiEarthAfricaEurope className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                ) : listing.category === "shop" ? (
                  <BiStreetView className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                ) : (
                  ""
                )}
                <p className="text-2xl font-bold">
                  {i18n.language === "ku"
                    ? listing.category === "apartment"
                      ? `${listing.beds}`
                      : listing.category === "house"
                      ? `${listing.beds}`
                      : listing.category === "land"
                      ? `${listing.topographyKu}`
                      : listing.category === "shop"
                      ? `${listing.visibilityStreetKu}`
                      : ""
                    : listing.category === "apartment"
                    ? `${listing.beds}`
                    : listing.category === "house"
                    ? `${listing.beds}`
                    : listing.category === "land"
                    ? `${listing.topography}`
                    : listing.category === "shop"
                    ? `${listing.visibilityStreet}`
                    : ""}
                </p>
              </div>
              <p className="text-base font-light">
                {i18n.language === "ku"
                  ? listing.category === "apartment"
                    ? `ژوور`
                    : listing.category === "house"
                    ? `ژوور`
                    : listing.category === "land"
                    ? `تەیپۆگرافی`
                    : listing.category === "shop"
                    ? `بینین لە شەقامەوە`
                    : ""
                  : listing.category === "apartment"
                  ? `Bedrooms`
                  : listing.category === "house"
                  ? `Bedrooms`
                  : listing.category === "land"
                  ? `Topography`
                  : listing.category === "shop"
                  ? `visibility street`
                  : ""}
              </p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                {listing.category === "house" ? (
                  <LiaBathSolid className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                ) : listing.category === "apartment" ? (
                  <LiaBathSolid className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                ) : listing.category === "land" ? (
                  <BsHouseGearFill className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                ) : listing.category === "shop" ? (
                  <BsHouseGearFill className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                ) : (
                  ""
                )}
                <p className="text-2xl font-bold">
                  {i18n.language === "ku"
                    ? listing.category === "apartment"
                      ? `${listing.baths}`
                      : listing.category === "house"
                      ? `${listing.baths}`
                      : listing.category === "land"
                      ? `${listing.potentialUseKu}`
                      : listing.category === "shop"
                      ? `${listing.usageKu}`
                      : ""
                    : listing.category === "apartment"
                    ? `${listing.baths}`
                    : listing.category === "house"
                    ? `${listing.baths}`
                    : listing.category === "land"
                    ? `${listing.potentialUse}`
                    : listing.category === "shop"
                    ? `${listing.usage}`
                    : ""}
                </p>
              </div>
              <p className="text-base font-light">
                {i18n.language === "ku"
                  ? listing.category === "apartment"
                    ? `حەمام`
                    : listing.category === "house"
                    ? `حەمام`
                    : listing.category === "land"
                    ? `بەکارهێنان`
                    : listing.category === "shop"
                    ? `بەکاردێت بۆ`
                    : ""
                  : listing.category === "apartment"
                  ? `Bathrooms`
                  : listing.category === "house"
                  ? `Bathrooms`
                  : listing.category === "land"
                  ? `Potential Use`
                  : listing.category === "shop"
                  ? `Usage`
                  : ""}
              </p>
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
            {listing.category !== "land" && (
              <div className="flex flex-col px-6">
                <div className="flex pt-6 pb-1 items-center">
                  <MdOutlineCalendarMonth className="ltr:mr-3 rtl:ml-3 h-6 w-6" />
                  <p className="text-2xl font-bold">{listing.yearBuilt}</p>
                </div>
                <p className="text-base font-light">{t("Year Built")}</p>
              </div>
            )}
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
