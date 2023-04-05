import React from 'react'
import './Loading.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <div className="loading-text">Loading...</div>
    </div>
  )
}

export default Loading;
