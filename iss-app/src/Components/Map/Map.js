import React, { useState, useEffect } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import './Map.css';
import axios from 'axios';

const Map = () => {
  const [map, setMap] = useState(null);
  const [mapLongitude, setMapLongitude] = useState(-74.0059);
  const [mapLatitude, setMapLatitude] = useState(40.7128);

  const getLocation = async () => {
    try {
      const res = await axios.get('http://api.open-notify.org/iss-now.json');
  
      let longitude = res.data.iss_position.longitude;
      let latitude = res.data.iss_position.latitude;
  
      setMapLongitude(parseFloat(longitude));
      setMapLatitude(parseFloat(latitude));

      // Initialize a new map instance with the updated coordinates
      const newMap = tt.map({
        key: process.env.REACT_APP_API_KEY,
        container: 'map',
        center: [longitude, latitude],
        zoom: 8,
      });

      // Remove the old map instance
      if (map) {
        map.remove();
      }

      // Set the new map instance
      setMap(newMap);
    } catch (error) {
      console.log('Error getting ISS position:', error);
    }
  };

  useEffect(() => {
    console.log('useEffect called!');
    const intervalId = setInterval(() => {
      getLocation();
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, []);
  

  useEffect(() => {
    if (map) {
      const markerElement = document.createElement('div');
      markerElement.className = 'marker';

      const marker = new tt.Marker({
        element: markerElement,
      })
        .setLngLat([mapLongitude, mapLatitude])
        .addTo(map);

      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());
    }
  }, [map, mapLongitude, mapLatitude]);

  return <div id="map" className="map-container" />;
};

export default Map;




  

/**
 *? The dependency array basically tells the "useEffect" React hook to "only trigger when the dependency array changes".  
 * **/


