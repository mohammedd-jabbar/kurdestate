import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  return (
    <button
      type="submit"
      className="w-full flex justify-center items-center bg-red-700 text-white px-7 py-3 text-sm font-medium uppercase rounded-md shadow-md hover:bg-red-800 transition duration-200 ease-in-out hover:shadow-lg active:shadow-lg active:bg-red-900"
    >
      <FcGoogle className="mr-2 text-2xl bg-white rounded-full" />
      Continue with Google
    </button>
  );
};

export default OAuth;
