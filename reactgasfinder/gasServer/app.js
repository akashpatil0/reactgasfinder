const express = require("express");
require("dotenv").config();

const { sequelize, Station } = require("./models");

const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
var cors = require("cors");
const station = require("./models/station");

app.use(cors());

app.listen({ port: process.env.PORT }, async () => {
  await console.log("Server up on http://localhost:3001");
  await sequelize.authenticate();
  console.log("Database Connected!");
});

app.post("/api/gasprices/:zipcode", async (req, res) => {
  const zipcode = req.params.zipcode;
  request(
    "https://www.gasbuddy.com/home?search=" +
      zipcode +
      "&fuel=1&maxAge=0&method=all",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $(".GenericStationListItem-module__stationListItem___3Jmn4").each(
          (i, el) => {
            const price = parseFloat(
              $(el)
                .find(".StationDisplayPrice-module__priceContainer___J6Ibm")
                .children("span")
                .text()
                .substring(1)
            );
            const name = $(el).find("h3").text().replace(/\s+/g, "");
            const address = $(el)
              .find(".StationDisplay-module__address___2_c7v")
              .find("br")
              .replaceWith(", ")
              .end()
              .text();
            createStation(name, price, address, zipcode);
          }
        );
      }
    }
  );
  setTimeout(async function () {
    const locations = await Station.findAll({ where: { zipcode } });
    res.json(locations);
  }, 3000);
});

app.get("/api/gasprices", async (req, res) => {
  try {
    const locations = await Station.findAll();

    return res.json(locations);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/gasprices/:zipcode", async (req, res) => {
  const zipcode = req.params.zipcode;
  const locations = await Station.findAll({ where: { zipcode } });
  return res.json(locations);
});

app.get("/api/gaspriceslatlng", async (req, res) => {
  const { neLat, neLng, swLat, swLng } = req.query;

  try {
    const locations = await Station.findAll();
    const filterLocations = locations.filter((el) => {
      return (
        el.lat - 0.005 < neLat &&
        el.lng - 0.005 < neLng &&
        el.lat + 0.005 > swLat &&
        el.lng + 0.005 > swLng
      );
    });

    return res.json(filterLocations);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/removezip/:zipcode", async (req, res) => {
  const zipcode = req.params.zipcode;
  const { count } = await Station.findAndCountAll({ where: { zipcode } });
  try {
    for (let i = 0; i < count; i++) {
      const stations = await Station.findOne({ where: { zipcode } });
      await stations.destroy();
    }

    return res.json("Stations at this zipcode have been deleted");
  } catch (err) {
    res.json("Stations at this zipcode could not be deleted ");
  }
});

async function createStation(name, price, location, zipcode) {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        address: location,
        key: "AIzaSyAFRCODy2Hbk63kYVSemmcz0DIg3S-XZz8",
      },
    }
  );

  const { lat, lng } = response.data.results[0].geometry.location;

  const station = Station.create({ name, location, price, zipcode, lat, lng });
}
