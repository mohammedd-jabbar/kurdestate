import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const GoogleMaps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBJfZw-DJ1F1vIaZuahr_EeXHcT2dlnIps",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};
const Map = () => {
  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  return (
    <GoogleMap
      options={options}
      zoom={10}
      center={{ lat: -34.397, lng: 150.644 }}
      mapContainerClassName="max-sm:h-[60vh] h-[89vh] w-full "
    >
      <MarkerF position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
  );
};

export default GoogleMaps;
