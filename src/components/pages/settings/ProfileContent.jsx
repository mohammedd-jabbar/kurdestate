/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { notifications } from "../../common/Notifications";
import { useNavigate } from "react-router-dom";
import { db } from "../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Spinner from "../../common/Spinner";
import { useUserInfo } from "../../../data/queries";

const ProfileContent = () => {
  // TODO: make the states loading and the component

  const auth = getAuth();

  const { isLoading, data, error, isFetching, refetch } = useUserInfo();

  const navigateTo = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false); // State to handle the name editing, default is false, so the name input is disabled by default and the user can't edit it, when the user click on the edit button, the state will be true and the name input will be enabled

  const [listings, setListings] = useState(null); // State to store the user listings and edit them

  if (isLoading || isFetching) {
    <Spinner />;
  }

  const [formData, setFormData] = useState({
    name: data?.name,
    email: data?.email,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: data?.name,
      email: data?.email,
    }));
  }, [data]);

  const { name, email } = formData;

  const handleInputChange = (e) => {
    // Handle the input change
    setFormData((prevState) => ({
      // Update the state with the new values from the input
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeName = async () => {
    try {
      // If the name in the input is not the same as the name in the state, update the name
      if (auth?.currentUser?.displayName !== name) {
        // Update the name in the state with the new name from the input
        await updateProfile(auth?.currentUser, {
          displayName: name,
        });
        // update the name in the firestore
        const docRef = doc(db, "users", auth?.currentUser?.uid);
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

  return (
    <div className="max-w-6xl ml-24 mr-0 mt-7">
      <div>
        <h1 className="text-2xl font-bold pb-4 border-b border-border">
          General Information
        </h1>

        <div className="mt-8 w-full md:w-[50%] px-4 ">
          <h3 className="text-xl font-semibold pb-4">Change your name</h3>
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
                "bg-blue-100 focus:bg-blue-100 focus:border-blue-100 focus:ring-0 focus:outline-none  "
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
              <p className="flex items-center justify-center">
                <span
                  onClick={() => {
                    isEditingName && handleChangeName();
                    setIsEditingName((prevstate) => !prevstate);
                  }} // Toggle the state, if it's false, it will be true, and if it's true, it will be false, so the user can enable/disable the input to edit the name
                  className="text-white text-center bg-primary-500 hover:bg-primary-600 active:bg-primary-700 focus:bg-primary-700 rounded-md px-3 py-0.5 transition duration-200 ease-in-out cursor-pointer ml-1.5"
                >
                  {/* If the state is true, the text will be "Apply changes", if it's false, the text will be "Edit" */}
                  {isEditingName ? "Apply changes" : "Edit"}
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
