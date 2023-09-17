/* eslint-disable no-undef */
import { BiBuildings, BiMap, BiMoney } from "react-icons/bi";
import { ListingsInfoContext } from "../../../store/ListingsInfoProvider";
import { useContext, useEffect, useState } from "react";

const Filters = () => {
  const { data, isLoading, isError } = useContext(ListingsInfoContext);
  const [locations, setLocations] = useState(null);

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

  return (
    <div className="max-w-[80%] w-full flex justify-between items-center p-3 relative mx-auto rounded-md -mt-44">
      <div className="bg-gray-200 w-full grid grid-cols-1 max-lg:space-y-5 lg:flex justify-between items-center p-5  shadow-2xl md:rounded-md">
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
          <select className="mt-1.5 w-full rounded border-gray-300 text-gray-700 sm:text-sm">
            <option selected>All Property</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="HeadlineAct"
            className="text-base font-medium text-gray-900 flex items-center justify-start"
          >
            <BiMap className="mr-2" /> Locations
          </label>

          <select className="mt-1.5 w-full rounded border-gray-300 text-gray-700 sm:text-sm">
            <option selected>All Locations</option>
            {locations !== undefined &&
              locations?.map((data, index) => {
                return (
                  <option key={index} value={data}>
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
            type="text"
            placeholder="$8,544"
            className="outline-0 rounded border-gray-300 text-gray-700 text-sm"
          />
        </div>
        <div className="">
          <button className="transition duration-200 ease-in-out bg-primary-500 hover:bg-primary-600 focus:bg-primary-700 active:bg-primary-800 text-white px-5 py-3 mt-6 w-full lg:w-36 md:mt-0 rounded-lg">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
