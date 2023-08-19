/* eslint-disable no-unused-vars */
import { useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { notifications } from "../components/Notifications";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const auth = getAuth();
  const navigateTo = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false); // State to handle the name editing, default is false, so the name input is disabled by default and the user can't edit it, when the user click on the edit button, the state will be true and the name input will be enabled

  const [formData, steFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
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
        </div>
      </section>
    </>
  );
};

export default Profile;
