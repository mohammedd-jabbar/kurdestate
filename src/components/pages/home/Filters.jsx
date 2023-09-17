/* eslint-disable no-undef */
import { BiBriefcase, BiBuildings, BiMap, BiMoney } from "react-icons/bi";
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
    <div className="max-w-[80%] w-full flex justify-between items-center p-3 relative mx-auto  rounded-lg -mt-16 sm:-mt-36 ">
      <div className=" bg-white w-full grid grid-cols-1 max-lg:space-y-5 lg:flex justify-between items-center p-5 drop-shadow-2xl md:rounded-md">
        <div className="flex flex-col space-y-2">
          <label htmlFor="property">property type</label>
          <input
            type="text"
            placeholder="property"
            className="outline-0 text-xs"
          />
        </div>
        <div className=" flex flex-col space-y-2 ">
          <label
            htmlFor="HeadlineAct"
            className="block text-sm font-medium text-gray-900"
          >
            Locations
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
          <label htmlFor="price">Max Price</label>
          <input
            type="text"
            placeholder="$8,544"
            className="outline-0 text-xs"
          />
        </div>
        <div>
          <button className="bg-primary-500 text-white px-5 py-2 mt-5 md:mt-0 md:rounded-full">
            Search
          </button>
        </div>
      </div>
      {/* <div className="flex justify-around items-center space-x-16">
        <div
          // style={{ direction: "rtl" }}
          className="bg-background border-border"
        >
          <label
            htmlFor="HeadlineAct"
            className="block text-sm font-medium text-gray-900"
          >
            Type
          </label>

          <select className="mt-1.5 w-full rounded border-gray-300 text-gray-700 sm:text-sm">
            <option selected>Please select</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div
          // style={{ direction: "rtl" }}
          className="bg-background border-border"
        >
          <label
            htmlFor="HeadlineAct"
            className="block text-sm font-medium text-gray-900"
          >
            Type
          </label>

          <select className="mt-1.5 w-full rounded border-gray-300 text-gray-700 sm:text-sm">
            <option selected>Please select</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div
          // style={{ direction: "rtl" }}
          className="bg-background border-border"
        >
          <label
            htmlFor="HeadlineAct"
            className="block text-sm font-medium text-gray-900"
          >
            Type
          </label>

          <select className="mt-1.5 w-full rounded border-gray-300 text-gray-700 sm:text-sm">
            <option selected>Please select</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div
          // style={{ direction: "rtl" }}
          className="bg-background border-border"
        >
          <a className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
            Search
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Filters;
