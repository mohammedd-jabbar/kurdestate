/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/common/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { notifications } from "../components/common/Notifications";
import signUpSvg from "../assets/svg/login.svg";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const navigateTo = useNavigate();

  const { t, i18n } = useTranslation("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // this state will be used to toggle the password visibility
  const [showPassword, setShowPassword] = useState(false);

  const { email, password, name } = formData;

  // On change function for input fields to update state with user input
  const handleInputChange = (e) => {
    /// this function will update the state with the user input, setFormData is a function that will update the state
    setFormData((prevState) => ({
      // ...prevState will copy the previous state
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      // this function will create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // this function will update the user profile with the name
      updateProfile(auth.currentUser, { displayName: name });

      const user = userCredential.user;

      const formDataCopy = { ...formData };

      // this will add the timestamp to the formDataCopy
      formDataCopy.timestamp = serverTimestamp();

      // this will create a new document in the users firebase database with the user id, it mean we add the user data to the database
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      // this will redirect the user to the home page
      navigateTo("/");
      window.location.reload();
      notifications("Sign Up was successful!");
    } catch (error) {
      notifications("Something went wrong, try again!", true);
    }
  };

  return (
    <section dir={i18n.language === "ku" ? "rtl" : "ltr"}>
      <h1 className="text-3xl text-center mt-8 mb-4 font-bold">
        {t("Sign Up")}
      </h1>

      <div className="flex justify-center items-center flex-wrap px-6 max-lg:mt-8 pb-12 mx-auto max-w-6xl">
        <div className="bg-headerBackground w-full shadow-lg md:w-[50%] p-8 rounded-lg">
          <form onSubmit={handleFormSubmit}>
            <h1 className="text-2xl ltr:font-inter font-semibold">
              {t("Welcome back")}
            </h1>
            <h1 className="text-sm my-1 cursor-pointer ltr:font-inter font-normal">
              {t("Listing your property in seconds. have an account?")}
              <span
                className="text-primary-500"
                onClick={() => navigateTo("/login")}
              >
                {" "}
                {t("Login.")}
              </span>
            </h1>
            <div className="mt-6 flex flex-col md:flex-row space-y-7 md:space-y-0 md:space-x-7 rtl:md:space-x-reverse">
              <div>
                <label className="mb-2">{t("Name")}</label>
                <input
                  id="name"
                  value={name}
                  type="text"
                  placeholder="John Wick"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition ease-in-out duration-[400ms]"
                />
              </div>
              <div>
                <label className="mb-2">{t("Email")}</label>
                <input
                  id="email"
                  value={email}
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition ease-in-out duration-[400ms]"
                />
              </div>
            </div>
            <div className="my-4">
              <label className="mb-2">{t("Password")}</label>
              <input
                min="6"
                id="password"
                value={password}
                type={showPassword ? "text" : "password"} // if showPassword is true, show text, else show password
                placeholder="*****"
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition ease-in-out duration-[400ms]"
              />
              {showPassword ? ( // if showPassword is true, show AiFillEyeInvisible icon
                <AiFillEyeInvisible
                  className="absolute right-3 top-[.9rem] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-[.9rem] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <div className="flex justify-end items-center mb-6 whitespace-nowrap text-sm sm:text-lg">
              <p>
                <Link
                  to="/forgot-password"
                  className="text-primary-600 hover:text-primary-800 transition duration-200 ease-in-out"
                >
                  {t("Forgot Password?")}
                </Link>
              </p>
            </div>
            <div className="my-4 flex before:border-t-[1.5px] before:flex-1 items-center before:border-gray-300 after:border-t-[1.5px] after:flex-1 after:border-gray-300 ">
              <p className="text-center font-semibold mx-4">{t("OR")}</p>
            </div>
            <OAuth />
            <button
              type="submit"
              className="w-full ltr:font-inter my-6 bg-primary-500 text-white px-7 py-3 text-sm font-semibold uppercase rounded-md shadow-md hover:bg-primary-600 transition duration-200 ease-in-out hover:shadow-lg active:bg-primary-700 active:shadow-lg"
            >
              {t("Sign up to your account")}
            </button>
          </form>
        </div>
        <div className="hidden md:block w-[50%] mb-12 md:mb-6">
          <img src={signUpSvg} className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
