/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { notifications } from "../components/Notifications";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";

const Category = () => {
  const [listings, setListings] = useState(null);
  const [lastFetchListings, setLastFetchListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", categoryName),
          orderBy("timeStamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListings(lastVisible);
        let listing = [];

        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listing);

        setLoading(false);
      } catch (error) {
        console.log(error);
        notifications("Could not fetch offers");
      }
    };
    fetchListings();
  }, [categoryName]);

  const handleFetchMoreListings = async () => {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", categoryName),
        orderBy("timeStamp", "desc"),
        startAfter(lastFetchListings),
        limit(4)
      );
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListings(lastVisible);
      let listing = [];

      querySnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prev) => [...prev, ...listing]);

      setLoading(false);
    } catch (error) {
      console.log(error);
      notifications("Could not fetch offers");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center my-6 font-bold">
        {categoryName === "rent"
          ? "Places for Rent"
          : categoryName === "sale"
          ? "Places for Sale"
          : "There is no place for that name"}
      </h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((offer) => (
                <ListingItem
                  listing={offer.data}
                  id={offer.id}
                  key={offer.id}
                />
              ))}
            </ul>
          </main>
          {lastFetchListings && (
            <div className="flex justify-center items-center">
              <button
                onClick={handleFetchMoreListings}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 my-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>
          There are no current
          {categoryName === "rent" ? " Places for Rent" : "sale"}
        </p>
      )}
    </div>
  );
};

export default Category;