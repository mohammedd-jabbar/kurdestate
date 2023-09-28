/* eslint-disable react/prop-types */
import "./Error.css";
import { BiArrowBack } from "react-icons/bi";

const Error = ({ text = false }) => {
  return (
    <div id="main" className="flex flex-col justify-center items-center">
      <div className="fof flex flex-col">
        <h1>{text ? text : "<404> this page not found"}</h1>
      </div>
      {!text && (
        <a
          className="flex  justify-between items-center transition-all duration-200 ease-in-out mt-6 bg-primary-500 rounded-lg p-2 text-white hover:bg-primary-600 active:bg-primary-700"
          href="/"
        >
          <BiArrowBack className="w-4 h-4 mr-2" />
          Go home
        </a>
      )}
    </div>
  );
};

export default Error;
