/* eslint-disable react/prop-types */
import { LiaBedSolid, LiaBathSolid } from "react-icons/lia";
import { AiOutlineCar, AiFillEye } from "react-icons/ai";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaSearchLocation } from "react-icons/fa";
// import {} from "react-icons/fa6";

const Overview = ({ listing }) => {
  return (
    listing && (
      <div className="w-full h-[89vh] max-sm:h-[60vh] bg-white max-xs:max-w-[90%] xs:max-w-[90%] lg:max-w-[85%] mx-auto overflow-y-scroll no-scrollbar">
        <div className="mb-2">
          <h1 className="font-semibold text-2xl py-8 border-b-2 border-border border-opacity-80">
            Overview
          </h1>
          <div className="grid grid-cols-3">
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                {/* <FaHouse className="mr-3 h-6 w-6" /> */}
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
                <LiaBedSolid className="mr-3 h-6 w-6" />
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
                <LiaBedSolid className="mr-3 h-6 w-6" />
                <p className="text-2xl font-bold">{listing.beds}</p>
              </div>
              <p className="text-base font-light">Bedrooms</p>
            </div>
            <div className="flex flex-col px-6">
              <div className="flex pt-6 pb-1 items-center">
                <LiaBedSolid className="mr-3 h-6 w-6" />
                <p className="text-2xl font-bold">{listing.beds}</p>
              </div>
              <p className="text-base font-light">Bedrooms</p>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold text-2xl py-8 border-b-2 border-border border-opacity-80">
            Description
          </h1>
          <p className="px-6 py-4">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent
          </p>
        </div>
      </div>
    )
  );
};

export default Overview;
