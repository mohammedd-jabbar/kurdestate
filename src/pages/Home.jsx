import { useState, useEffect } from "react";
// import Slider from "../components/Slider";

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
import ListingHome from "../components/ListingHome";

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
        className="h-screen"
        style={{
          background: `url("https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1596&q=80") center no-repeat`,
          backgroundSize: "cover",
        }}
      ></div>
      <div>
        <div className="max-w-6xl mx-auto pt-4 space-y-6">
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
