/* eslint-disable react/prop-types */
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

const ListingSliderSwiper = ({ listing }) => {
  return (
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
      {listing.map((url, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full overflow-hidden h-[300px]"
            style={{
              background: `url(${listing[index]}) center no-repeat`,
              backgroundSize: "cover",
            }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ListingSliderSwiper;
