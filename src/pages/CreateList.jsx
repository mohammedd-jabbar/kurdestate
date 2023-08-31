/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import Spinner from "../components/common/Spinner"; // for the loading state
import { notifications } from "../components/common/Notifications"; // for the notifications
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"; // for the storage
import { getAuth } from "firebase/auth"; // for the auth to get the current user
import { v4 as uuid } from "uuid"; // for the unique id to store the images
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";

const CreateList = () => {
  const currentYear = new Date().getFullYear();
  const navigateTo = useNavigate();
  const auth = getAuth();
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(true); // if you don't have a google api for geo location, set this to false, then you can enter the latitude and longitude manually

  const [formData, setFormData] = useState({
    // the form data
    type: "rent",
    name: "",
    beds: 1,
    baths: 1,
    parking: 0,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    area: 0, // Initial value for Sq Ft
    yearBuilt: 1800, // Initial value for Year Built
  });

  const [loading, setLoading] = useState(false); // for the loading state

  const {
    type,
    name,
    beds,
    baths,
    parking,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    images,
    area,
    yearBuilt,
  } = formData; // destructure the form data

  const onFormChange = (e) => {
    // handle the form change for each input or button
    let boolean = null; // to change the button values from false to true and vice versa

    if (e.target.value === "true") {
      // if the value is true, set the boolean to true
      boolean = true;
    }
    if (e.target.value === "false") {
      // if the value is false, set the boolean to false
      boolean = false;
    }

    // Files
    if (e.target.files) {
      // if the input type is file (images) set the images in the state, the images will be an array of files
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // text//number//boolean
    if (!e.target.files) {
      // if the input type is not file (images) set the values in the state
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value, // we say the target id it mean the state name, for example if the input name is rent, the state name is rent, if the input name is beds, the state name is beds, and then we checked before in above if the value for this input or button is false or true it mean if this is a button or not, if it is a button, set the value to boolean, if it is not a button, set the value to the input value it mean it's a text or number
      }));
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // set the loading to true while we are uploading the images or storing the data

    // if the discounted price is greater than or equal to the regular price, return an error
    if (+discountedPrice >= +regularPrice) {
      // this is came with string, so we need to convert it to number

      setLoading(false);
      notifications(
        "Discounted price must be less than the regular price",
        true
      );
      return;
    }

    if (images.length > 6) {
      // if the images length is greater than 6, return an error
      setLoading(false);
      notifications("You can only upload load 6 images", true);
      return;
    }

    // Loop through each image and check its size
    for (const image of images) {
      if (image.size > 2.1 * 1024 * 1024) {
        setLoading(false);
        notifications("Images must be less than 2.1 MB in size", true);
        return;
      }
    }

    let geoLocation = {}; // for the geo location of the address, this is for the manual latitude and longitude, if you don't have a google api for geo location, set the geoLocationEnabled to false, then you can enter the latitude and longitude manually, if you have a google api for geo location, then you can enter the address and the latitude and longitude will be generated automatically
    let location; // location to test the error from the google api

    if (geoLocationEnabled) {
      // this check is for having a google api for geo location
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBJfZw-DJ1F1vIaZuahr_EeXHcT2dlnIps`
      );

      const data = await res.json();
      geoLocation.lat = data.results[0]?.geometry.location.lat ?? 0; // get the latitude from the google api, if the google api return an error, set the latitude to 0
      geoLocation.lng = data.results[0]?.geometry.location.lng ?? 0; // get the longitude from the google api, if the google api return an error, set the longitude to 0

      location = data.status === "ZERO_RESULTS" && undefined; // if the google api return an error, set the location to undefined

      if (location === undefined) {
        // if the google api return an error, return an error
        setLoading(false);
        notifications("Invalid address, Please Enter a correct address", true);
        return;
      }
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
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL); // if the upload is successful, resolve the promise and return the download url
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      // store all the images in the firebase storage and get the download url for each image using the storeImage function that we created above
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      notifications("Images must be less than 2 MB in size", true);
      return;
    });

    // Store the listing status as pending
    const listingStatus = "pending";

    // copy the formData object to formDataCopy
    const formDataCopy = {
      ...formData, // copy the formData object to formDataCopy
      imgUrls, // add the imgUrls that we uploaded to the firebase storage
      status: listingStatus,
      geoLocation, // and manually latitude and longitude
      timeStamp: serverTimestamp(), // add the timestamp when the listing was created
      userRef: auth.currentUser.uid, // add the user id to the listing
    };

    // delete the things that we don't need
    delete formDataCopy.images; // delete the images from the formDataCopy because we don't need it anymore
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;

    !formDataCopy.offer ?? delete formDataCopy.discountedPrice; // if the offer is false, delete the discountedPrice from the formDataCopy because it mean we don't have a discount

    const docRef = await addDoc(collection(db, "listings"), formDataCopy); // add the listing to the firestore
    setLoading(false);
    notifications("Listing created successfully"); // show a success notification
    navigateTo(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  if (loading) {
    // if the loading is true, show the spinner
    return <Spinner />;
  }

  return (
    <>
      <main className="max-w-md px-2 mx-auto">
        <h1 className="text-3xl font-bold text-center mt-6 ">Create Listing</h1>
        <form onSubmit={onFormSubmit}>
          {/* Sell and Rent */}
          <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
          <div className="flex">
            <button
              type="button"
              id="type"
              value="sale"
              onClick={onFormChange}
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                type === "rent"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              Sell
            </button>
            <button
              type="button"
              id="type"
              value="rent"
              onClick={onFormChange}
              className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                type === "sale"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              Rent
            </button>
          </div>
          {/* Name */}
          <p className="text-lg mt-6 font-semibold">Name</p>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onFormChange}
            placeholder="Your Property Name"
            maxLength="32"
            minLength="6"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
          />
          {/* Beds and Baths */}
          <div className="flex space-x-6">
            <div className="">
              <p className="text-lg font-semibold">Beds</p>
              <input
                type="number"
                name="beds"
                id="beds"
                value={beds}
                onChange={onFormChange}
                min="1"
                max="50"
                required
                className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold">Baths</p>
              <input
                type="number"
                name="baths"
                id="baths"
                value={baths}
                onChange={onFormChange}
                min="1"
                max="50"
                required
                className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
              />
            </div>
          </div>
          {/* Parking */}
          <p className="text-lg mt-6 font-semibold">Parking Spot</p>
          <div className="flex">
            <input
              type="number"
              name="parking"
              id="parking"
              value={parking}
              onChange={onFormChange}
              min="0"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
            />
          </div>
          {/* Sq Ft */}
          <div className="flex items-center my-6">
            <div className="">
              <p className="text-lg font-semibold">Area (Square Meters)</p>
              <input
                type="text"
                id="area"
                value={area}
                onChange={onFormChange}
                min="0"
                required
                className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
          {/* Year Built */}
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">Year Built</p>
              <input
                type="number"
                id="yearBuilt"
                value={yearBuilt}
                onChange={onFormChange}
                min="1800"
                max={currentYear}
                required
                className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Address */}
          <p className="text-lg mt-6 font-semibold">Address</p>
          <textarea
            type="text"
            id="address"
            value={address}
            onChange={onFormChange}
            placeholder="Your Property Address"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
          />

          {/* Description */}
          <p className="text-lg font-semibold">Description</p>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={onFormChange}
            placeholder="Description"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none "
          />
          {/* Offer */}
          <p className="text-lg mt-6 font-semibold">Offer</p>
          <div className="flex mb-6">
            <button
              type="button"
              id="offer"
              value={true}
              onClick={onFormChange}
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                !offer ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="offer"
              value={false}
              onClick={onFormChange}
              className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                offer ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              No
            </button>
          </div>
          {/* Regular Price */}
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">Regular Price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="regularPrice"
                  value={regularPrice}
                  onChange={onFormChange}
                  min="50"
                  max="400000000"
                  required
                  className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                />
                {type === "rent" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap">
                      $ / Months
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* discounted Price */}
          {offer && (
            <div className="flex items-center mb-6">
              <div className="">
                <p className="text-lg font-semibold">Discounted Price</p>
                <div className="flex w-full justify-center items-center space-x-6">
                  <input
                    type="number"
                    id="discountedPrice"
                    value={discountedPrice}
                    onChange={onFormChange}
                    min="1"
                    max="400000000"
                    required={offer}
                    className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                  />
                  {type === "rent" && (
                    <div className="">
                      <p className="text-md w-full whitespace-nowrap">
                        $ / Months
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Images */}
          <div className="mb-6">
            <p className="text-lg mt-6 font-semibold">Images</p>
            <p className="text-gray-600">
              The first image will be the cover (max 6)
            </p>
            <input
              type="file"
              id="images"
              onChange={onFormChange}
              accept=".jpg,.png,.jpeg"
              multiple
              required
              className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:bg-blue-700 active:bg-blue-700 active:shadow-lg transition duration-200 ease-in-out"
          >
            Create Listing
          </button>
        </form>
      </main>
    </>
  );
};

export default CreateList;
