import React, { useState, useEffect } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import './Map.css'
import axios from 'axios'
import Loading from '../Loading/Loading'

const Map = () => {
  const [map, setMap] = useState(null)
  const [mapLongitude, setMapLongitude] = useState(-74.0059)
  const [mapLatitude, setMapLatitude] = useState(40.7128)
  const [loading, setLoading] = useState(true)

  const getLocation = async () => {
    try {
      const res = await axios.get('https://api.wheretheiss.at/v1/satellites/25544')
      let longitude = res.data.longitude
      let latitude = res.data.latitude
      setMapLongitude(parseFloat(longitude))
      setMapLatitude(parseFloat(latitude))
      setLoading(false)
    } catch (error) {
      console.log('Error getting ISS position:', error)
    }
  }

  useEffect(() => {
    const initializeMap = async () => {
      setLoading(true)
      try {
        if (!document.getElementById('map')) {
          return
        }

 // Initialize a new map instance with the default coordinates
        const newMap = tt.map({
          key: '6yAZUYt3mAWaf1kAMdG5kpGdW2GTKjOU',
          container: 'map',
          center: [mapLongitude, mapLatitude],
          zoom: 3,
        })

// Disable draggable feature on map
        if (newMap) {
          newMap.dragPan.disable();
        }

// Set the new map instance
        setMap(newMap)
        setLoading(false)
      } catch (error) {
        console.log('Error initializing map:', error)
        setLoading(false)
      }
    }

    initializeMap()
  }, [mapLongitude, mapLatitude])

  useEffect(() => {
    if (map) {
      const markerElement = document.createElement('div')
      markerElement.className = 'marker'

      const marker = new tt.Marker({
        element: markerElement,
      })
        .setLngLat([mapLongitude, mapLatitude])
        .addTo(map)
        marker.remove()

      map.addControl(new tt.FullscreenControl())
      map.addControl(new tt.NavigationControl())
    }
  }, [map, mapLongitude, mapLatitude])

  useEffect(() => {
    const interval = setInterval(() => {
      getLocation()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div id="map" className="map-container"></div>
      )}
    </>
  )
}
export default Map




/**
 *? The dependency array basically tells the "useEffect" React hook to "only trigger when the dependency array changes".  
 *TODO need to remove the marker each time the map reloads
 * **/


