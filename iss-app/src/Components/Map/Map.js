import React from 'react'
import { useEffect, useRef } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import './Map.css'


const Map = () => {
    const mapElement = useRef()


   useEffect(()=> {
    var map = tt.map({
        key: process.env.REACT_APP_API_KEY,
        container: 'map',
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

   }, [])

  return (
    <div id="map" ref={mapElement} className='map' style={{width: "100%", height: "100%"}}>
   
    </div>
  )
}

export default Map

/**
 *? The dependency array basically tells the "useEffect" hook to "only trigger when the dependency array changes".  
 * **/