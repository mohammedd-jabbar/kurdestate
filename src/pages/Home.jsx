import { useState, useEffect } from "react";
import Slider from "../components/Slider";

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
import ListingItem from "../components/ListingItem";
import ListingHome from "../components/ListingHome";

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
        setSaleListing(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {/* offer */}
        {offerListing && offerListing.length > 0 && (
          <div className="mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent Offers</h2>
            <Link to="/offers">
              <p className="text-blue-600 px-3 text-sm hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListing.map((offer) => (
                <ListingHome
                  key={offer.id}
                  listing={offer.data}
                  id={offer.id}
                />
              ))}
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
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rentListing.map((rent) => (
                <ListingItem key={rent.id} listing={rent.data} id={rent.id} />
              ))}
            </ul>
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
            <div className="sm:grid mb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md gap-x-6">
              {saleListing.map((sale) => (
                <ListingHome key={sale.id} listing={sale.data} id={sale.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
