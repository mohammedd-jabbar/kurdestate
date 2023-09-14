/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { notifications } from "../../common/Notifications";
import { useNavigate } from "react-router-dom";
import { db } from "../../../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import DashboardItem from "../settings/DashboardItem";
import Spinner from "../../common/Spinner";
import { UserInfoContext } from "../../../store/UserInfoProvider";
import PostItem from "./PostItem";

const PostsContent = () => {
  const { data } = useContext(UserInfoContext);

  const auth = getAuth();
  const navigateTo = useNavigate();
  const [listings, setListings] = useState(null); // State to store the user listings and edit

  const [isLoading, setIsLoading] = useState(true); // State to handle the loading

  useEffect(() => {
    // Fetch the user listings
    const fetchUserListings = async () => {
      // get the listings collection from database
      const listingRef = collection(db, "listings");
      // get the listings where the userRef is equal to the current user id and order them by timestamp
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("status"),
        orderBy("timeStamp", "desc")
      );

      // Get the querySnapshot from the query it mean get the data from the query
      const querySnapshot = await getDocs(q);

      // Create an empty array to store the listings data and update the listings state with it
      let listings = [];

      // Loop through the querySnapshot and push the data to the listings array
      querySnapshot.forEach((doc) =>
        listings.push({ id: doc.id, data: doc.data() })
      );

      setListings(listings); // Update the state with the listings array
      setIsLoading(false); // Update the state to false to stop the loading
    };
    fetchUserListings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      // Delete the listing from the firestore
      await deleteDoc(doc(db, "listings", id));

      // Create a new array without the deleted listing, we return all the listings that their id is not equal to the id of the listing that we want to delete
      const updatedListings = listings.filter((listing) => listing.id !== id);
      // Update the state with the new listings, if we don't do that, the listing will not be removed from the UI until we refresh the page, so we do that to remove the listing from the UI without refreshing the page
      setListings(updatedListings);

      notifications("Listing deleted successfully");
    }
  };

  const handleEdit = (id) => {
    navigateTo(`/edit/${id}`);
  };

  return (
    <div className="max-w-6xl md:ml-[5.3rem] mr-0 z-0 px-3 mt-7">
      {!isLoading && listings.length > 0 && (
        <>
          <h2 className="text-2xl text-center font-semibold my-6">
            My Listing
          </h2>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 my-6">
            {listings.map((listing) => (
              <PostItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
                onDelete={() => handleDelete(listing.id)}
                onEdit={() => handleEdit(listing.id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PostsContent;