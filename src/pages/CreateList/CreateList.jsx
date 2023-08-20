import { useState } from "react";

const CreateList = () => {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    beds: 1,
    baths: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
  });

  const {
    type,
    name,
    beds,
    baths,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
  } = formData;
  const onChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl font-bold text-center mt-6 ">Create Listing</h1>
      <form>
        {/* Sell and Rent */}
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Rent
          </button>
        </div>
        {/* Name */}
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Your Property Name"
          maxLength="32"
          minLength="10"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
        />
        {/* Beds and Baths */}
        <div className="flex space-x-6">
          <div className="">
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              name="beds"
              id="beds"
              value={beds}
              onChange={onchange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
            />
          </div>
          <div className="">
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              name="baths"
              id="baths"
              value={baths}
              onChange={onchange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
            />
          </div>
        </div>
        {/* Parking */}
        <p className="text-lg mt-6 font-semibold">Parking Spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="paring"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        {/* Furnished */}
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
              !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
              furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        {/* Address */}
        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="Your Property Address"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
        />
        {/* Description */}
        <p className="text-lg font-semibold">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
        />
        {/* Offer */}
        <p className="text-lg mt-6 font-semibold">Offer</p>
        <div className="flex mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        {/* Regular Price */}
        <div className="flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold">Regular Price</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onchange}
                min="50"
                max="400000000"
                required
                className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$ / Months</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* discounted Price */}
        {offer && (
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">Discounted Price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onchange}
                  min="50"
                  max="400000000"
                  required={offer}
                  className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                />
                {type === "rent" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap">
                      $ / Months
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Images */}
        <div className="mb-6">
          <p className="text-lg mt-6 font-semibold">Images</p>
          <p className="text-gray-600">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={onchange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:bg-blue-700 active:bg-blue-700 active:shadow-lg transition duration-200 ease-in-out"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
};

export default CreateList;
