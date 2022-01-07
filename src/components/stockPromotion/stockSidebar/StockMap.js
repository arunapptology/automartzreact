import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const StockMap = ({ item }) => {
  const mapContainerRef = useRef(null);
  let center;
  if (item?.Longitude === "0" || item?.Latitude === "0") {
    center = [28.7041, 77.1025];
  } else {
    center = [item?.Longitude, item?.Latitude];
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center,
      zoom: 10,
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(new mapboxgl.FullscreenControl());
    map.loadImage("/icons/location_icon.png", (error, image) => {
      if (error) throw error;

      map.addImage("icon", image);
      map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              // feature for Mapbox DC
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: center,
              },
              // properties: {
              //   title: "Mapbox DC",
              // },
            },
          ],
        },
      });
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "icon-image": "icon",
        },
      });
      // map.setPopup(
      //   new mapboxgl.Popup({ offset: 25 }).setHTML(
      //     `<h3>${item?.FullName}</h3><p>${item?.Address}</p>`
      //   )
      // );
    });
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: 300 }}
      className="shadow-sm border"
    />
  );
};

export default StockMap;
