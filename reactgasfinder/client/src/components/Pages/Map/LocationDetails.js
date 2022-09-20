import React from 'react'
import './styles.css'

const LocationDetails = ({location}) => {
  return (
    <div className="location-details">
      <h1>{location.name}</h1>
      <h2>{location.location}</h2>
      <h3>${location.price}</h3>
    </div>
    
  )
}

export default LocationDetails