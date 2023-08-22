import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCreative,
} from "swiper/modules";

const Listing = () => {
  const { categoryName, listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setIsLoading(false);
        console.log(listing);
      }
    };

    fetchListings();
  }, [listingId]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <Swiper
        slidesPerView={1}
        effect={"creative"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        navigation={true}
        pagination={{
          type: "progressbar",
        }}
        modules={[Autoplay, EffectCreative, Pagination, Navigation]}
        scrollbar={{ draggable: true }}
        className="mt-6"
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default Listing;
