import APP from "../sources/app.js";
import * as keys from "../sources/keys.js";
import supertest from "supertest";
import fetch from "node-fetch";

const request = supertest(APP);

describe("POST /weather", () => {
  it("Checking for request body", (done) => {
    request
      .post("/weather")
      .expect(400, { weatherText: "Request body is missing" }, done);
  });

  it("CityName should exist", (done) => {
    request
      .post("/weather")
      .send({ City: "" })
      .expect(400, { weatherText: "City name is missing" }, done);
  });

  it("CityName should be a string", (done) => {
    request
      .post("/weather")
      .send({ cityName: 5 })
      .expect(400, { weatherText: "City name should be a string" }, done);
  });

  it("Checking if the WeatherAPI is online", async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Arnhem,nl&appid=${keys.API_KEY}&units=metric`
    );
    expect(response.status).toBe(200);
  });

  it("Checking if temperature is a number", async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Arnhem,nl&appid=${keys.API_KEY}&units=metric`
    );
    const json = await response.json();
    const temp = json.main.temp;
    expect(typeof temp).toBe("number");
  });
});
