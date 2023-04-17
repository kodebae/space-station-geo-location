import React, { useState, useEffect } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import Loading from '../Loading/Loading';

const Map = () => {
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState({
    lat: 0,
    lng: 0
  });

  useEffect(() => {
    const fetchISSPosition = async () => {
      try {
        const res = await fetch('https://www.n2yo.com/rest/v1/satellite/positions/25544/0/0/0/1?apiKey=BGKQ9M-TS4FPC-UYZ59T-50P4');
        const data = await res.json();
        const { latitude, longitude } = data.iss_position;
        setMapCenter({
          lat: parseFloat(latitude),
          lng: parseFloat(longitude)
        });
      } catch (error) {
        console.log('Error getting ISS position:', error);
      }
    };

    fetchISSPosition();
    const intervalId = setInterval(fetchISSPosition, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const newMap = tt.map({
          key: '994x7olG2qsCc9zhLBjzlVHSkvSM040A',
          container: 'map',
          center: [mapCenter.lng, mapCenter.lat],
          zoom: 3,
        });

        setMap(newMap);
        setLoading(false);
      } catch (error) {
        console.log('Error initializing map:', error);
        setLoading(false);
      }
    };

    initializeMap();
  }, [mapCenter]);

  useEffect(() => {
    let marker;
    if (map) {
      const markerElement = document.createElement('div');
      markerElement.className = 'marker';
  
      marker = new tt.Marker({ element: markerElement })
        .setLngLat([mapCenter.lng, mapCenter.lat])
        .addTo(map)
        .on('error', (error) => {
          if (error && error.status === 403) {
            console.error("There was an error with the authentication credentials");
          }
        });
  
      return () => {
        if (marker) {
          marker.remove();
        }
      };
    }
  }, [map, mapCenter]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div id="map" className="map-container"></div>
      )}
    </>
  );
};

export default Map;











/**
 *? The dependency array basically tells the "useEffect" React hook to "only trigger when the dependency array changes".  
 * **/

