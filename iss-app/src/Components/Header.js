import React from 'react';
import Logo from './Logo/Logo';


export default function Header() {
  return (
    <div>
        <div style={{ height: '250px', backgroundColor: 'darkgrey'}}>
            <Logo/>
            <h1>International Space Station Tracker 🛰️</h1>
        </div>

    </div>
  )
}
