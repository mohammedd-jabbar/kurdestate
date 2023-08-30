// firebase
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../../../firebase";

// swiper
import Spinner from "../../common/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper/modules";

const ItemSlider = () => {
  const [listings, setListings] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timeStamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listing = [];
      querySnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listing);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading && listings === null && listings === undefined) {
    return <Spinner />;
  }
  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          grabCursor={true}
          autoplay={{
            delay: 1700,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="!z-0"
        >
          {listings.map((data) => (
            <SwiperSlide key={data.id}>
              <div
                className="relative w-full overflow-hidden h-[89vh] max-sm:h-[60vh]"
                style={{
                  background: `url(${data?.data?.imgUrls?.[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default ItemSlider;
