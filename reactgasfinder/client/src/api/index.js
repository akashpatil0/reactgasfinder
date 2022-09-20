import axios from "axios";

const URL = "http://localhost:3001/api/gaspriceslatlng";

export const getLocationData = async (sw, ne) => {
  console.log(`API HIT`);
  try {
    const response = await axios.get(URL, {
      params: {
        neLat: ne.lat,
        neLng: ne.lng,
        swLat: sw.lat,
        swLng: sw.lng,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getZipcodeData = async (lat, lng) => {
  try {
    // const response = await axios.get(
    //   "https://maps.googleapis.com/maps/api/geocode/json",
    //   {
    //     params: {
    //       lat,
    //       lng,
    //     },
    //   }
    // );
    // console.log(response);
  } catch (err) {
    console.log("Error");
  }
};
