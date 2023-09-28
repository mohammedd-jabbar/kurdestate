/* eslint-disable react/prop-types */
import "./Error.css";

const Error = ({ text }) => {
  return (
    <div id="main">
      <div className="fof">
        <h1>{text}</h1>
      </div>
    </div>
  );
};

export default Error;
