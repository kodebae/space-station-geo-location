import React from 'react';
import ReactDOM from 'react-dom';
import Tilt from 'react-parallax-tilt';


export default function Header() {
  return (
    <div>
        <Tilt>
            <div style={{ height: '300px', backgroundColor: 'darkgrey' }}>
                <Logo />
                <h1>International Space Station 🛰️</h1>
            </div>
        </Tilt>
    </div>
  )
}
