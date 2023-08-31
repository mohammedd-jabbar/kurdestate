/* eslint-disable react/prop-types */
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const GoogleMaps = ({ geo }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBJfZw-DJ1F1vIaZuahr_EeXHcT2dlnIps",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map geo={geo} />;
};
const Map = ({ geo }) => {
  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  const { lat, lng } = geo;

  return (
    <div className="w-full h-[89vh] max-sm:h-[60vh] bg-white">
      <GoogleMap
        options={options}
        zoom={10}
        center={{ lat, lng }}
        mapContainerClassName="w-full h-full"
      >
        <MarkerF position={{ lat, lng }} />
      </GoogleMap>
    </div>
  );
};

export default GoogleMaps;
