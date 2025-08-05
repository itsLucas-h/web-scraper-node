import express from "express";
import scrape from "./scripts/scrape.js";

const app = express();

app.use(express.static("public"));

app.get("/scrape", async (req, res) => {
  try {
    const pages = Math.min(Math.max(parseInt(req.query.pages) || 10, 1), 50);
    const data = await scrape(pages);
    res.json(data);
  } catch (err) {
    console.error("Scrape error:", err.message);
    res.status(500).json({ error: "Scraping failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
