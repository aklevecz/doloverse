import { useState } from "react";
import { Bounds, Position } from "../lib/types";
// import { Loader } from "@googlemaps/js-api-loader";

// const loader = new Loader({
//   apiKey: process.env.NEXT_PUBLIC_GMAP_KEY as string,
//   version: "weekly",
// });

function inBounds(point: Position, bounds: Bounds) {
  var eastBound = point.lng < bounds.NE.lng;
  var westBound = point.lng > bounds.SW.lng;
  var inLong;

  if (bounds.NE.lng < bounds.SW.lng) {
    inLong = eastBound || westBound;
  } else {
    inLong = eastBound && westBound;
  }

  var inLat = point.lat > bounds.SW.lat && point.lat < bounds.NE.lat;
  return inLat && inLong;
}

const doloresCoords = {
  SW: { lat: 37.758155301579535, lng: -122.4280458410546 },
  NE: { lat: 37.76136810224769, lng: -122.42624580329927 },
  middle: { lat: 37.76008654068119, lng: -122.42724253784165 },
};

export default function useLocation() {
  const [checking, setChecking] = useState(false);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [atDolores, setAtDolores] = useState(false);

  const getUserPosition = () => {
    setChecking(true);
    return new Promise((resolve, _) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const userPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setPosition(userPosition);
            setChecking(false);
            const atDolores = inBounds(userPosition, doloresCoords);
            // const atDolores = inBounds(doloresCoords.middle, doloresCoords);
            setAtDolores(atDolores);
            return resolve(atDolores);
          }
        );
      }
    });
  };

  return { position, getUserPosition, checking, atDolores };
}
