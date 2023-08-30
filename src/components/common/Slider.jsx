// firebase
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";

// swiper
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import { EffectFade, Autoplay } from "swiper/modules";

const Slider = () => {
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
      <Swiper
        slidesPerView={1}
        loop={true}
        effect={"fade"}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        noSwiping={true}
        modules={[Autoplay, EffectFade]}
      >
        {listings.map((data) => (
          <SwiperSlide key={data.id}>
            <div
              className="relative w-full overflow-hidden h-[90vh]"
              style={{
                background: `url(${data?.data?.imgUrls?.[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
            {/* <HomeSliderSwiper key={data.id} data={data} /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
};

export default Slider;
