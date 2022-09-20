import React from "react";
import axios from "axios";
import LocationDetails from "./Pages/Map/LocationDetails";

const Searchbar = ({ setCoordinates, setZipcodeChanged }) => {
  return (
    <input
      placeholder="Zipcode"
      onChange={async (event) => {
        const zipcode = event.target.value;
        if (zipcode.length === 5) {
          console.log("Finding stations at " + zipcode);
          try {
            const response = await axios.get(
              "https://maps.googleapis.com/maps/api/geocode/json",
              {
                params: {
                  address: zipcode,
                  key: "AIzaSyAFRCODy2Hbk63kYVSemmcz0DIg3S-XZz8",
                },
              }
            );
            const { lat, lng } = response.data.results[0].geometry.location;
            setZipcodeChanged(true);
            setCoordinates({ lat, lng });
          } catch (err) {
            alert("Please Enter a Valid Zipcode");
          }
        }
        if (zipcode.length > 5) {
        }
      }}
    />
  );
};

export default Searchbar;
