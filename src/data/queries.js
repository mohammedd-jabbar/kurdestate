/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import { getDocs, orderBy, query, collection, where } from "firebase/firestore";

const auth = getAuth();

export const getUserInfo = async () => {
  try {
    return await new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          reject({ isNotAuthenticated: true });
        }
      });
    });
  } catch (error) {
    throw error; // Rethrow the error to propagate it further if needed
  }
};

export const getPropertyLocations = async () => {
  try {
    const listingRef = collection(db, "listings");
    // get the listings where the userRef is equal to the current user id and order them by timestamp
    const q = query(
      listingRef,
      where("status", "==", "accepted"),
      orderBy("timeStamp", "desc")
    );

    // Get the querySnapshot from the query it mean get the data from the query
    const querySnapshot = await getDocs(q);

    // Create an empty array to store the listings data and update the listings state with it
    let locations = [];

    // Loop through the querySnapshot and push the data to the locations array
    querySnapshot.forEach((doc) => locations.push(doc.data()));

    return locations;
  } catch (error) {
    throw error;
  }
};
