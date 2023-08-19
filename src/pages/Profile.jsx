/* eslint-disable no-unused-vars */
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { notifications } from "../components/Notifications";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, steFormData] = useState({
    name: "Mohammed", //auth.currentUser.displayName,
    email: "nnn", //auth.currentUser.email,
  });
  const { name, email } = formData;

  const onLogout = () => {
    try {
      auth.signOut(auth);
      navigate("/");
    } catch (error) {
      notifications("Sorry", "error");
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
              disabled
              value={name}
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition ease-in-out "
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
                <span className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer ml-1.5">
                  Edit
                </span>
              </p>
              <p
                onClick={onLogout}
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
