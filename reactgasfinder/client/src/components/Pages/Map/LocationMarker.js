import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { AiOutlineCloseCircle } from "react-icons/ai";

const LocationMarker = ( {lat, lng, onClick, selectedMarker, setMarker} ) => {

  return (
    <div>
        <FaMapMarkerAlt className="location-marker"/>
    </div>
  )
}

export default LocationMarker 
