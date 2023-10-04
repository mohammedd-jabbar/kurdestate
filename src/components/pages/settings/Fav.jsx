import { useContext, useEffect, useState } from "react";
import { ExpandedContext } from "../../../store/SidebarProvider";
import { getFavItem, getPropertyByIdAndData } from "../../../data/queries";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../../common/Spinner";
import ListingItem from "../../common/ListingItem";
import Error from "../../common/Error";
import { useTranslation } from "react-i18next";

// Fetch the favorite IDs from local storage
const fetchFavoriteIds = async () => {
  const favIds = await getFavItem();
  return favIds || []; // Ensure that favIds is an array even if it's null
};

const Fav = () => {
  const { t, i18n } = useTranslation("settings");
  const { expanded } = useContext(ExpandedContext);

  const { isLoading, mutate } = useMutation({
    mutationKey: "fetchFav",
    mutationFn: getPropertyByIdAndData,
    onSuccess: (data) => {
      setFavoriteListings((oldArray) => {
        const newArray = [...oldArray, data];
        // Convert the new array into a Set to remove duplicates
        const uniqueArray = [...new Set(newArray)];

        return uniqueArray;
      });
    },
  });
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteListings, setFavoriteListings] = useState([]);

  useEffect(() => {
    // Fetch favorite IDs when the component mounts
    fetchFavoriteIds().then((favIds) => {
      setFavoriteIds(favIds);
    });
  }, []);

  useEffect(() => {
    // Fetch listings for favorite IDs when favoriteIds changes
    if (favoriteIds !== undefined) {
      const fetchListings = async () => {
        await Promise.all(favoriteIds.map((id) => mutate(id)));
      };

      fetchListings();
    } else {
      setFavoriteListings([]); // Reset the favorite listings if there are no favorites
    }
  }, [favoriteIds]); // This effect runs when favoriteIds changes

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
      className={`max-md:max-w-[95%] max-md:text-center transition-all duration-200 ease-in-out mt-7 ${
        expanded
          ? `${i18n.language === "ku" ? "md:mr-[13.5rem]" : "md:ml-[13.5rem]"}`
          : `${i18n.language === "ku" ? "md:mr-[5.3rem]" : "md:ml-[5.3rem]"}`
      }`}
    >
      <h2 className="text-2xl text-center font-semibold my-6">
        {t("My Favorites")}
      </h2>
      {favoriteIds.length > 0 ? (
        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {favoriteListings.map((property, index) => (
            <ListingItem
              onRemove={true}
              listing={property.data}
              id={property.id}
              key={index}
            />
          ))}
        </ul>
      ) : (
        <Error text={t("There is no favorite listings")} />
      )}
    </div>
  );
};

export default Fav;
