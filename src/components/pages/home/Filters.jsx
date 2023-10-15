/* eslint-disable no-undef */
import { BiBuildings, BiMap, BiMoney } from "react-icons/bi";
import { ListingsInfoContext } from "../../../store/ListingsInfoProvider";
import { useContext, useState } from "react";
import { collection, where, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebase";
import { notifications } from "../../common/Notifications";
import { SearchResultContext } from "../../../store/SearchResultProvider";
import { useTranslation } from "react-i18next";

const Filters = () => {
  const { t, i18n } = useTranslation("home");

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
    <>
      <div
        className="max-w-[80%] dark:bg-[#18212f] mb-16 w-full flex flex-col justify-between items-start relative mx-auto p-4 rounded-md -mt-56 md:-mt-72"
        dir={i18n.language === "ku" ? "rtl" : "ltr"}
      >
        <div className="bg-headerBackground dark:bg-[#18212f] shadow-[0px,7px,29px,0px,rgba(100,100,111,0.2)] dark:shadow-[#121924] w-full grid grid-cols-1 max-lg:space-y-5 lg:flex justify-between items-center p-5 md:rounded-md">
          <div className="flex flex-col space-y-2">
            <label className="text-base font-medium text-gray-900 dark:text-slate-200 flex items-center justify-start">
              <BiBuildings className="ltr:mr-2 rtl:ml-2" /> {t("Property type")}
            </label>
            <select
              onChange={handleChange}
              id="type"
              className="mt-1.5 w-full rounded border-gray-300 dark:border-gray-700 dark:text-slate-300 dark:bg-darkBackground text-gray-700 text-sm"
            >
              <option id="type" selected>
                {t("Property type")}
              </option>
              <option id="type" value="rent">
                {t("Rent")}
              </option>
              <option id="type" value="sell">
                {t("Sell")}
              </option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-base font-medium text-gray-900 dark:text-slate-200 flex items-center justify-start">
              <BiMap className="ltr:mr-2 rtl:ml-2" /> {t("Locations")}
            </label>
            <select
              id="location"
              onChange={handleChange}
              className="mt-1.5 w-full rounded border-gray-300 dark:border-gray-700 dark:text-slate-300 dark:bg-darkBackground text-gray-700 text-sm"
            >
              <option id="location" selected>
                {t("All Locations")}
              </option>
              <option id="location" value="erbil">
                {t("Erbil")}
              </option>
              <option id="location" value="sulaimani">
                {t("Sulaimani")}
              </option>
              <option id="location" value="duhok">
                {t("Duhok")}
              </option>
              <option id="location" value="kirkuk">
                {t("Kirkuk")}
              </option>
              <option id="location" value="kalar">
                {t("Kalar")}
              </option>
              <option id="location" value="soran">
                {t("Soran")}
              </option>
              <option id="location" value="rawanduz">
                {t("Rawanduz")}
              </option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="price"
              className="text-base font-medium text-gray-900 dark:text-slate-200 flex items-center justify-start"
            >
              <BiMoney className="ltr:mr-2 rtl:ml-2" /> {t("Max Price")}
            </label>
            <input
              onChange={handleChange}
              type="text"
              value={amount}
              required
              id="price"
              // min="0"
              placeholder="$8,544"
              className="outline-0 rounded pl-5 border-gray-300 dark:border-gray-700 dark:text-slate-300 dark:bg-darkBackground text-gray-700 text-sm"
            />
          </div>
          <div className="">
            <button
              onClick={handleSubmit}
              className="transition duration-200 ease-in-out bg-primary-500 dark:bg-primary-800 hover:bg-primary-600 dark:hover:bg-primary-700 focus:bg-primary-700 dark:focus:bg-primary-600 active:bg-primary-800 dark:active:bg-primary-500 text-white px-5 py-3 mt-6 w-full lg:w-36 md:mt-0 rounded-lg"
            >
              {t("Search")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
