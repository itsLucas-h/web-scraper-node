import express from "express";
import scrape from "./scrape.js";

const app = express();

app.use(express.static("public"));

app.get("/scrape", async (req, res) => {
  try {
    const data = await scrape();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Scraping failed.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
