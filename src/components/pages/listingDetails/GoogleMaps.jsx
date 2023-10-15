/* eslint-disable react/prop-types */
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import useDarkSide from "../../common/darkmode/useDarkSide";

const GoogleMaps = ({ geo }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBJfZw-DJ1F1vIaZuahr_EeXHcT2dlnIps",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map geo={geo} />;
};

const Map = ({ geo }) => {
  const [colorTheme] = useDarkSide();

  const optionsDark = {
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  const { lat, lng } = geo;

  return (
    <div className="w-full h-[89vh] max-sm:h-[60vh] bg-white">
      <GoogleMap
        options={colorTheme === "dark" ? optionsDark : options}
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
