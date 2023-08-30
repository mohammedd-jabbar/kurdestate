import spinner from "../../assets/svg/spinner.svg";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center bg-black bg-opacity-10 fixed left-0 right-0 bottom-0 top-0 z-50">
      <div>
        <img src={spinner} alt="Loading..." className="text-white h-20" />
      </div>
    </div>
  );
};

export default Spinner;
