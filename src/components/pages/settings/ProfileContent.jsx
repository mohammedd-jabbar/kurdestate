/* eslint-disable no-unused-vars */
import { useContext, useRef, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { notifications } from "../../common/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Spinner from "../../common/Spinner";
import { UserInfoContext } from "../../../store/UserInfoProvider";
import { ExpandedContext } from "../../../store/SidebarProvider";
import { BiConfused } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { FcHome } from "react-icons/fc";
import { useTranslation } from "react-i18next";

const ProfileContent = () => {
  // TODO: make the states loading and the component

  const auth = getAuth();
  const { t, i18n } = useTranslation("settings");

  const { data, isLoading, isFetching } = useContext(UserInfoContext);
  const { expanded } = useContext(ExpandedContext);

  const fileInputRef = useRef(null);

  const [isEditingName, setIsEditingName] = useState(false); // State to handle the name editing, default is false, so the name input is disabled by default and the user can't edit it, when the user click on the edit button, the state will be true and the name input will be enabled

  if (isLoading || isFetching) {
    <Spinner />;
  }

  const [formData, setFormData] = useState({
    name: data.displayName,
    email: data.email,
  });

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
          name,
        });

        notifications("Profile name updated successfully");
      }
    } catch (error) {
      notifications("Could not update the profile name", true);
    }
  };

  return (
    <div
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
      className={`max-md:max-w-[95%] h-screen max-md:text-center transition-all duration-200 ease-in-out mt-7 ${
        expanded
          ? `${i18n.language === "ku" ? "md:mr-[13.5rem]" : "md:ml-[13.5rem]"}`
          : `${i18n.language === "ku" ? "md:mr-[5.3rem]" : "md:ml-[5.3rem]"}`
      }`}
    >
      <div>
        <h1 className="text-2xl max-xs:mt-12 font-bold pb-4 border-b border-border">
          {t("General Information")}
        </h1>

        <div className="mt-8 w-full md:w-[50%] px-4 ">
          <div>
            {data.emailVerified === false ? (
              <div className="">
                <BiConfused className="w-24 h-24 my-6 border-primary-500 rounded-full" />
              </div>
            ) : (
              <div className="">
                <img
                  src={data.photoURL}
                  alt="user"
                  className="w-24 h-24 my-6 border border-primary-500 rounded-full "
                />
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold pb-4">
            {t("Change your name")}
          </h3>
          <form className="border-b border-border">
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
                  className="text-white text-center bg-primary-500 hover:bg-primary-600 active:bg-primary-700 focus:bg-primary-700 rounded-md px-3 py-0.5 transition duration-200 ease-in-out cursor-pointer ml-1.5 "
                >
                  {/* If the state is true, the text will be "Apply changes", if it's false, the text will be "Edit" */}
                  {isEditingName ? t("Apply changes") : t("Edit")}
                </span>
              </p>
            </div>
          </form>

          <button
            type="submit"
            className="w-full max-xs:mt-16 mt-4 bg-primary-500 text-white uppercase px-7 py-3 text-sm font-bold rounded-md hover:bg-primary-600 transition duration-200 ease-in-out shadow-md hover:shadow-lg active:bg-primary-700  "
          >
            <Link to="/create" className="flex justify-center items-center">
              <FcHome className="ltr:mr-2 rtl:ml-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              {t("Sell or rent your home")}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
