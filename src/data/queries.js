/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import {
  getDocs,
  orderBy,
  query,
  collection,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuid } from "uuid"; // for the unique id to store the images
import { notifications } from "../components/common/Notifications"; // for the notifications
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"; // for the storage
import { redirect, useNavigate } from "react-router-dom";

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

export const addListing = async (form) => {
  let location = {}; // location google api

  // this is for a google api for geo location
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${form.address}&key=AIzaSyBJfZw-DJ1F1vIaZuahr_EeXHcT2dlnIps`
  );

  const data = await res.json();
  location.lat = data.results[0]?.geometry.location.lat ?? 0; // get the latitude from the google api, if the google api return an error, set the latitude to 0
  location.lng = data.results[0]?.geometry.location.lng ?? 0; // get the longitude from the google api, if the google api return an error, set the longitude to 0

  // if the google api return an error, return an error
  if (data.status === "ZERO_RESULTS" && undefined) {
    notifications("Invalid address, Please Enter a correct address", true);
    return;
  }

  // this function is for storing the images in the firebase storage
  async function storeImage(image) {
    return new Promise((resolve, reject) => {
      // we will use promise and we return reject or resolve
      const storage = getStorage(); // get the storage from firebase

      const filename = `${auth.currentUser.uid}-${image.name}-${uuid()}`; // create a unique name for the image and add the user id to it to make it unique for each user also, this is for the security, and then we add the uuid to the name to make it more unique

      const storageRef = ref(storage, filename); // create a reference for the storage and pass the storage and the filename to it

      const uploadTask = uploadBytesResumable(storageRef, image); // upload the image to the storage reference

      uploadTask.on(
        // this is for the progress of the upload
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error); // if there is an error, reject the promise
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL); // if the upload is successful, resolve the promise and return the download url
          });
        }
      );
    });
  }

  const imgUrls = await Promise.all(
    // store all the images in the firebase storage and get the download url for each image using the storeImage function that we created above
    [...form.images].map((image) => storeImage(image))
  ).catch((error) => {
    notifications("Images must be less than 2 MB in size", true);
    return;
  });

  // Store the listing status as pending
  const listingStatus = "pending";

  // copy the formData object to formDataCopy
  const formDataCopy = {
    ...form.formDataKu,
    ...form.formDataEn, // copy the formData object to formDataCopy
    imgUrls, // add the imgUrls that we uploaded to the firebase storage
    status: listingStatus,
    location, // and manually latitude and longitude
    timeStamp: serverTimestamp(), // add the timestamp when the listing was created
    userRef: auth.currentUser.uid, // add the user id to the listing
  };

  // delete the things that we don't need
  delete formDataCopy.images; // delete the images from the formDataCopy because we don't need it anymore
  delete formDataCopy.latitude;
  delete formDataCopy.longitude;

  const docRef = await addDoc(collection(db, "listings"), formDataCopy); // add the listing to the firestore

  notifications("Listing created successfully"); // show a success notification
  redirect(`/category/${formDataCopy.type}/${docRef.id}`);
};
