/* eslint-disable no-undef */
import { useState, useEffect, useRef } from "react";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import ListingHome from "../components/pages/home/ListingHome";
import hero from "../assets/images/hero.jpg";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel } from "swiper/modules";
import Filters from "../components/pages/home/Filters";
import Typed from "typed.js";

const Home = () => {
  // offer
  const [offerListing, setOfferListing] = useState(null);

  // Create reference to store the DOM element containing the animation
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Find Your Dream Home ^500",
        "Find Your Dream Property ^500",
        "Find Your Dream Place ^500",
        "Find Your Dream Land ^500",
        "Find Your Dream Villa ^500",
      ],
      typeSpeed: 55,
      showCursor: false,
      smartBackspace: true,
      loop: true,
      loopCount: Infinity,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        // create the query
        const q = query(
          listingRef,
          where("offer", "==", true),
          where("status", "==", "accepted"),
          orderBy("timeStamp", "desc"),
          limit(4)
        );

        const snapShotQuery = await getDocs(q);
        let listings = [];
        snapShotQuery.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListing(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  // rent
  const [rentListing, setRentListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        // create the query
        const q = query(
          listingRef,
          where("type", "==", "rent"),
          where("status", "==", "accepted"),
          orderBy("timeStamp", "desc"),
          limit(4)
        );

        const snapShotQuery = await getDocs(q);
        let listings = [];
        snapShotQuery.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListing(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  // sale
  const [saleListing, setSaleListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        // create the query
        const q = query(
          listingRef,
          where("type", "==", "sale"),
          where("status", "==", "accepted"),
          orderBy("timeStamp", "desc"),
          limit(6)
        );

        const snapShotQuery = await getDocs(q);
        let listings = [];
        snapShotQuery.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListing(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  return (
    <>
      <div
        className="h-[97vh]"
        style={{
          background: `url(${hero}) center no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{ background: "rgba(0, 0, 0, .5)" }}
        >
          <div className="absolute top-[47%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
            <h1
              ref={el}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold text-white"
            ></h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl font-medium pt-2 text-white">
              Explore Our Listings and Discover Your Perfect Property
            </p>
          </div>
        </div>
      </div>

      <Filters />

      <div>
        <div className="max-w-6xl max-xl:w-[95%] mx-auto pt-4 space-y-6">
          {/* offer */}
          {offerListing && offerListing.length > 0 && (
            <div className="mb-6">
              <h2 className="px-3 text-2xl mt-6 font-semibold">
                Recent Offers
              </h2>
              <Link to="/offers">
                <p className="text-blue-600 px-3 text-sm hover:text-blue-800 transition duration-150 ease-in-out">
                  Show more offers
                </p>
              </Link>
              <div className="mb-6">
                <Swiper
                  breakpoints={{
                    100: {
                      slidesPerView: 1.4,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2.4,
                      spaceBetween: 20,
                    },
                    796: {
                      slidesPerView: 2.6,
                      spaceBetween: 25,
                    },
                    930: {
                      slidesPerView: 2.8,
                      spaceBetween: 25,
                    },
                    1110: {
                      slidesPerView: 3.7,
                      spaceBetween: 30,
                    },
                  }}
                  loop={false}
                  freeMode={true}
                  mousewheel={true}
                  grabCursor={true}
                  modules={[FreeMode, Mousewheel]}
                >
                  {offerListing.map((offer) => (
                    <SwiperSlide key={offer.id}>
                      <ListingHome listing={offer.data} id={offer.id} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
          {/* rent */}
          {rentListing && rentListing.length > 0 && (
            <div className="mb-6">
              <h2 className="px-3 text-2xl mt-6 font-semibold">
                Places for rent
              </h2>
              <Link to="/category/rent">
                <p className="text-blue-600 px-3 text-sm hover:text-blue-800 transition duration-150 ease-in-out">
                  Show more places for rent
                </p>
              </Link>
              <div className="mb-6">
                <Swiper
                  breakpoints={{
                    100: {
                      slidesPerView: 1.4,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2.4,
                      spaceBetween: 20,
                    },
                    796: {
                      slidesPerView: 2.6,
                      spaceBetween: 25,
                    },
                    930: {
                      slidesPerView: 2.8,
                      spaceBetween: 25,
                    },
                    1110: {
                      slidesPerView: 3.7,
                      spaceBetween: 30,
                    },
                  }}
                  loop={false}
                  freeMode={true}
                  mousewheel={true}
                  grabCursor={true}
                  modules={[FreeMode, Mousewheel]}
                >
                  {rentListing.map((rent) => (
                    <SwiperSlide key={rent.id}>
                      <ListingHome listing={rent.data} id={rent.id} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
          {/* sale */}
          {saleListing && saleListing.length > 0 && (
            <div className="mb-6 mt-12">
              <h2 className="px-3 text-2xl mt-6 font-semibold">
                Places for sale
              </h2>
              <Link to="/category/sale">
                <p className="text-blue-600 px-3 text-sm hover:text-blue-800 transition duration-150 ease-in-out">
                  Show more places for sale
                </p>
              </Link>
              <div className="mb-6">
                <Swiper
                  breakpoints={{
                    100: {
                      slidesPerView: 1.4,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2.4,
                      spaceBetween: 20,
                    },
                    796: {
                      slidesPerView: 2.6,
                      spaceBetween: 25,
                    },
                    930: {
                      slidesPerView: 2.8,
                      spaceBetween: 25,
                    },
                    1110: {
                      slidesPerView: 3.7,
                      spaceBetween: 30,
                    },
                  }}
                  loop={false}
                  freeMode={true}
                  mousewheel={true}
                  grabCursor={true}
                  modules={[FreeMode, Mousewheel]}
                >
                  {saleListing.map((sale) => (
                    <SwiperSlide key={sale.id}>
                      <ListingHome listing={sale.data} id={sale.id} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
