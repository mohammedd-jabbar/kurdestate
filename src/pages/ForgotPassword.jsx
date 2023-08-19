import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { notifications } from "../components/Notifications";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

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
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>

      <div className="flex justify-center items-center flex-wrap px-6 py-12 mx-auto max-w-6xl">
        <div className="lg:w-[50%] md:w-[67%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt="key"
            className="w-full rounded-xl"
          />
        </div>

        <div className="w-full lg:w-[40%] md:w-[64%] lg:ml-20">
          <form onSubmit={handleFormSubmit}>
            <input
              id="email"
              value={email}
              type="email"
              placeholder="Email Address"
              onChange={handleEmailChange}
              className="w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition ease-in-out duration-[400ms]"
            />

            <div className="flex justify-between items-center mb-6 whitespace-nowrap text-sm sm:text-lg">
              <p className="">
                Have a account?
                <Link
                  to="/sign-in"
                  className="text-red-600 ml-1 hover:text-red-800 transition duration-200 ease-in-out"
                >
                  Sign in
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Sign In Instead
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded-md shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800 active:shadow-lg"
            >
              Send Reset Password
            </button>
            <div className="my-4 flex before:border-t before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300 ">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
