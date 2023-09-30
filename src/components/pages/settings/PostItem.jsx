/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { useState } from "react";
import DeleteModal from "../../common/DeleteModal";

const PostItem = ({ listing, onDelete, onEdit, id }) => {
  const navigateTo = useNavigate();

  const [isOpen, setIsOpen] = useState(false); // State to handle open module

  return (
    <>
      <DeleteModal
        open={isOpen}
        childern={
          <>
            <div className="mx-auto my-4 w-72 z-50">
              <h3 className="text-lg font-black text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-500 pt-2">
                Are you sure you want to delete this listing?
              </p>
            </div>
            <div className="flex mt-8 gap-6">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full font-inter bg-white border border-border text-black rounded-md py-1.5 px-3 "
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onDelete(listing.id);
                }}
                className="w-full font-inter bg-red-600 text-white rounded-md py-1.5 px-3 hover:bg-red-700 active:bg-red-800 transition-all duration-150 ease-in-out"
              >
                Confirm
              </button>
            </div>
          </>
        }
        onClose={() => setIsOpen(false)}
      />
      <div className="bg-white flex flex-col justify-between items-center rounded-md shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-8 m-[10px]">
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
            <div className="absolute z-0 rounded top-2 duration-200 group group-hover:scale-105 left-2 w-24 h-8 bg-primary-500">
              <p className="text-center pt-1.5 text-gray-100 font-semibold text-sm">
                {listing.type === "rent" ? "Rent" : "Sell"}
              </p>
            </div>
          </div>
          {/* Heart wishList */}
          <a href="#" className="block w-full relative p-4">
            <div className="mb-2">
              <div className="mb-4 pb-4 space-y-2 border-gray-400 border-opacity-20">
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
            </div>
            <Link>
              <CgDetailsMore
                className="absolute text-red-500 w-[24px] h-[24px] mb-[-3px] hover:text-red-700 bottom-2 right-14 cursor-pointer"
                onClick={() => navigateTo(`/category/${listing.type}/${id}`)}
              />
            </Link>
            {onDelete && (
              <FaTrash
                className="absolute text-red-500 w-[18px] h-[16px] hover:text-red-700 bottom-2 right-2 cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
            {onEdit && (
              <MdEdit
                className="absolute text-primary-500 w-[18px] h-[18px] hover:text-primary-700  bottom-2 right-8 cursor-pointer"
                onClick={() => onEdit(listing.id)}
              />
            )}
          </a>
        </Link>
      </div>
    </>
  );
};

export default PostItem;
