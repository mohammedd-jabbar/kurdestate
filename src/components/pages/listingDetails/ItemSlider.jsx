/* eslint-disable react/prop-types */
// firebase
import { useEffect, useState } from "react";

// swiper
import Spinner from "../../common/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";

const ItemSlider = ({ listingData }) => {
  const { i18n } = useTranslation();
  const [listing, setListing] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      if (listingData) {
        setListing(listingData.imgUrls);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingData]);

  if (loading && listing === null && listing === undefined) {
    return <Spinner />;
  }

  return (
    listing && (
      <div dir={i18n.language === "ku" ? "rtl" : "ltr"}>
        <Swiper
          slidesPerView={1}
          grabCursor={true}
          autoplay={{
            delay: 1700,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="!z-0"
        >
          {listing.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                className="w-full overflow-hidden object-cover h-[89vh] max-sm:h-[60vh]"
                src={url}
                loading="lazy"
                // effect="blur"
                style={{
                  background: `center no-repeat`,
                  backgroundSize: "cover",
                  display: "inline-block",
                }}
                width={"100%"}
                height={"100%"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default ItemSlider;
