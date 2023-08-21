/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { notifications } from "../components/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const navigateTo = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false); // State to handle the name editing, default is false, so the name input is disabled by default and the user can't edit it, when the user click on the edit button, the state will be true and the name input will be enabled
  const [listings, setListings] = useState(null); // State to store the user listings
  const [isLoading, setIsLoading] = useState(true); // State to handle the loading

  const [formData, steFormData] = useState({
    name: auth.currentUser.displayName, // Set the name in the state to the current user name
    email: auth.currentUser.email, // Set the email in the state to the current user email
  });
  const { name, email } = formData;

  const handleLogout = () => {
    try {
      auth.signOut(auth); // Sign out the current user and update the state
      navigateTo("/");
    } catch (error) {
      notifications("Sorry", "error");
    }
  };

  const handleInputChange = (e) => {
    // Handle the input change
    steFormData((prevState) => ({
      // Update the state with the new values from the input
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeName = async () => {
    try {
      // If the name in the input is not the same as the name in the state, update the name
      if (auth.currentUser.displayName !== name) {
        // Update the name in the state with the new name from the input
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // update the name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          // name: name,
          name,
        });

        notifications("Profile name updated successfully");
      }
    } catch (error) {
      notifications("Could not update the profile name", true);
    }
  };

  useEffect(() => {
    // Fetch the user listings
    const fetchUserListings = async () => {
      // get the listings collection from database
      const listingRef = collection(db, "listings");
      // get the listings where the userRef is equal to the current user id and order them by timestamp
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timeStamp", "desc")
      );

      // Get the querySnapshot from the query it mean get the data from the query
      const querySnapshot = await getDocs(q);

      // Create an empty array to store the listings
      let listings = [];

      // Loop through the querySnapshot and push the data to the listings array
      querySnapshot.forEach((doc) =>
        listings.push({ id: doc.id, data: doc.data() })
      );

      setListings(listings); // Update the state with the listings array
      setIsLoading(false); // Update the state to false to stop the loading
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-4 ">
          <form>
            {/* name input */}
            <input
              type="text"
              id="name"
              disabled={!isEditingName} // If the state is false, the input will be disabled, if it's true, the input will be enabled, so the user can edit the name
              onChange={handleInputChange} // Handle the input change and update the state with the new value from the input
              value={name}
              className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition ease-in-out ${
                isEditingName &&
                "bg-red-200 focus:bg-red-100 focus:border-red-200 focus:ring-0 focus:outline-none  "
              }`}
            />
            {/* email input */}
            <input
              type="email"
              id="email"
              disabled
              value={email}
              className="w-full mb-6 px-4 py-2 mt- text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition ease-in-out "
            />
            <div className="flex justify-between mb-6 whitespace-nowrap text-sm sm:text-lg items-center">
              <p className="flex items-center ">
                Do you want to change your name?
                <span
                  onClick={() => {
                    isEditingName && handleChangeName();
                    setIsEditingName((prevstate) => !prevstate);
                  }} // Toggle the state, if it's false, it will be true, and if it's true, it will be false, so the user can enable/disable the input to edit the name
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer ml-1.5"
                >
                  {/* If the state is true, the text will be "Apply changes", if it's false, the text will be "Edit" */}
                  {isEditingName ? "Apply changes" : "Edit"}
                </span>
              </p>
              <p
                onClick={handleLogout}
                className="text-blue-600 hover:text-blue-800 cursor-pointer transition duration-200 ease-in-out"
              >
                Sign Out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="w-full  bg-blue-600 text-white uppercase px-7 py-3 text-sm font-bold rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow-md hover:shadow-lg active:bg-blue-800  "
          >
            <Link to="/create" className="flex justify-center items-center">
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-7 mx-auto">
        {!isLoading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold my-6">
              My Listing
            </h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 my-6">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
