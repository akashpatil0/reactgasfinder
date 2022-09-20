import React from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import LocationDetails from "./LocationDetails";
import Searchbar from "../../Searchbar";

const List = ({ locations, setCoordinates, setZipcodeChanged }) => {
  return (
    <div>
      <div className="search">
        Search for Gas Stations In
        <Searchbar
          setCoordinates={setCoordinates}
          setZipcodeChanged={setZipcodeChanged}
        />
      </div>
      <SimpleGrid className="list">
        {locations?.map((location, i) => (
          <Box key={i}>
            <LocationDetails location={location} />
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default List;
