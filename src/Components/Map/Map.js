import React, { useState, useEffect } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'


const Map = () => {
  const [map, setMap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [issPosition, setIssPosition] = useState(null)

  useEffect(() => {
    const fetchIssPosition = async () => {
      try {
        const response = await fetch(
          'https://api.wheretheiss.at/v1/satellites/25544'
        );
        const data = await response.json()
        setIssPosition({
          lat: data.latitude,
          lng: data.longitude,
        })
      } catch (error) {
        console.log('Error fetching ISS position:', error)
      }
    };

    fetchIssPosition();
    const intervalId = setInterval(fetchIssPosition, 5000)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const newMap = tt.map({
          key: '994x7olG2qsCc9zhLBjzlVHSkvSM040A',
          container: 'map',
          center: [issPosition?.lng, issPosition?.lat],
          zoom: 3,
        })

        const marker = new tt.Marker()
          .setLngLat([issPosition.lng, issPosition.lat])
          .addTo(newMap)

        setMap(newMap)
        setLoading(false)
      } catch (error) {
        console.log('Error initializing map:', error)
        setLoading(false)
      }
    };

    if (issPosition) {
      initializeMap()
    }
  }, [issPosition])

  return (
    <>
      {loading ? (
        <p>Loading map...</p>
      ) : (
        <div id="map" style={{ height: '500px' }}></div>
      )}
    </>
  )
}

export default Map








/**
 *? The dependency array basically tells the "useEffect" React hook to "only trigger when the dependency array changes".  
 * **/

