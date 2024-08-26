import React, { useState, useEffect, useRef } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import ISSLogger from '../ISSLogger/ISSLogger'

const Map = () => {
  const mapContainerRef = useRef(null)
  const [map, setMap] = useState(null)
  const [issPosition, setIssPosition] = useState(null)
  const [positions, setPositions] = useState([]) // Initialize as an empty array
  const markerRef = useRef(null) // Ref to hold the marker

  // Fetch the ISS position every 6 seconds
  useEffect(() => {
    const fetchIssPosition = async () => {
      try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
        const data = await response.json()
        const newPosition = {
          lat: data.latitude,
          lng: data.longitude,
        };

        setIssPosition(newPosition)

        // Update positions array with the latest 20 positions
        setPositions(prevPositions => {
          const updatedPositions = [newPosition, ...prevPositions]
          return updatedPositions.slice(0, 20) // Keep only the last 20 positions
        })
      } catch (error) {
        console.error('Error fetching ISS position:', error)
      }
    }

    fetchIssPosition()
    const intervalId = setInterval(fetchIssPosition, 6000)
    return () => clearInterval(intervalId)
  }, [])

  // Initialize the map when the ISS position is first loaded
  useEffect(() => {
    if (issPosition && !map) {
      const newMap = tt.map({
        key: '994x7olG2qsCc9zhLBjzlVHSkvSM040A',
        container: mapContainerRef.current,
        center: [issPosition.lng, issPosition.lat],
        zoom: 3,
      })

      const marker = new tt.Marker({ draggable: false })
        .setLngLat([issPosition.lng, issPosition.lat])
        .addTo(newMap)

      markerRef.current = marker // Store marker reference
      setMap(newMap)
    }
  }, [issPosition, map])

  // Update the marker position when ISS position changes
  useEffect(() => {
    if (map && issPosition && markerRef.current) {
      map.setCenter([issPosition.lng, issPosition.lat])
      markerRef.current.setLngLat([issPosition.lng, issPosition.lat])
    }
  }, [issPosition, map])

  return (
    <>
      <div ref={mapContainerRef} style={{ height: '500px', width: '100%' }} />
      {positions.length > 0 && <ISSLogger positions={positions} />}
    </>
  )
}

export default Map







/**
 *? The dependency array basically tells the "useEffect" React hook to "only trigger when the dependency array changes".  
 * **/

