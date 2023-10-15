/* eslint-disable no-unused-vars */
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ItemSlider from "../components/pages/listingDetails/ItemSlider";
import GoogleMaps from "../components/pages/listingDetails/GoogleMaps";
import Overview from "../components/pages/listingDetails/Overview";
import { notifications } from "../components/common/Notifications";
import UserInfo from "../components/pages/listingDetails/UserInfo";
import Spinner from "../components/common/Spinner";
import { useTranslation } from "react-i18next";
import ShareListing from "../components/pages/listingDetails/ShareListing";

const Listing = () => {
  const location = useLocation();
  const [shareLink, setShareLink] = useState(false);
  const auth = getAuth();
  const { categoryName, listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { t, i18n } = useTranslation("listing");

  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");

  const [activeTab, setActiveTab] = useState("photos");

  useEffect(() => {
    const fetchListings = async () => {
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [listingId]);

  useEffect(() => {
    // get the user info
    if (listing !== null) {
      const getLandLord = async () => {
        const docRef = doc(db, "users", listing.userRef);
        const docSnapId = await getDoc(docRef);

        if (docSnapId.exists()) {
          setLandLord(docSnapId.data());
        } else {
          notifications("Landlord not found", true);
        }
      };
      getLandLord();
    }
  }, [listing]);

  if (isLoading) return <Spinner />;

  const tabs = [
    {
      id: "photos",
      label: <IoMdPhotos className="h-7 w-7" />,
      content: <ItemSlider listingData={listing} />,
    },
    {
      id: "map",
      label: <FaMapLocationDot className="h-7 w-7" />,
      content: <GoogleMaps geo={listing?.location} />,
    },
    {
      id: "overview",
      label: <BsFillInfoCircleFill className="h-7 w-7" />,
      content: <Overview listing={listing} />,
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  String.prototype.toIndiaDigits = function () {
    var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return this.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };

  return (
    <div
      className="flex flex-col max-w-6xl max-xl:max-w-[94%] mt-6 mx-auto"
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
    >
      {/* Basic Info Section */}
      <div className="order-1 max-sm:order-2 max-sm:mt-16 flex w-full max-sm:flex-col max-sm:items-start max-sm:justify-start max-sm:mb-6 justify-between items-center">
        {/* Left Info */}
        <div className="max-sm:w-full">
          <div className="flex mt-6 mb-3 items-center max-sm:justify-between">
            {/* Listing Name */}
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-normal"
              style={{ WebkitTextStrokeWidth: ".5px" }}
            >
              {i18n.language === "ku" ? listing.nameKu : listing.name}
            </h1>
            {/* Listing Type */}
            <p className="ltr:ml-4 rtl:mr-4 bg-primary-500 py-1 px-2 mt-1 text-white rounded-full text-xs sm:text-sm font-semibold h-full">
              {i18n.language === "ku"
                ? listing.typeKu === "کرێ"
                  ? "بۆ کرێ"
                  : "بۆ فرۆشتن"
                : listing.type === "rent"
                ? "For Rent"
                : "For Sell"}
            </p>
          </div>
          {/* Listing Address */}
          <div className="flex mb-6 items-center flex-start">
            <FaMapMarkerAlt className="text-primary-500 rtl:ml-1 ltr:mr-1 h-3 w-3" />
            <p className="truncate font-semibold text-sm text-gray-500">
              {i18n.language === "ku" ? listing.addressKu : listing.address}
            </p>
          </div>
          {/* Tabs */}
        </div>

        <div className="max-sm:w-full flex sm:flex-col justify-between items-center">
          {/* Listing Price */}
          <h1 className="font-extrabold mb-3 text-xl text-primary-600">
            $
            {i18n.language === "ku"
              ? listing.price.toIndiaDigits()
              : listing.price &&
                listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h1>
          <ShareListing listing={listing} id={listingId} />
        </div>
      </div>
      {/* left info */}
      <div className="order-2 max-sm:order-1 flex flex-col md:flex-row">
        <div className="md:w-2/3 md:pr-6 md:rtl:pl-6">
          <div className="flex flex-col">
            {/* buttons */}
            <div className="flex order-3 space-x-5 ltr:mr-3 rtl:ml-3 rtl:space-x-reverse max-sm:order-4 max-sm:justify-center justify-end items-center -mb-14">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`rounded-md p-2 text-white z-10 ${
                    activeTab === tab.id
                      ? "text-opacity-100 bg-primary-500 "
                      : "text-opacity-60 bg-opacity-40 bg-slate-950"
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* contents */}
            <div className="font-light mb-6 order-4 max-sm:order-3 rounded transition duration-200 ease-out text-gray-500 shadow-lg hover:shadow-[0_0_12px_2px_rgba(71,85,95,0.20)] bg-white  ">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`transition-opacity ${
                    activeTab === tab.id ? "block" : "hidden"
                  }`}
                >
                  {tab.content}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Info */}
        <UserInfo landLord={landLord} listing={listing} screen={"md"} />
      </div>
      <UserInfo landLord={landLord} listing={listing} screen={"sm"} />
    </div>
  );
};

export default Listing;
