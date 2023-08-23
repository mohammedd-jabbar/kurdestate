/* eslint-disable react/prop-types */

const HomeSliderSwiper = ({ data }) => {
  return (
    <>
      <div
        className="relative w-full overflow-hidden h-[300px]"
        style={{
          background: `url(${data?.data?.imgUrls?.[0]}) center no-repeat`,
          backgroundSize: "cover",
        }}
      ></div>
      <p className="text=[#f1faee] absolute left-1 top-3 font-medium max-w-[19%] bg-[#457b9d] shadow-lg opacity-90 p-2 text-white rounded-br-3xl">
        {data?.data?.name}
      </p>
      <p className="text=[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[19%] bg-[#e63946] shadow-lg opacity-90 p-2 text-white rounded-tr-3xl">
        ${data?.data?.descountedPrice ?? data?.data?.regularPrice}
        {data?.data?.type === "rent" && " /month"}
      </p>
    </>
  );
};

export default HomeSliderSwiper;
