/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Spinner from "../components/common/Spinner";
import { notifications } from "../components/common/Notifications";
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
import ListingItem from "../components/common/ListingItem";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Category = () => {
  const [listings, setListings] = useState(null);
  const [lastFetchListings, setLastFetchListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const { categoryName } = useParams();
  const { t, i18n } = useTranslation("category");

  useEffect(() => {
    const fetchListings = async () => {
      if (categoryName === "sell" || categoryName === "rent") {
        try {
          const listingRef = collection(db, "listings");
          const q = query(
            listingRef,
            where("type", "==", categoryName),
            where("status", "==", "accepted"),
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
          notifications("Could not fetch offers", true);
        }
      } else {
        try {
          const listingRef = collection(db, "listings");
          const q = query(
            listingRef,
            where("category", "==", categoryName),
            where("status", "==", "accepted"),
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
          notifications("Could not fetch", true);
        }
      }
    };
    fetchListings();
  }, [categoryName]);

  const handleFetchMoreListings = async () => {
    if (categoryName === "sell" || categoryName === "rent") {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", categoryName),
          where("status", "==", "accepted"),
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
        notifications("Could not fetch");
      }
    } else {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("category", "==", categoryName),
          where("status", "==", "accepted"),
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
        notifications("Could not fetch");
      }
    }
  };

  if (loading) {
    <Spinner />;
  }

  return (
    <div
      className="max-w-6xl mx-auto px-3"
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
    >
      <h1 className="text-3xl text-center my-6 font-bold">
        {categoryName === "rent"
          ? t("Places for Rent")
          : categoryName === "sell"
          ? t("Places for Sell")
          : categoryName === "house"
          ? t("Houses")
          : categoryName === "apartment"
          ? t("Apartments")
          : categoryName === "land"
          ? t("Lands")
          : categoryName === "shop"
          ? t("Shops")
          : t("There is no place for that name")}
      </h1>
      {listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3">
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
                {t("Load More")}
              </button>
            </div>
          )}
        </>
      ) : (
        <p>{t("There are no current place for this category")}</p>
      )}
    </div>
  );
};

export default Category;
