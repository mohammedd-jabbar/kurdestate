/* eslint-disable no-undef */
import { BiBuildings, BiMap, BiMoney } from "react-icons/bi";
import { ListingsInfoContext } from "../../../store/ListingsInfoProvider";
import { useContext, useState } from "react";
import { collection, where, getDocs, query } from "firebase/firestore";

import { db } from "../../../../firebase";
import { notifications } from "../../common/Notifications";
import { SearchResultContext } from "../../../store/SearchResultProvider";

const Filters = () => {
  const { isLoading, isError } = useContext(ListingsInfoContext);
  const { setSearch } = useContext(SearchResultContext);

  const [amount, setAmount] = useState("");

  const [formSearch, setFormSearch] = useState({
    type: "rent",
    location: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormSearch((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

    if (e.target.id === "price") {
      let input = event.target.value;
      // Remove any non-numeric characters and leading zeros
      input = input.replace(/[^0-9]/g, "").replace(/^0+/, "");

      // Prefix the input with a "$" symbol
      setAmount("$" + input);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching locations</div>;
  }

  // const getTheCityNames = async (lat, lng) => {
  //   const res = await fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=AIzaSyBJfZw-DJ1F1vIaZuahr_EeXHcT2dlnIps`
  //   );
  //   const data = await res.json();
  //   if (data.status !== "ZERO_RESULTS" && !undefined) {
  //     const arrayLocationName = data.results?.[0]?.formatted_address.split(",");
  //     const name = arrayLocationName[1].trim();
  //     return name;
  //   }
  // };

  const handleSubmit = async () => {
    if (
      formSearch.type !== "" &&
      formSearch.type &&
      formSearch.location !== "" &&
      formSearch.location &&
      formSearch.price !== "" &&
      formSearch.price
    ) {
      getSearch();
    } else {
      return notifications("Please select all search right", true);
    }
  };

  console.log(formSearch);
  const getSearch = async () => {
    // Remove the "$" symbol before submitting
    const numericValue = amount.replace(/\D/g, "").toString();

    const listingRef = collection(db, "listings");

    const q = query(
      listingRef,
      where("type", "==", formSearch.type),
      where("price", "<=", numericValue),
      where("status", "==", "accepted"),
      where("city", "==", formSearch.location.toLocaleLowerCase())
    );

    const querySnap = await getDocs(q);

    const res = [];
    querySnap.forEach((doc) => {
      res.push({ id: doc.id, data: doc.data() });
    });
    if (res.length > 0) {
      setSearch(res);
    }
  };

  return (
    <div className="max-w-[85%] mb-24 w-full flex flex-col justify-between items-start relative mx-auto p-4 rounded-md -mt-56 md:-mt-40">
      <div className="bg-background w-full grid grid-cols-1 max-lg:space-y-5 lg:flex justify-between items-center p-5 shadow-lg md:rounded-md">
        <div
          className="flex flex-col space-y-2"
          // style={{ direction: "rtl" }}
        >
          <label
            htmlFor="property"
            className="text-base font-medium text-gray-900 flex items-center justify-start"
          >
            <BiBuildings className="mr-2" /> Property type
          </label>
          <select
            onChange={handleChange}
            id="type"
            className="mt-1.5 w-full rounded border-gray-300 text-gray-700 text-sm"
          >
            <option id="type" selected>
              Property Type
            </option>
            <option id="type" value="rent">
              Rent
            </option>
            <option id="type" value="sell">
              Sell
            </option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="HeadlineAct"
            className="text-base font-medium text-gray-900 flex items-center justify-start"
          >
            <BiMap className="mr-2" /> Locations
          </label>
          <select
            id="location"
            onChange={handleChange}
            className="mt-1.5 w-full rounded border-gray-300 text-gray-700 text-sm"
          >
            <option id="location" selected>
              All Locations
            </option>
            <option id="location" value="erbil">
              Erbil
            </option>
            <option id="location" value="sulaimani">
              Sulaimani
            </option>
            <option id="location" value="duhok">
              Duhok
            </option>
            <option id="location" value="kirkuk">
              Kirkuk
            </option>
            <option id="location" value="kalar">
              Kalar
            </option>
            <option id="location" value="rawanduz">
              Rawanduz
            </option>
            <option id="location" value="soran">
              Soran
            </option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="price"
            className="text-base font-medium text-gray-900 flex items-center justify-start"
          >
            <BiMoney className="mr-2" /> Max Price
          </label>
          <input
            onChange={handleChange}
            type="text"
            value={amount}
            required
            id="price"
            // min="0"
            placeholder="$8,544"
            className="outline-0 rounded pl-5 border-gray-300 text-gray-700 text-sm"
          />
        </div>
        <div className="">
          <button
            onClick={handleSubmit}
            className="transition duration-200 ease-in-out bg-primary-500 hover:bg-primary-600 focus:bg-primary-700 active:bg-primary-800 text-white px-5 py-3 mt-6 w-full lg:w-36 md:mt-0 rounded-lg"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
