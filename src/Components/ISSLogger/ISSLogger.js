import React from 'react'

const ISSLogger = ({ positions = [] }) => {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        left: 0, 
        bottom: 0, 
        zIndex: 1000, 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        padding: '10px', 
        maxHeight: '500px', 
        overflowY: 'scroll' 
      }}
    >
    <h3>Previous Positions</h3> 
    <ul style={{ 
        listStyleType: 'none', 
        padding: 5,           
        margin: 5              
      }}>
        {positions.map((pos, index) => (
          <li key={index}>
            Lat: {pos.lat.toFixed(2)}, Lng: {pos.lng.toFixed(2)}
          </li>
        ))}
     </ul>
    </div>
  )
}

export default ISSLogger

