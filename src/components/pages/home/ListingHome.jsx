/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTranslation } from "react-i18next";

const ListingHome = ({ listing, id }) => {
  const { t, i18n } = useTranslation("listing");

  String.prototype.toIndiaDigits = function () {
    var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return this.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };

  const yearBuiltKu = listing.yearBuiltKu;
  const yearBuilt = listing.yearBuilt;

  return (
    <div
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
      className="bg-white group rounded-none flex flex-col justify-between items-center shadow-md hover:shadow-xl transition-shadow w-full duration-300 overflow-hidden"
    >
      <div className="p-0 m-0 inline-block w-full relative">
        <div className="relative shadow-md hover:shadow-lg group h-[26rem] w-full">
          <LazyLoadImage
            style={{
              // transform the image
              transition: "transform 1s ease-in-out",
            }}
            width={"100%"}
            height={"100%"}
            // scale to size how much transform
            className="h-full group-hover:scale-110 absolute object-cover"
            src={listing.imgUrls[0]}
            effect="blur"
          />

          {/* transition the transform and when group mean parent hover then translate the text with duration 300ms */}
          <div className="absolute bottom-3 ltr:left-1 px-2 sm:px-4 transform transition-transform group-hover:-translate-y-8 duration-[.5s] ease-in-out ">
            <h1 className="text-white truncate text-2xl font-semibold">
              {i18n.language === "ku" ? listing.nameKu : listing.name}
            </h1>
            <h3 className="text-white truncate py-2 text-lg font-semibold">
              $
              {i18n.language === "ku"
                ? listing.price.toIndiaDigits()
                : listing.price &&
                  listing.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h3>
            <div className="flex justify-start space-x-3 rtl:space-x-reverse text-white items-center">
              <p className="font-medium max-sm:text-sm">
                {}
                {i18n.language === "ku"
                  ? listing.beds > 1
                    ? `${listing.beds} ژوور`
                    : "1 ژوور"
                  : listing.beds > 1
                  ? `${listing.beds} Beds | `
                  : "1 Bed | "}
              </p>
              <p className="font-medium max-sm:text-sm">
                {i18n.language === "ku"
                  ? listing.bath > 1
                    ? `${listing.bath} حەمام`
                    : "1 حەمام"
                  : listing.bath > 1
                  ? `${listing.bath} Baths | `
                  : "1 Bath | "}
              </p>
              <p className="max-sm:text-sm font-medium">
                {i18n.language === "ku"
                  ? `دروستکراوە لە ${yearBuiltKu}`
                  : `Built in ${yearBuilt}`}
              </p>
            </div>
          </div>
          {/* "View Details" text from bottom */}
          <div className="absolute bottom-0 w-full left-1 transform translate-y-full group-hover:translate-y-0 duration-[.5s] ease-in-out">
            <Link to={`/category/${listing.type}/${id}`}>
              <p className="text-start text-white text-sm px-4 pb-2 font-medium">
                {t("View Details")}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingHome;
