import React from 'react'
import Logo from './Logo/Logo'
import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"


const Header = () => {

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine)
}, [])

const particlesLoaded = useCallback(async container => {
    await console.log(container)
}, [])

  return (
    <div>
        <div>
          <Logo/>
          <h1 className='header-text'>🛰️ International Space Station Tracker</h1>
          <Particles className='particles'
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
              background: {
                  color: {
                      value: "#101010",
                  },
              },
              fpsLimit: 120,
              interactivity: {
                  events: {
                      onClick: {
                          enable: true,
                          mode: "push",
                      },
                      onHover: {
                          enable: true,
                          mode: "repulse",
                      },
                      resize: true,
                  },
                  modes: {
                      push: {
                          quantity: 2,
                      },
                      repulse: {
                          distance: 100,
                          duration: 0.4,
                      },
                  },
              },
              particles: {
                  color: {
                      value: "#ffffff",
                  },
                  links: {
                      color: "#ffffff",
                      distance: 150,
                      enable: false,
                      opacity: 0,
                      width: 1,
                  },
                  collisions: {
                      enable: true,
                  },
                  move: {
                      directions: "none",
                      enable: true,
                      outModes: {
                          default: "bounce",
                      },
                      random: false,
                      speed: 1,
                      straight: false,
                  },
                  number: {
                      density: {
                          enable: true,
                          area: 800,
                      },
                      value: 80,
                  },
                  opacity: {
                      value: 0.5,
                  },
                  shape: {
                      type: "circle",
                  },
                  size: {
                      value: { min: 1, max: 3 },
                  },
              },
              detectRetina: true,
          }}
          />
        </div>

    </div>
  )
}
export default Header