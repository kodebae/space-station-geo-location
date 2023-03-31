import React from 'react'
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import image from './ISS_emblem.png'

const Logo = () => (
  <Tilt tiltReverse={true}>
    <div>
        <img className="logo" alt='iss_emblem' src={image}/>
    </div>
  </Tilt>
);

export default Logo