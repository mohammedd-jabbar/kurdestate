import { useState, useEffect } from "react";

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
import hero from "../assets/images/house-banner.png";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel } from "swiper/modules";

const Home = () => {
  // offer
  const [offerListing, setOfferListing] = useState(null);

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
      <header className="max-w-6xl mx-auto h-full max-h-[640px] mt-6 mb-8 xl:mb-24">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:mr-8 xl:mr-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
            <div>
              <h1 className="text-xl lg:text-[40px] font-semibold leading-none mb-6">
                Find a <span className="text-violet-500">house</span> where you
                can be yourself.
              </h1>
              <p className="max-w-[480px] mb-8 ">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
                magni sunt, dolorem minima cupiditate consequuntur?
              </p>
            </div>
          </div>

          <div className="hidden flex-1 lg:flex justify-end items-end  ">
            <img src={hero} alt="house" />
          </div>
        </div>
      </header>

      <div>
        <div className="max-w-6xl max-lg:w-[95%] mx-auto pt-4 space-y-6">
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
            <div className="mb-6">
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
