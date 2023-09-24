/* eslint-disable no-undef */
import { useState, useEffect, useRef, useContext } from "react";

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
import { SearchResultContext } from "../store/SearchResultProvider";

const Home = () => {
  // offer
  const [offerListing, setOfferListing] = useState(null);
  const { search } = useContext(SearchResultContext);

  // Create reference to store the DOM element containing the animation
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Find Your Dream Property ^500",
        "Find Your Dream House ^500",
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
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        // create the query
        const q = query(
          listingRef,
          where("status", "==", "accepted"),
          orderBy("type"),
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
        setListings(listings);
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
          where("type", "==", "sell"),
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
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-white"
            ></h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl font-medium pt-2 text-white">
              Discover Your Dream Property with Us
            </p>
          </div>
        </div>
      </div>

      <Filters />

      <div>
        <div className="max-w-6xl max-xl:w-[95%] mx-auto pt-4 space-y-6">
          {/* offer */}
          {search && search.length > 0 && (
            <div className="mb-6">
              <h2 className="px-3 font-roboto text-center text-xl mt-6 font-medium">
                Browse Our Exclusive Listings
              </h2>
              <div>
                <Swiper
                  className="my-6"
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
                  {search.map((data) => (
                    <SwiperSlide key={data.id}>
                      <ListingHome listing={data.data} id={data.id} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
          {/* rent */}
          {listings && listings.length > 0 && (
            <div className="mb-6">
              <h2 className="px-3 text-center text-xl my-6 font-semibold">
                Browse Our Exclusive Listings
              </h2>
              <div>
                <Swiper
                  className="my-6"
                  breakpoints={{
                    100: {
                      slidesPerView: 1.2,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2.2,
                      spaceBetween: 20,
                    },
                    796: {
                      slidesPerView: 2.4,
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
                  {listings.map((rent) => (
                    <SwiperSlide key={rent.id}>
                      <ListingHome listing={rent.data} id={rent.id} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* <Link to="/category/rent" className="text-center">
                  <p className="text-white bg-primary-500 inline font-bold text-center p-3 rounded text-sm hover:bg-primary-600 transition duration-150 ease-in-out">
                    Show more places for sale
                  </p>
                </Link> */}
              </div>
            </div>
          )}
          {/* sale */}
          {/* {saleListing && saleListing.length > 0 && (
            <div className="mb-6 mt-12">
              <h2 className="px-3 text-2xl mt-6 font-semibold">
                Places for sale
              </h2>

              <div className="my-6">
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
              <Link to="/category/sale">
                <p className="text-white bg-primary-500 inline font-bold text-center p-3 rounded text-sm hover:bg-primary-600 transition duration-150 ease-in-out">
                  Show more places for sale
                </p>
              </Link>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Home;
