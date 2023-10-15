import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import OAuth from "../components/common/OAuth";
import login from "../assets/svg/login.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { notifications } from "../components/common/Notifications";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigateTo = useNavigate();
  const { t, i18n } = useTranslation("login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // this state will be used to toggle the password visibility
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  // On change function for input fields to update state with user input
  const handleInputChange = (e) => {
    /// this function will update the state with the user input, setformdata is a function that will update the state
    setFormData((prevState) => ({
      // ...prevState will copy the previous state
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigateTo("/");
        window.location.reload();
        notifications("Successfully signed in!");
      }
    } catch (error) {
      notifications("There is no user with this email", true);
    }
  };
  return (
    <div
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
      className="dark:text-white"
    >
      <h1 className="text-3xl text-center mt-8 mb-4 font-bold ">
        {t("Login")}
      </h1>
      <div className="flex justify-center items-center flex-wrap px-6 max-lg:mt-8 pb-12 mx-auto max-w-6xl">
        <div className="bg-headerBackground dark:bg-darkBackground w-full shadow-lg md:w-[50%] p-8 rounded-lg">
          <form onSubmit={handleFormSubmit}>
            <h1 className="text-2xl ltr:font-inter font-semibold">
              {t("Welcome back")}
            </h1>
            <h1 className="text-sm my-1 cursor-pointer ltr:font-inter font-normal">
              {t("Listing your property in seconds. Don’t have an account?")}
              <span
                className="text-primary-500"
                onClick={() => navigateTo("/sign-up")}
              >
                {" "}
                {t("Sign up.")}
              </span>
            </h1>
            <div className="mt-6 flex flex-col md:flex-row space-y-7 md:space-y-0 md:space-x-7 rtl:md:space-x-reverse">
              <div>
                <label className="mb-2">{t("Email")}</label>
                <input
                  id="email"
                  value={email}
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2  text-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-darkBackground border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition ease-in-out duration-[400ms]"
                />
              </div>
              <div className="relative">
                <label className="mb-2">{t("Password")}</label>
                <input
                  min="6"
                  id="password"
                  value={password}
                  type={showPassword ? "text" : "password"} // if showPassword is true, show text, else show password
                  placeholder="*****"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-darkBackground border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition ease-in-out duration-[400ms]"
                />
                {showPassword ? ( // if showPassword is true, show AiFillEyeInvisible icon
                  <AiFillEyeInvisible
                    className="absolute rtl:left-3 ltr:right-3 rtl:top-[2.6rem] ltr:top-[2.4rem] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <AiFillEye
                    className="absolute rtl:left-3 ltr:right-3 rtl:top-[2.6rem] ltr:top-[2.4rem] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            <div className="my-4 flex before:border-t-[1.5px] before:flex-1 items-center before:border-gray-300 after:border-t-[1.5px] after:flex-1 after:border-gray-300 ">
              <p className="text-center font-semibold mx-4">{t("OR")}</p>
            </div>
            <OAuth />

            <div className="flex justify-end items-center my-6 whitespace-nowrap text-sm sm:text-lg">
              <p>
                <Link
                  to="/forgot-password"
                  className="text-primary-500 hover:text-primary-600  transition duration-200 ease-in-out"
                >
                  {t("Forgot Password?")}
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full max-xs:text-[11px] ltr:font-inter bg-primary-500 text-white px-7 py-3 text-sm font-semibold uppercase rounded-md shadow-md hover:bg-primary-600 transition duration-200 ease-in-out hover:shadow-lg active:bg-primary-700 active:shadow-lg"
            >
              {t("Login to your account")}
            </button>
          </form>
        </div>
        <div className="hidden md:block w-[50%] mb-12 md:mb-6">
          <img src={login} alt="key" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
