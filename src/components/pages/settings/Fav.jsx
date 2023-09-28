import { useContext, useEffect, useState } from "react";
import { ExpandedContext } from "../../../store/SidebarProvider";
import { getFavItem, getPropertyByIdAndData } from "../../../data/queries";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../../common/Spinner";
import ListingItem from "../../common/ListingItem";

// Fetch the favorite IDs from local storage
const fetchFavoriteIds = async () => {
  const favIds = await getFavItem();
  return favIds || []; // Ensure that favIds is an array even if it's null
};

const Fav = () => {
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
      className={`max-w-6xl max-md:max-w-[95%] mx-auto max-md:text-center transition-all duration-200 ease-in-out mt-7  ${
        expanded ? "md:ml-[13.5rem]" : "md:ml-[5.3rem]"
      }`}
    >
      Fav
      <div>
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
      </div>
    </div>
  );
};

export default Fav;
