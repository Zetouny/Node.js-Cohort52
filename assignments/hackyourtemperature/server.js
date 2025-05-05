import express from "express";

const APP = express();
const PORT = 3000;

APP.use(express.json());

APP.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

APP.post("/weather", (req, res) => {
  const { cityName } = req.body;
  res.send(`City Name: ${cityName}`);
});

APP.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
