import express from "express";
import scrape from "./scrape.js";

const app = express();

app.get("/scrape", async (req, res) => {
  try {
    const data = await scrape();
    res.json(data);
  } catch (error) {
    res.status(500).send("Scraping failed.");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
