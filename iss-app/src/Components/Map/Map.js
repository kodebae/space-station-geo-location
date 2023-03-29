import React from 'react'
import { useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import './Map.css'





const Map = () => {

    const [map, setMap] = useState({})

    const long = -80.651070
    const lat = 28.573469

   useEffect(()=> {
    var map = tt.map({
        key: process.env.REACT_APP_API_KEY,
        container: 'map',
        center: [long, lat],
        zoom: 14,
    });
    map.addControl(new tt.FullscreenControl())
    map.addControl(new tt.NavigationControl())

    setMap(map)

   }, [])

  return (
    <div id="map" className='map-container'>
   
    </div>
  )
}

export default Map

/**
 *? The dependency array basically tells the "useEffect" hook to "only trigger when the dependency array changes".  
 * **/