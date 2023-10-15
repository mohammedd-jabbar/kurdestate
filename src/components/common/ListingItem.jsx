/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaTrash } from "react-icons/fa";
import {
  MdDeleteForever,
  MdEdit,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { FaBath, FaMapMarkerAlt } from "react-icons/fa";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { BiSolidCarGarage, BiStreetView } from "react-icons/bi";
import { LuBedDouble } from "react-icons/lu";
import { BsHouseGearFill } from "react-icons/bs";
import Heart from "../../assets/svg/Heart.jsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ListingItem = ({ listing, id, onDelete, onEdit, onRemove = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { t, i18n } = useTranslation("settings");

  useEffect(() => {
    // Check if the "favorites" value is valid JSON data
    const favoritesFromLocalStorage = JSON.parse(
      localStorage.getItem("favorites")
    );
    if (
      !favoritesFromLocalStorage ||
      !Array.isArray(favoritesFromLocalStorage)
    ) {
      localStorage.setItem("favorites", JSON.stringify([]));
      return;
    } else {
      // Set the favorite status of the listing

      setIsFavorite(favoritesFromLocalStorage.includes(id));
    }
  }, [id]);

  const handleAddToFavorites = async (e) => {
    e.preventDefault();
    // Retrieve the existing array from local storage
    const existingArrayJSON = localStorage.getItem("favorites");

    // Parse the existing JSON string into an array or create an empty array if it doesn't exist
    const existingArray = existingArrayJSON
      ? JSON.parse(existingArrayJSON)
      : [];

    existingArray.push(id);

    // Check if the component is already in favorites
    if (!existingArrayJSON.includes(id)) {
      // Add the component to favorites

      // Update the local storage with the modified array
      const updatedArrayJSON = JSON.stringify(existingArray);
      localStorage.setItem("favorites", updatedArrayJSON);
      setIsFavorite(true);
    } else {
      // Parse the existing JSON string into an array or create an empty array if it doesn't exist
      const existingArray = existingArrayJSON
        ? JSON.parse(existingArrayJSON)
        : [];

      // Filter out the specific ID you want to remove (even if it's duplicated)
      const updatedArray = existingArray.filter((itemId) => itemId !== id);

      // Update the local storage with the filtered array
      const updatedArrayJSON = JSON.stringify(updatedArray);
      localStorage.setItem("favorites", updatedArrayJSON);
      setIsFavorite(false);
    }
  };

  const handleRemoveFromFavorites = async (e) => {
    e.preventDefault();

    // Retrieve the existing array from local storage
    const existingArrayJSON = localStorage.getItem("favorites");

    // Parse the existing JSON string into an array or create an empty array if it doesn't exist
    const existingArray = existingArrayJSON
      ? JSON.parse(existingArrayJSON)
      : [];

    // Filter out the specific ID you want to remove (even if it's duplicated)
    const updatedArray = existingArray.filter((itemId) => itemId !== id);

    // Update the local storage with the filtered array
    const updatedArrayJSON = JSON.stringify(updatedArray);
    localStorage.setItem("favorites", updatedArrayJSON);
    setIsFavorite(false);
    window.location.reload();
  };

  String.prototype.toIndiaDigits = function () {
    var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return this.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };

  return (
    <div
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
      className="bg-white relative flex flex-col justify-between items-center rounded shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden dark:bg-darkBackground mb-8 m-[10px]"
    >
      {/* the top animation for rent or sell */}
      {(listing.category === "house" ||
        listing.category === "apartment" ||
        listing.category === "shop") && (
        <div
          className={`absolute z-10 top-2 rounded ${
            i18n.language === "ku" ? "right-2" : "left-2"
          } duration-200 group group-hover:scale-105 w-24 h-8 bg-primary-500`}
        >
          <p className="text-center pt-1.5 text-gray-100 dark:text-slate-300 font-semibold text-sm">
            {i18n.language === "ku"
              ? listing.typeKu === "کرێ"
                ? "کرێ"
                : "فرۆشتن"
              : listing.type === "rent"
              ? "Rent"
              : "Sell"}
          </p>
        </div>
      )}

      <Link
        to={`/category/${listing.type}/${id}`}
        className="p-0 m-0 inline-block w-full"
      >
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
        </div>
        {/* Heart wishList */}
        <a className="block w-full relative p-3 sm:p-4">
          {onRemove ? (
            <button
              onClick={handleRemoveFromFavorites}
              className={`absolute group shadow end-4 bottom-30 border-2 border-border dark:border-slate-800 text-primary-500  z-10 rounded-full bg-white p-2 transition duration-200 hover:text-white focus:text-white active:text-white hover:border-primary-500 hover:bg-primary-500 focus:border-primary-600 focus:bg-primary-600 active:border-primary-700 active:bg-primary-700 `}
            >
              <MdDeleteForever className="h-8 w-8" />
            </button>
          ) : (
            <button
              onClick={handleAddToFavorites}
              className={`absolute group shadow end-4 bottom-30 border-2 border-border dark:border-slate-800 z-10 rounded-full bg-white dark:bg-darkBackgroundDarker p-2 transition duration-200 hover:border-primary-500 dark:hover:border-slate-900 dark:hover:bg-darkBackgroundDarker hover:bg-primary-500 focus:border-primary-600 dark:focus:bg-darkBackgroundDarker dark:focus:border-slate-900 focus:bg-primary-600  active:border-primary-700 active:bg-primary-700 dark:active:bg-darkBackgroundDarker
               ${isFavorite ? "!border-primary-500 !bg-primary-500" : ""}`}
            >
              <Heart isFav={isFavorite} />
            </button>
          )}

          <div className="mb-2">
            <div className="mb-6 border-b-2 pb-4 space-y-2 border-gray-400  border-opacity-20">
              <div>
                <dt className="sr-only">{t("Price")}</dt>

                <span className="text-xl font-semibold text-primary-600">
                  $
                  {i18n.language === "ku"
                    ? listing.price.toIndiaDigits()
                    : listing.price &&
                      listing.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                {(listing.category === "house" ||
                  listing.category === "apartment" ||
                  listing.category === "shop") && (
                  <span className="text-sm font-semibold text-gray-500 dark:text-white">
                    {i18n.language === "ku"
                      ? listing.typeKu === "کرێ" && " / کرێ"
                      : listing.type === "rent" && " / month"}
                  </span>
                )}
              </div>

              <div className="flex justify-start items-center">
                <p className="truncate font-bold text-[#000013] text-2xl dark:text-white">
                  {i18n.language === "ku" ? listing.nameKu : listing.name}
                </p>
              </div>
              <div className="mt-1 flex justify-start items-center">
                <FaMapMarkerAlt className="text-primary-500 mr-1 h-3 w-3" />
                <p className="truncate font-semibold text-sm text-gray-500 dark:text-gray-400">
                  {i18n.language === "ku" ? listing.addressKu : listing.address}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 xs:gap-10 text-xs">
              <div className="flex md:inline-flex flex-col sm:shrink-0 items-center justify-center">
                {listing.category === "house" ? (
                  <LuBedDouble className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />
                ) : listing.category === "apartment" ? (
                  <LuBedDouble className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />
                ) : listing.category === "land" ? (
                  <GiEarthAfricaEurope className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />
                ) : listing.category === "shop" ? (
                  <BiStreetView className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />
                ) : (
                  ""
                )}
                <div className="ltr:mt-1.5">
                  <p className="max-sm:text-xs text-gray-500 dark:text-gray-400 truncate xl:font-base">
                    {i18n.language === "ku"
                      ? listing.category === "apartment"
                        ? listing.beds > 1
                          ? `${listing.beds} ژوور`
                          : listing.beds < 1
                          ? "ژوور نیە"
                          : "1 ژوور"
                        : listing.category === "house"
                        ? listing.beds > 1
                          ? `${listing.beds} ژوور`
                          : listing.beds < 1
                          ? "ژوور نیە"
                          : "1 ژوور"
                        : listing.category === "land"
                        ? listing.topographyKu
                        : listing.category === "shop"
                        ? listing.visibilityStreetKu
                        : ""
                      : listing.category === "apartment"
                      ? listing.beds > 1
                        ? `${listing.beds} Beds`
                        : listing.beds < 1
                        ? "No Beds"
                        : "1 Bed"
                      : listing.category === "house"
                      ? listing.beds > 1
                        ? `${listing.beds} Beds`
                        : listing.beds < 1
                        ? "No Beds"
                        : "1 Bed"
                      : listing.category === "land"
                      ? listing.topography
                      : listing.category === "shop"
                      ? listing.visibilityStreet
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex md:inline-flex flex-col sm:shrink-0 items-center justify-center gap-1">
                {listing.category === "house" ? (
                  <FaBath className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />
                ) : listing.category === "apartment" ? (
                  <FaBath className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />
                ) : listing.category === "land" ? (
                  <BsHouseGearFill className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />
                ) : listing.category === "shop" ? (
                  <BsHouseGearFill className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />
                ) : (
                  ""
                )}

                <div className="ltr:mt-1.5">
                  <p className="max-sm:text-xs text-gray-500 dark:text-gray-400 truncate xl:font-base">
                    {i18n.language === "ku"
                      ? listing.category === "apartment"
                        ? listing.baths > 1
                          ? `${listing.baths} حەمام`
                          : listing.baths < 1
                          ? "حەمام نیە"
                          : "1 حەمام"
                        : listing.category === "house"
                        ? listing.baths > 1
                          ? `${listing.baths} حەمام`
                          : listing.baths < 1
                          ? "حەمام نیە"
                          : "1 حەمام"
                        : listing.category === "land"
                        ? listing.potentialUseKu
                        : listing.category === "shop"
                        ? listing.usageKu
                        : ""
                      : listing.category === "apartment"
                      ? listing.baths > 1
                        ? `${listing.baths} Baths`
                        : listing.baths < 1
                        ? "No Baths"
                        : "1 Bath"
                      : listing.category === "house"
                      ? listing.baths > 1
                        ? `${listing.baths} Baths`
                        : listing.baths < 1
                        ? "No Baths"
                        : "1 Bath"
                      : listing.category === "land"
                      ? listing.potentialUse
                      : listing.category === "shop"
                      ? listing.usage
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex md:inline-flex flex-col sm:shrink-0 items-center justify-center">
                <MdOutlineCalendarMonth className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />

                <div className="ltr:mt-1.5 rtl:sm:mt-1.5">
                  <p className="max-sm:text-xs text-gray-500 dark:text-gray-400 truncate xl:font-base">
                    {listing.yearBuilt}
                  </p>
                </div>
              </div>
              <div className="flex md:inline-flex flex-col sm:shrink-0 items-center justify-center">
                <BiSolidCarGarage className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />

                <div className="ltr:mt-1.5 rtl:sm:mt-1.5">
                  <p className="max-sm:text-xs text-gray-500 dark:text-gray-400 truncate xl:font-base">
                    {i18n.language === "ku"
                      ? listing.parkingKu > 1
                        ? `${listing.parkingKu} گەراج`
                        : !listing.parkingKu
                        ? "گەراجی نییە"
                        : "1 گەراج"
                      : listing.parking > 1
                      ? `${listing.parking} Garages`
                      : !listing.parking
                      ? "No Garage"
                      : "1 Garage"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>

        {onDelete && (
          <FaTrash
            className="absolute bottom-2 right-2 cursor-pointer h-[14px] text-red-500"
            onClick={() => onDelete(listing.id)}
          />
        )}
        {onEdit && (
          <MdEdit
            className="absolute bottom-2 right-7 cursor-pointer h-4"
            onClick={() => onEdit(listing.id)}
          />
        )}
      </Link>
    </div>
  );
};

export default ListingItem;
