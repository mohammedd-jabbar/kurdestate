import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/common/OAuth";
import { notifications } from "../components/common/Notifications";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import login from "../assets/svg/login.svg";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { t, i18n } = useTranslation("login");
  const navigateTo = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      await sendPasswordResetEmail(auth, email);
      notifications("Email was sent", false);
    } catch (error) {
      notifications("Could not send reset password", true);
    }
  };

  return (
    <section
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
      className="dark:text-white"
    >
      <h1 className="text-3xl text-center mt-8 font-bold">
        {t("Forgot Password")}
      </h1>

      <div className="flex justify-center items-center flex-wrap px-6 max-lg:mt-8 pb-12 mx-auto max-w-6xl">
        <div className="bg-headerBackground dark:bg-darkBackground w-full shadow-lg mb-32 md:w-[50%] p-8 rounded-lg">
          <form onSubmit={handleFormSubmit}>
            <div>
              <label className="mb-2">{t("Email")}</label>
              <input
                id="email"
                value={email}
                type="email"
                placeholder="example@gmail.com"
                onChange={handleEmailChange}
                className="w-full px-4 py-2 mb-6 text-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-darkBackground border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition ease-in-out duration-[400ms]"
              />
            </div>
            <div className="flex justify-between items-center my-6 whitespace-nowrap text-sm sm:text-lg">
              <p className="" onClick={() => navigateTo("/sign-up")}>
                {t("Don’t have an account?")}
                <Link className="text-primary-600 ml-1 hover:text-primary-800 transition duration-200 ease-in-out">
                  {t("Sign up.")}
                </Link>
              </p>
              <p>
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-800 transition duration-200 ease-in-out"
                >
                  {t("Login Instead")}
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full ltr:font-inter bg-primary-500 text-white  px-7 py-3 text-sm font-semibold uppercase rounded-md shadow-md hover:bg-primary-600 transition duration-200 ease-in-out hover:shadow-lg active:bg-primary-700 active:shadow-lg"
            >
              {t("Send Reset Email")}
            </button>
            <div className="my-4 flex before:border-t before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300 ">
              <p className="text-center font-semibold mx-4">{t("OR")}</p>
            </div>
            <OAuth />
          </form>
        </div>
        <div className="hidden md:block w-[50%] mb-12 md:mb-6">
          <img src={login} alt="key" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
