import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import OAuth from "../components/common/OAuth";
import login from "../assets/svg/login.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { notifications } from "../components/common/Notifications";

const Login = () => {
  const navigateTo = useNavigate();

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
      notifications("Could not sign in!", true);
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-center mt-8 font-bold">Login</h1>
      <div className="flex justify-center items-center flex-wrap px-6 max-lg:mt-8 pb-12 mx-auto max-w-6xl">
        <div className="bg-headerBackground w-full shadow-lg md:w-[50%] p-8 rounded-lg">
          <form onSubmit={handleFormSubmit}>
            <h1 className="text-2xl font-inter font-semibold">Welcome back</h1>
            <h1 className="text-sm my-1 cursor-pointer font-inter font-normal">
              Start your website in seconds. Don’t have an account?
              <span
                className="text-primary-500"
                onClick={() => navigateTo("/sign-up")}
              >
                {" "}
                Sign up.
              </span>
            </h1>
            <div className="mt-6 flex flex-col md:flex-row space-y-7 md:space-y-0 md:space-x-7">
              <div>
                <label className="mb-2">Email</label>
                <input
                  id="email"
                  value={email}
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2  text-xl text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition ease-in-out duration-[400ms]"
                />
              </div>
              <div>
                <label className="mb-2">Password</label>
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
            </div>
            <div className="my-4 flex before:border-t-[1.5px] before:flex-1 items-center before:border-gray-300 after:border-t-[1.5px] after:flex-1 after:border-gray-300 ">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />

            <div className="flex justify-between items-center my-6 whitespace-nowrap text-sm sm:text-lg">
              <p className="" onClick={() => navigateTo("/sign-up")}>
                Have a account?
                <Link className="text-primary-600 ml-1 hover:text-primary-800 transition duration-200 ease-in-out">
                  Sign Up
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-primary-600 hover:text-primary-800 transition duration-200 ease-in-out"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full font-inter bg-primary-500 text-white px-7 py-3 text-sm font-semibold uppercase rounded-md shadow-md hover:bg-primary-600 transition duration-200 ease-in-out hover:shadow-lg active:bg-primary-700 active:shadow-lg"
            >
              Sign In
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
