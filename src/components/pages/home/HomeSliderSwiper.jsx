/* eslint-disable react/prop-types */

const HomeSliderSwiper = ({ data }) => {
  return (
    <>
      <p className="text=[#f1faee] absolute left-1 top-3 font-medium max-w-[19%] bg-[#457b9d] shadow-lg opacity-90 p-2 text-white rounded-br-3xl">
        {data?.data?.name}
      </p>
      <p className="text=[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[19%] bg-[#e63946] shadow-lg opacity-90 p-2 text-white rounded-tr-3xl">
        ${data?.data?.price}
        {data?.data?.type === "rent" && " /month"}
      </p>
    </>
  );
};

export default HomeSliderSwiper;
