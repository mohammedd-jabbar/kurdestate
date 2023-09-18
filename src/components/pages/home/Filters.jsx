/* eslint-disable no-undef */
import { BiBuildings, BiMap, BiMoney } from "react-icons/bi";
import { ListingsInfoContext } from "../../../store/ListingsInfoProvider";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  where,
  orderbyChild,
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "../../../../firebase";

const Filters = () => {
  const { data, isLoading, isError } = useContext(ListingsInfoContext);
  const [locations, setLocations] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [formSearch, setFormSearch] = useState({
    type: "",
    location: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormSearch((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const namesPromises = data?.map(async (item) => {
        const names = await getTheCityNames(
          item.geoLocation.lat,
          item.geoLocation.lng
        );
        return names;
      });

      const resolvedNames = await Promise.all(namesPromises);

      const filteredNames = resolvedNames.filter(
        (names) => names !== undefined
      );

      const uniqueNames = [...new Set(filteredNames)];

      setLocations(uniqueNames);
    };

    fetchData();
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching locations</div>;
  }

  const getTheCityNames = async (lat, lng) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=AIzaSyBJfZw-DJ1F1vIaZuahr_EeXHcT2dlnIps`
    );
    const data = await res.json();
    if (data.status !== "ZERO_RESULTS" && !undefined) {
      const arrayLocationName = data.results?.[0]?.formatted_address.split(",");
      const name = arrayLocationName[1].trim();
      return name;
    }
  };

  const handleSubmit = async () => {
    if (
      formSearch.type !== "" &&
      formSearch.type &&
      formSearch.location !== "" &&
      formSearch.location &&
      formSearch.price !== "" &&
      formSearch.price
    )
      console.log(formSearch.location);
  };

  const getSearch = async () => {
    const ref = collection(db, "listings");

    const q = query(
      ref,
      where("type", "===", formSearch.type),
      orderbyChild("address")
      startAt(formSearch.location)
      endAt(formSearch.location + "\uf8ff"),
      where("regularPrice", "=>", formSearch.price),
      where("status", "==", "accepted"),
      orderBy("timeStamp", "desc")
    );
    const doc_refs = await getDocs(q);
    const res = [];
    doc_refs.forEach((doc) => {
      res.push({ id: doc.id, ...doc.data() });
    });
  };

  return (
    <div className="max-w-[80%] mb-6 w-full flex flex-col justify-between items-start p-4 relative mx-auto rounded-md -mt-24">
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
            className="mt-1.5 w-full rounded border-gray-300 text-gray-700 sm:text-sm"
          >
            <option id="type" value="nothing" selected>
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
            className="mt-1.5 w-full rounded border-gray-300 text-gray-700 sm:text-sm"
          >
            <option id="location" selected>
              All Locations
            </option>
            {locations !== undefined &&
              locations?.map((data, index) => {
                return (
                  <option id="location" key={index} value={data}>
                    {data}
                  </option>
                );
              })}
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
            type="number"
            required
            id="price"
            min="0"
            placeholder="$8,544"
            className="outline-0 rounded border-gray-300 text-gray-700 text-sm"
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
