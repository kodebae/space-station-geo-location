import React, { useState, useEffect } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import './Map.css'
import axios from 'axios'
import Loading from '../Loading/Loading'

const Map = () => {
  const [map, setMap] = useState(null);
  const [mapLongitude, setMapLongitude] = useState(-74.0059);
  const [mapLatitude, setMapLatitude] = useState(40.7128);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        if (!document.getElementById('map')) {
          return;
        }

        // Initialize a new map instance with the default coordinates
        const newMap = tt.map({
          key: '994x7olG2qsCc9zhLBjzlVHSkvSM040A',
          container: 'map',
          center: [mapLongitude, mapLatitude],
          zoom: 3,
        });

        // Disable draggable feature on map
        newMap.dragPan.disable();

        // Set the new map instance
        setMap(newMap);
        setLoading(false);
      } catch (error) {
        console.log('Error initializing map:', error);
        setLoading(false);
      }
    };

    initializeMap();
  }, []);

  const getLocation = async () => {
    try {
      const res = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');
      const { longitude, latitude } = res.data;
      setMapLongitude(parseFloat(longitude));
      setMapLatitude(parseFloat(latitude));
    } catch (error) {
      console.log('Error getting ISS position:', error);
    }
  };

  useEffect(() => {
    let marker;
    if (map) {
      const markerElement = document.createElement('div');
      markerElement.className = 'marker';
  
      marker = new tt.Marker({ element: markerElement })
        .setLngLat([mapLongitude, mapLatitude])
        .addTo(map)
        .on('error', (error) => {
          if (error && error.status === 403) {
            console.error("There was an error with the authentication credentials");
          }
        });
  
      // Optional: remove previous marker
      return () => {
        if (marker) {
          marker.remove();
        }
      };
    }
  }, [map, mapLongitude, mapLatitude]);
  

  // Update the location of the ISS every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);
      getLocation();
      setLoading(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading ? <Loading /> : <div id="map" className="map-container"></div>}
    </>
  );
};

export default Map




/**
 *? The dependency array basically tells the "useEffect" React hook to "only trigger when the dependency array changes".  
 * **/

