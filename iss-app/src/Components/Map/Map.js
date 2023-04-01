import React from 'react'
import { useEffect, useState, useRef } from 'react'
// import * as ttapi from '@tomtom-international/web-sdk-services'
import * as tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import './Map.css'
import icon from './ISS_spacecraft_model_icon.png'
import axios from 'axios'



const Map = () => {

  const [longitude, setLongitude] = useState(-121.91599);
  const [latitude, setLatitude] = useState(37.36765);


  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async () => {
    const res = await axios.get('http://api.open-notify.org/iss-now.json')

    let longitude = res.data.iss_position
    let latitude = res.data.iss_position

    setLongitude(parseFloat(longitude))
    setLatitude(parseFloat(latitude))
    
  }


    const mapElement = useRef();
    const [map, setMap] = useState({})

   useEffect(()=> {
    var map = tt.map({
        key: process.env.REACT_APP_API_KEY,
        container: 'map',
        center: [longitude, latitude],
        zoom: 8,
    });

    map.addControl(new tt.FullscreenControl())
    map.addControl(new tt.NavigationControl())

    setMap(map)
   }, [])

 

  return (

    <div id="map" className='map-container'>
      <img src={icon} className='iss-icon' alt='iss-icon'/>
    </div>
  )
}

export default Map

/**
 *? The dependency array basically tells the "useEffect" React hook to "only trigger when the dependency array changes".  
 * **/


   // const { longitude, latitude } = await res.data.iss_position