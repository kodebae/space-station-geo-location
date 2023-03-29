import React from 'react'
import { useEffect } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import './Map.css'

const long = -80.651070
const lat = 28.573469


const Map = () => {


   useEffect(()=> {
    var map = tt.map({
        key: process.env.REACT_APP_API_KEY,
        container: 'map',
        center: [long, lat],
        zoom: 14,
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

   }, [])

  return (
    <div id="map">
   
    </div>
  )
}

export default Map

/**
 *? The dependency array basically tells the "useEffect" hook to "only trigger when the dependency array changes".  
 * **/