/* eslint-disable react/prop-types */
const NavbarDropDown = ({
  handleLogout,
  toggleDropdown,
  toggleLanguageDropdown,
  firstLetter,
  profilePhoto,
  name,
  email,
  isLanguage,
  isDropDown,
  dashboard,
}) => {
  return (
    <div className="flex relative justify-center justify-items-center items-center">
      {/* Avatar */}
      <button
        className="flex mx-3 transition duration-150 ease-in-out text-sm focus:outline-none bg-transparent rounded-full md:mr-0 "
        type="button"
        onClick={() => toggleDropdown()}
      >
        {profilePhoto ? (
          <img
            className="w-10 border border-black border-opacity-50 h-10 rounded-full"
            src={profilePhoto}
            alt=""
          />
        ) : (
          <span className="w-8 h-8 border border-black rounded-[50%] font-bold text-center border-opacity-50 text-xl">
            {firstLetter}
          </span>
        )}
      </button>
      {/* Drop down */}
      <div
        className={`absolute  right-1 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${
          isDropDown
            ? "duration-300 transition-opacity ease-in-out opacity-100"
            : "hidden opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-3 truncate text-sm text-gray-900">
          <div className="font-bold text-sm">{name}</div>
          <div className="font-normal mt-1 truncate">{email}</div>
        </div>

        <ul className="py-2 text-sm text-gray-700">
          {/* Language drop down */}
          <li>
            <button
              onClick={toggleLanguageDropdown}
              type="button"
              className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
            >
              Languages
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
            <div
              id="doubleDropdown"
              className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44  ${
                isLanguage ? "" : "hidden"
              }`}
            >
              <ul className="py-2 text-sm text-gray-700 ">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                    Kurdish
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                    English
                  </a>
                </li>
              </ul>
            </div>
          </li>
          {dashboard && (
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                Dashboard
              </a>
            </li>
          )}
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
              Settings
            </a>
          </li>
        </ul>
        <div className="py-2" onClick={handleLogout}>
          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavbarDropDown;
