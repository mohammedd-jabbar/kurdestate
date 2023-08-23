import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Spinner from "../components/Spinner";
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
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [listings, setListings] = useState();
  const navigateTo = useNavigate();
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
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigateTo(`category/${data.type}/${id}`)}
            >
              <div
                className="relative w-full overflow-hidden h-[300px]"
                style={{
                  background: `url(${data.imgUrls?.[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p className="text=[#f1faee] absolute left-1 top-3 font-medium max-w-[19%] bg-[#457b9d] shadow-lg opacity-90 p-2 text-white rounded-br-3xl">
                {data.name}
              </p>
              <p className="text=[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[19%] bg-[#e63946] shadow-lg opacity-90 p-2 text-white rounded-tr-3xl">
                ${data.descountedPrice ?? data.regularPrice}
                {data.type === "rent" && " /month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default Slider;
