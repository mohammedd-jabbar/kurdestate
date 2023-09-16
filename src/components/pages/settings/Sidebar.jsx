/* eslint-disable react/prop-types */
import { LuChevronLast, LuChevronFirst } from "react-icons/lu";
import { useContext, createContext } from "react";
import { ExpandedContext } from "../../../store/SidebarProvider";
import { UserInfoContext } from "../../../store/UserInfoProvider";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const { data } = useContext(UserInfoContext);
  const { expanded, setExpanded } = useContext(ExpandedContext);

  return (
    <>
      <div
        className={`transition duration-200 ease-in-out ${
          expanded && "hidden"
        } md:hidden p-4 pb-2 flex justify-between items-center`}
      >
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className={`p-1.5 rounded-lg bg-gray-300 hover:bg-gray-400 ${
            !expanded && "absolute left-3 top-4"
          }`}
        >
          <LuChevronLast />
        </button>
      </div>
      <aside
        className={`h-[94vh] transition-all duration-200 ease-in-out ${
          expanded ? "md:mr-12 w-52" : "max-md:hidden"
        }`}
      >
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div
              className={`h-5 text-xl flex items-center justify-center font-bold overflow-hidden transition-all ${
                expanded ? "w-32 max-sm:w-24" : "w-0"
              }`}
            ></div>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className={`p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ${
                !expanded && "max-md:absolute left-8"
              }`}
            >
              {expanded ? <LuChevronFirst /> : <LuChevronLast />}
            </button>
          </div>
          <SidebarContext.Provider value={{ expanded, setExpanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div
            className={`border-t mb-4 flex p-3 ${
              !expanded && "max-sm:border-none"
            }`}
          >
            <img
              src={data.photoURL}
              alt=""
              className="w-10 h-10 rounded-md max-sm:hidden"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
                expanded ? "w-52 ml-3 max-sm:w-36 max-sm:ml-1" : "w-0"
              }
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{data.displayName}</h4>
                <span className="text-xs text-gray-600">{data.email}</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded, setExpanded } = useContext(SidebarContext);

  return (
    <li
      onClick={() => setExpanded(false)}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      <button
        type="button"
        className={`max-md:mr-1 ${text === "SignOut" ? "text-red-500" : ""}`}
      >
        {icon}
      </button>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3 max-sm:w-36 max-sm:ml-1" : "w-0"
        } ${text === "SignOut" ? "text-red-500" : ""}`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          ${text === "SignOut" ? "text-red-500" : ""}`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
