import express from "express";
import fetch from "node-fetch";
import * as keys from "./keys.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  try {
    if (!req.body) {
      throw { weatherText: "Request body is missing" };
    }

    const { cityName } = req.body;

    if (!cityName) {
      throw { weatherText: "City name is missing" };
    }

    if (typeof cityName !== "string") {
      throw { weatherText: "City name should be a string" };
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw { weatherText: "City is not found!" };
    }

    const temp = await response.json();

    res.status(200).json({
      weatherText: `The temperature in ${cityName} is ${temp.main.temp}℃`,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

export default app;
