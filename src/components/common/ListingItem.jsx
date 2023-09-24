/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaTrash } from "react-icons/fa";
import { MdEdit, MdOutlineCalendarMonth } from "react-icons/md";
import { FaBath, FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidCarGarage } from "react-icons/bi";
import { LuBedDouble } from "react-icons/lu";
import Heart from "../../assets/svg/Heart.jsx";

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <div className="bg-white flex flex-col justify-between items-center rounded shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-8 m-[10px]">
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

          {/* the top animation for rent or sell */}
          <div className="absolute z-0 rounded top-2 duration-200 group group-hover:scale-105 left-2 w-24 h-8 bg-primary-500">
            <p className="text-center pt-1.5 text-gray-100 font-semibold text-sm">
              {listing.type === "rent" ? "Rent" : "Sell"}
            </p>
          </div>
        </div>
        {/* Heart wishList */}
        <a className="block w-full relative p-3 sm:p-4">
          <button className="absolute group shadow end-4 bottom-30 border-2 border-border z-10 rounded-full bg-white p-2 transition duration-200 hover:border-primary-500 hover:bg-primary-500 focus:border-primary-500 focus:bg-primary-500 active:border-primary-500 active:bg-primary-500">
            <span className="sr-only">Wishlist</span>
            <Heart />
          </button>

          <div className="mb-2">
            <div className="mb-6 border-b-2 pb-4 space-y-2 border-gray-400 border-opacity-20">
              <div>
                <dt className="sr-only">Price</dt>

                <span className="text-xl font-semibold text-primary-600">
                  $
                  {listing.price &&
                    listing.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span className="text-sm font-semibold text-gray-500">
                  {listing.type === "rent" && " / month"}
                </span>
              </div>

              <div className="flex justify-start items-center">
                <p className="truncate font-bold text-[#000013] text-2xl">
                  {listing.name}
                </p>
              </div>
              <div className="mt-1 flex justify-start items-center">
                <FaMapMarkerAlt className="text-primary-500 mr-1 h-3 w-3" />
                <p className="truncate font-semibold text-sm text-gray-500">
                  {listing.address}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-10 text-xs">
              <div className="flex md:inline-flex flex-col sm:shrink-0 items-center justify-center sm:gap-2">
                <LuBedDouble className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />

                <div className="mt-1.5 sm:mt-0">
                  <p className="max-xs:text-xs text-gray-500 xl:font-base xl:text-sm">
                    {listing.beds > 1
                      ? `${listing.beds} Rooms`
                      : !listing.beds
                      ? "No Rooms"
                      : "1 Rooms"}
                  </p>
                </div>
              </div>
              <div className="flex md:inline-flex flex-col sm:shrink-0 items-center justify-center sm:gap-2">
                <FaBath className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />

                <div className="mt-1.5 sm:mt-0">
                  <p className="max-xs:text-xs text-gray-500 xl:font-base xl:text-sm">
                    {listing.bath > 1
                      ? `${listing.bath} Baths`
                      : !listing.bath
                      ? "No Baths"
                      : "1 Bath"}
                  </p>
                </div>
              </div>
              <div className="flex md:inline-flex flex-col sm:shrink-0 items-center justify-center sm:gap-2">
                <MdOutlineCalendarMonth className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />

                <div className="mt-1.5 sm:mt-0">
                  <p className="max-xs:text-xs text-gray-500 xl:font-base xl:text-sm">
                    {listing.yearBuilt}
                  </p>
                </div>
              </div>
              <div className="flex md:inline-flex flex-col sm:shrink-0 items-center justify-center sm:gap-2">
                <BiSolidCarGarage className="text-primary-500 max-xs:h-3 max-xs:w-3 h-4 w-4" />

                <div className="mt-1.5 sm:mt-0">
                  <p className="max-xs:text-xs text-gray-500 xl:font-base xl:text-sm">
                    {listing.parking > 1
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
