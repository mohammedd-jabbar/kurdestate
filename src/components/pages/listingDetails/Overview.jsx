/* eslint-disable react/prop-types */
import { LiaBedSolid, LiaBathSolid } from "react-icons/lia";
import { AiOutlineCar } from "react-icons/ai";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaPencilRuler } from "react-icons/fa";

// import {} from "react-icons/fa6";

const Overview = ({ listing }) => {
  return (
    listing && (
      <div className="w-full h-[89vh] max-sm:h-[60vh] bg-white max-xs:max-w-[90%] xs:max-w-[90%] lg:max-w-[85%] mx-auto overflow-y-scroll no-scrollbar">
        <div className="mb-2">
          <h1 className="font-semibold text-2xl py-4 sm:py-8 border-b-2 border-border border-opacity-80">
            Overview
          </h1>
          <div className="grid grid-cols-3 max-sm:grid-cols-2">
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                {/* <AiFillEye className="mr-3 h-6 w-6" /> */}
                <p className="text-2xl font-bold">Status</p>
              </div>
              <p className="text-base font-light">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                <LiaBedSolid className="mr-3 h-6 w-6" />
                <p className="text-2xl font-bold">{listing.beds}</p>
              </div>
              <p className="text-base font-light">Bedrooms</p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                <LiaBathSolid className="mr-3 h-6 w-6" />
                <p className="text-2xl font-bold">{listing.baths}</p>
              </div>
              <p className="text-base font-light">Bathrooms</p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                <AiOutlineCar className="mr-3 h-6 w-6" />
                <p className="text-2xl font-bold">{listing.parking}</p>
              </div>
              <p className="text-base font-light">Garage</p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                <FaPencilRuler className="mr-3 h-5 w-5" />
                <p className="text-2xl font-bold">{listing.area}</p>
              </div>
              <p className="text-base font-light">Meters</p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                <MdOutlineCalendarMonth className="mr-3 h-6 w-6" />
                <p className="text-2xl font-bold">{listing.yearBuilt}</p>
              </div>
              <p className="text-base font-light">Year Built</p>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold text-2xl py-4 sm:py-8 border-b-2 border-border border-opacity-80">
            Description
          </h1>
          <p className="px-6 py-4">{listing.description}</p>
        </div>
      </div>
    )
  );
};

export default Overview;
