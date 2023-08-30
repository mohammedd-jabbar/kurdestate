/* eslint-disable react/prop-types */

import Spinner from "../../common/Spinner";

const UserInfo = ({ landLord, screen, listing }) => {
  return (
    <div
      className={`md:w-1/3 ${
        screen === "sm"
          ? "max-sm:flex max-sm:order-6 rounded-md flex-col  hidden mx-auto p-6 bg-white"
          : "flex flex-col  max-sm:hidden mx-auto p-6 bg-white"
      }`}
    >
      <div className="">
        <h2 className="text-xl font-semibold pb-4 border-b border-border ">
          User Information
        </h2>
        <div className="flex items-center mt-4 pb-6 border-b border-border">
          <img
            className="w-16 h-16 rounded-full "
            src="https://lh3.googleusercontent.com/a/AAcHTtdgeqYPsjwMc4LUf-BUhRmEYcr-_udaYMUSQxTU35EzVrw=s96-c"
            alt="User"
          />
          <div className="ml-4">
            {landLord ? (
              <div className="flex flex-col justify-center items-start">
                <p className="text-lg font-semibold">{landLord?.name}</p>
                <p className="text-sm mt-2 font-normal truncate">Land Lord</p>
              </div>
            ) : (
              // You can provide a placeholder or loading indicator here
              <p>
                <Spinner />
              </p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl mt-6 font-semibold pb-4">
            Ask for the &ldquo;{listing?.name}&ldquo;
          </h2>
          <form action="">
            <input
              type="text"
              className="border-gray-600 w-full rounded placeholder:text-gray-700 focus:border-gray-400 focus:ring-0 mb-4"
              placeholder="Full Name"
            />
            <input
              type="email"
              className="border-gray-600 w-full rounded placeholder:text-gray-700 focus:border-gray-400 focus:ring-0 mb-4"
              placeholder="Email Address"
            />
            <textarea
              className="border-gray-600 w-full rounded placeholder:text-gray-700 focus:border-gray-400 focus:ring-0 mb-4"
              placeholder="Message"
            />
            <button className="text-white bg-primary-500 rounded shadow w-full p-2 hover:bg-primary-600 hover:shadow-lg focus:shadow-lg focus:bg-primary-600 active:bg-primary-700 active:shadow-lg  transition duration-200 ease-in-out">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
