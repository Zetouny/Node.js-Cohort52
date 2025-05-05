import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const { cityName } = req.body;
  res.send(`City Name: ${cityName}`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
