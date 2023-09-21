/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ListingHome = ({ listing, id }) => {
  return (
    <div className="bg-white group rounded-none flex flex-col justify-between items-center shadow-md hover:shadow-xl transition-shadow w-full duration-300 overflow-hidden">
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
          <div className="absolute bottom-3 left-1 px-4 transform transition-transform group-hover:-translate-y-8 duration-[.5s] ease-in-out ">
            <h1 className="text-white truncate text-2xl font-semibold">
              {listing.name}
            </h1>
            <h3 className="text-white truncate py-2 text-lg font-semibold">
              $
              {listing.price &&
                listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h3>
            <div className="flex justify-start space-x-3 text-white items-center">
              <p className="font-medium">
                {listing.beds > 1 ? `${listing.beds} Beds | ` : "1 Bed | "}
              </p>
              <p className="font-medium">
                {listing.bath > 1 ? `${listing.bath} Baths | ` : "1 Bath | "}
              </p>
              <p className="max-xs:hidden font-medium">
                {listing.parking > true ? "Parking Spot" : "No Parking"}
              </p>
            </div>
          </div>
          {/* "View Details" text from bottom */}
          <div className="absolute bottom-0 w-full left-1 transform translate-y-full group-hover:translate-y-0 duration-[.5s] ease-in-out">
            <Link to={`/category/${listing.type}/${id}`}>
              <p className="text-start text-white text-sm px-4 pb-2 font-medium">
                View Details
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingHome;
