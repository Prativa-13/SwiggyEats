const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api/restaurants", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const swiggyURL =
      `https://www.swiggy.com/dapi/restaurants/list/v5` +
      `?lat=${lat}` +
      `&lng=${lng}` +
      `&is-seo-homepage-enabled=true` +
      `&page_type=DESKTOP_WEB_LISTING`;

    const response = await fetch(swiggyURL);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Swiggy returned ${response.status}`,
      });
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch Swiggy data",
    });
  }
});

app.get("/api/restaurant/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const swiggyURL =
      `https://www.swiggy.com/dapi/restaurants/list/v5` +
      `?lat=28.7040592` +
      `&lng=77.10249019999999` +
      `&restaurantId=${id}`;

    const response = await fetch(swiggyURL);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Swiggy returned ${response.status}`,
      });
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch restaurant menu",
    });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});