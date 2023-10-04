/* eslint-disable react/prop-types */

const DropdownButton = ({
  toggleContentDropDown,
  isContentDropDown,
  isNavbarScroll,
}) => {
  return (
    <button className="relative lg:hidden" onClick={toggleContentDropDown}>
      <div className="relative flex overflow-hidden items-center justify-center rounded-full h-[50px] transform transition-all ring-0 ring-opacity-30 duration-200">
        <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
          {!isContentDropDown && (
            <>
              <div
                className={`bg-gray-950 ${
                  location.pathname === "/" &&
                  !isNavbarScroll &&
                  "!bg-primary-500 dark:bg-white"
                } h-[2px] w-7 transform dark:bg-white transition-all duration-300 origin-left focus:translate-x-10`}
              ></div>
              <div
                className={`bg-gray-950 ${
                  location.pathname === "/" &&
                  !isNavbarScroll &&
                  "!bg-primary-500 dark:bg-white"
                } h-[2px] w-7 rounded  dark:bg-white transform transition-all duration-300 focus:translate-x-10 delay-75`}
              ></div>
              <div
                className={`bg-gray-950 ${
                  location.pathname === "/" &&
                  !isNavbarScroll &&
                  "!bg-primary-500 dark:bg-white"
                } h-[2px] w-7 transform dark:bg-white transition-all duration-300 origin-left focus:translate-x-10 delay-150`}
              ></div>
            </>
          )}

          {isContentDropDown && (
            <div
              className={`absolute items-center justify-between transform transition-all duration-500 top-2.5  translate-x-0 flex w-12`}
            >
              <div
                className={`absolute ${
                  location.pathname === "/" &&
                  !isNavbarScroll &&
                  "bg-primary-500 dark:bg-white"
                } bg-gray-950 h-[2px] dark:bg-white w-5 transform transition-all duration-500  delay-300 rotate-45`}
              ></div>
              <div
                className={`absolute ${
                  location.pathname === "/" &&
                  !isNavbarScroll &&
                  "bg-primary-500 dark:bg-white"
                } bg-gray-950 h-[2px] dark:bg-white w-5 transform transition-all duration-500  delay-300 -rotate-45`}
              ></div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default DropdownButton;
