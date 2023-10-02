/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const DashboardItem = ({ listing, onDelete, onEdit, onAccept }) => {
  const { i18n } = useTranslation("settings");

  String.prototype.toIndiaDigits = function () {
    var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return this.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };

  return (
    <div
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
      className="bg-white flex flex-col justify-between items-center rounded-md shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-8 m-[10px]"
    >
      <Link className="p-0 m-0 inline-block w-full">
        <div className="relative group h-56 w-full">
          <LazyLoadImage
            style={{
              transition: "transform 0.3s ease-in-out",
              width: "100%",
              height: "14rem",
            }}
            className="rounded-t-md hover:scale-105 absolute object-cover"
            src={listing.imgUrls[0]}
          />

          {/* the top animation for rent or sell */}
          <div
            dir={i18n.language === "ku" ? "rtl" : "ltr"}
            className={`absolute z-0 rounded top-2 ${
              i18n.language === "ku" ? "right-2" : "left-2"
            } duration-200 group group-hover:scale-105 w-24 h-8 bg-primary-500`}
          >
            <p className="text-center pt-1.5 text-gray-100 font-semibold text-sm">
              {i18n.language === "ku"
                ? listing.typeKu === "کرێ"
                  ? "کرێ"
                  : "فرۆشتن"
                : listing.type === "rent"
                ? "Rent"
                : "Sell"}
            </p>
          </div>
        </div>

        <a
          className="block w-full relative p-4"
          dir={i18n.language === "ku" ? "rtl" : "ltr"}
        >
          <div className="mb-2">
            <div className="mb-4 pb-4 space-y-2 border-gray-400 border-opacity-20">
              <div>
                <span className="text-xl font-semibold text-primary-600">
                  $
                  {i18n.language === "ku"
                    ? listing.price.toIndiaDigits()
                    : listing.price &&
                      listing.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span className="text-sm font-semibold text-gray-500">
                  {i18n.language === "ku"
                    ? listing.typeKu === "کرێ" && " / کرێ"
                    : listing.type === "rent" && " / month"}
                </span>
              </div>

              <div className="flex justify-start items-center">
                <p className="truncate font-bold text-[#000013] text-2xl">
                  {i18n.language === "ku" ? listing.nameKu : listing.name}
                </p>
              </div>
              <div className="mt-1 flex justify-start items-center">
                <FaMapMarkerAlt className="text-primary-500 h-3 w-3 ltr:mr-1 rtl:ml-1" />
                <p className="truncate font-semibold text-sm text-gray-500">
                  {i18n.language === "ku" ? listing.addressKu : listing.address}
                </p>
              </div>
            </div>
          </div>
          {onDelete && (
            <FaTrash
              className="absolute text-red-500 w-4 h4 hover:text-red-700 bottom-2 right-2 cursor-pointer h-[14px] "
              onClick={() => onDelete(listing.id)}
            />
          )}
          {onEdit && (
            <MdEdit
              className="absolute text-primary-500 w-4 h4 hover:text-primary-700  bottom-2 right-7 cursor-pointer h-4"
              onClick={() => onEdit(listing.id)}
            />
          )}
          {onAccept && (
            <AiFillCheckCircle
              className={`absolute  w-4 h4  bottom-2 right-12 cursor-pointer h-4 ${
                listing.status === "accepted"
                  ? "text-green-500 hover:text-green-700"
                  : "text-red-500 hover:text-red-700"
              }`}
              onClick={() => onAccept(listing.id)}
            />
          )}
        </a>
      </Link>
    </div>
  );
};

export default DashboardItem;
