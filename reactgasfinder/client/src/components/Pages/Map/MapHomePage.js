import React, { useState, useEffect, useContext } from "react";
import Map from "./Map";
import { getLocationData, getZipcodeData } from "../../../api";
import "./styles.css";
import { Grid } from "@material-ui/core";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import List from "./List";
import DataContext from "../../../context/DataContext";

const MapHomePage = () => {
  const { loggedIn } = useContext(DataContext);
  const [coordinates, setCoordinates] = useState({
    lat: 28.5314,
    lng: -81.299,
  });
  const [bounds, setBounds] = useState("");
  const [locations, setLocation] = useState([]);
  const [zipcodeChanged, setZipcodeChanged] = useState(false);
  const [mouseDrag, setMouseDrag] = useState(false);

  const navigate = useNavigate();

  const btnHandler = () => {
    navigate("/login");
  };

  useEffect(() => {
    setLocation();
    getLocationData(bounds.sw, bounds.ne).then((data) => {
      if (data.length > 0 && !mouseDrag && zipcodeChanged) {
        //For when zipcode is searched and stations are available
        console.log("Bounds changed, locations exist");
        setLocation(data);
      } else if (zipcodeChanged && data.length === 0 && !mouseDrag) {
        //For when zipcode is searched and no stations are available
        console.log("ZipCode changed, but no locations were at this zipcode");
        getZipcodeData(coordinates).then((resdata) => {
          setLocation(resdata);
        });
      } else if (!zipcodeChanged && mouseDrag) {
        //For when map is dragged and locations in the area will update, NO ADDITIONAL CALL TO BACKEND
        console.log("Mouse induced map change, location changed");
        setMouseDrag(false);
        setLocation(data);
      }
    });
    setZipcodeChanged(false);
  }, [coordinates]);

  return loggedIn ? (
    <>
      <Grid
        container
        spacing={3}
        style={{
          width: "100%",
          fontSize: "2rem",
          paddingTop: "10px",
          paddingLeft: "15px",
        }}
      >
        <Grid item xs={12} md={4}>
          {locations === null ? (
            <h1>No Gas Stations in This Area</h1>
          ) : (
            <List
              locations={locations}
              setCoordinates={setCoordinates}
              setLocation={setLocation}
              setZipcodeChanged={setZipcodeChanged}
            />
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            locations={locations}
            setMouseDrag={setMouseDrag}
          />
        </Grid>
      </Grid>
    </>
  ) : (
    <div className="mapLogin">
      Please Login To View The Map <br />
      <Button colorScheme="blue" id="loginButton" onClick={btnHandler}>
        Log In
      </Button>
    </div>
  );
};

export default MapHomePage;
